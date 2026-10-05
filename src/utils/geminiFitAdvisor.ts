import { GoogleGenAI } from '@google/genai';
import { MeasurementProfile } from '../types/clothing';

export interface BespokeAnalysisResult {
  silhouetteClass: string;
  waistToHipDelta: number;
  bustToWaistDelta: number;
  tailorDiagnosis: string;
  keyFormulas: {
    title: string;
    value: string;
    explanation: string;
  }[];
  criticalGarmentAdjustments: {
    blazer: string;
    trouser: string;
    dress: string;
    shirt: string;
  };
  recommendedFabrics: string[];
}

export function calculateDeterministicBespokeSpecs(profile: MeasurementProfile): BespokeAnalysisResult {
  const isCm = profile.unit === 'cm';
  // convert to inches for standard tailor ratios
  const bustIn = isCm ? profile.bust / 2.54 : profile.bust;
  const waistIn = isCm ? profile.waist / 2.54 : profile.waist;
  const hipIn = isCm ? profile.fullHip / 2.54 : profile.fullHip;

  const waistToHipDelta = Math.round((hipIn - waistIn) * 10) / 10;
  const bustToWaistDelta = Math.round((bustIn - waistIn) * 10) / 10;

  // Determine silhouette class
  let silhouetteClass = 'Balanced Proportional';
  if (waistToHipDelta >= 12 && bustToWaistDelta >= 9) {
    silhouetteClass = 'Sculpted Hourglass';
  } else if (waistToHipDelta >= 11 && bustToWaistDelta < 9) {
    silhouetteClass = 'Curved Pear & High Hip Shelf';
  } else if (bustToWaistDelta >= 9 && waistToHipDelta < 8) {
    silhouetteClass = 'Inverted Triangle & Broad Shoulder';
  } else if (waistToHipDelta < 8 && bustToWaistDelta < 7) {
    silhouetteClass = 'Linear Rectangle & Athletic Column';
  } else if (waistIn > bustIn * 0.88 || waistIn > hipIn * 0.88) {
    silhouetteClass = 'Full Midsection Balance';
  }

  // Generate tailoring formulas
  const fbaNeed = profile.bustCup === 'DD/E' || profile.bustCup === 'F+' || bustToWaistDelta > 10;
  const fbaDartSpread = fbaNeed ? (profile.bustCup === 'F+' ? '3.0"' : '2.0"') : '0.75" standard';

  const swaybackNeed = waistToHipDelta >= 10 || profile.torsoLength === 'short';
  const waistCurvature = waistToHipDelta >= 12 ? '24° High-Arch Arc' : waistToHipDelta >= 8 ? '18° Contoured Arc' : '12° Gentle Arc';

  const tailorDiagnosis = `Anatomy with a ${waistToHipDelta}" waist-to-hip variance and ${bustToWaistDelta}" bust-to-waist drop. Off-the-rack size standards will suffer from severe waistband gaping at the lower spine, armhole constriction, and bust button pulling. VALA drafting applies multi-vector curvature to lock the waistband cleanly and eliminate bust strain.`;

  return {
    silhouetteClass,
    waistToHipDelta,
    bustToWaistDelta,
    tailorDiagnosis,
    keyFormulas: [
      {
        title: 'Waistband Anatomical Arc',
        value: waistCurvature,
        explanation: `Curved 3-piece draft eliminates the ${waistToHipDelta}" lumbar spine gap without pulling pocket mouths open.`,
      },
      {
        title: 'Bust Apex Dart Spread (FBA)',
        value: fbaDartSpread,
        explanation: fbaNeed
          ? 'Full bust 3D volume added into diagonal French darts, preventing horizontal chest strain lines.'
          : 'Standard bust apex allowance with clean balanced drape.',
      },
      {
        title: 'Armscye & Shoulder Pitch',
        value: profile.shoulderBreadth === 'broad' ? 'Forward 6° Pitch + 1.5" Cross-Back' : 'Standard 4° Natural Pitch',
        explanation: 'Provides full forward reach without pulling the blazer hem upwards or pinching shoulder blades.',
      },
      {
        title: 'Vertical Rise & Torso Calibration',
        value: profile.torsoLength === 'short' ? 'Shortened Torso (-1.5") + Elevated Waistline' : profile.torsoLength === 'long' ? 'Extended Torso (+2.0") + Lowered Belt Stance' : 'Proportional Mid-Rise Draft',
        explanation: 'Ensures the narrowest cut sits exactly at your anatomical waist, not your ribs or lower pelvis.',
      },
    ],
    criticalGarmentAdjustments: {
      blazer: fbaNeed
        ? 'Deep French side darts + floating chest canvas to prevent button gaping while keeping shoulders natural.'
        : 'Precision waist suppression with swayback deduction to prevent pooled fabric at lower back.',
      trouser: `Anatomical 3-piece contoured waistband (${waistCurvature}) with deep gluteal contour darts and forward pocket mouths.`,
      dress: 'Bias grain orientation balanced across left/right diagonals to eliminate static cling across high hips.',
      shirt: 'Concealed dual chest closure between apex buttons + tailored spinal princess darts.',
    },
    recommendedFabrics: [
      'Italian Super 130s Wool Crepe (Natural 2-way drape memory)',
      'Worsted Wool Gabardine (Clean liquid drape from hip to floor)',
      '22mm Grade 6A Mulberry Silk Charmeuse (Sculpts without cling)',
      '2-Ply 120s Egyptian Cotton Poplin (Breathable architectural crispness)',
    ],
  };
}

export async function consultAiMasterTailor(
  profile: MeasurementProfile,
  userQuestionOrFrustration: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY || (typeof window !== 'undefined' ? (window as unknown as { GEMINI_API_KEY?: string }).GEMINI_API_KEY : '');

  // If apiKey is available, attempt Gemini call
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the Master Pattern Cutter and Savile Row / Parisian Haute Couture Bespoke Tailor at VALA ATELIER, specializing in women's custom-tailored apparel for diverse body types (varying proportions, bust cups A through H+, long/short torsos, high hip shelves, athletic shoulders, swayback postures).

Client Measurements Profile:
- Height: ${profile.height} ${profile.unit}
- Bust: ${profile.bust} ${profile.unit} (Cup: ${profile.bustCup})
- Underbust: ${profile.underbust} ${profile.unit}
- Waist: ${profile.waist} ${profile.unit}
- High Hip: ${profile.highHip} ${profile.unit}
- Full Hip: ${profile.fullHip} ${profile.unit}
- Inseam: ${profile.inseam} ${profile.unit}
- Torso Length: ${profile.torsoLength}
- Shoulder Breadth: ${profile.shoulderBreadth}
- Hip Shape: ${profile.hipShape}
- Bicep Ease: ${profile.bicepEase}
- Client Notes: ${profile.notes || 'None'}

Client's Question / Fit Frustration:
"${userQuestionOrFrustration}"

Write a concise, master-tailor consultation note (2-3 short paragraphs, elegant, expert, warm, and highly specific).
Include:
1. Direct anatomical diagnosis of why off-the-rack clothing has caused this problem.
2. The exact pattern cutting formula VALA will draft (e.g. specific dart depth, waistband arc degree, swayback take-up, armhole pitch).
3. The specific ease allowances and garment recommendations.
Do not use generic buzzwords or markdown bullet clutter. Keep it elegant, authoritative, and bespoke.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to deterministic bespoke engine', err);
    }
  }

  // Graceful bespoke tailoring engine response
  const specs = calculateDeterministicBespokeSpecs(profile);
  return `At VALA, we recognize that your ${profile.hipShape} silhouette with a ${specs.waistToHipDelta}" waist-to-hip delta and ${profile.bustCup} cup requires bespoke geometric drafting rather than standardized grading. Standard ready-to-wear scales all dimensions proportionally from an idealized size 4 fit model, which inevitably causes ${userQuestionOrFrustration ? `issues like "${userQuestionOrFrustration}"` : 'severe waistband gaping and chest button strain'}.

To resolve this, our master tailors draft your pattern with our ${specs.keyFormulas[0].value} waistband, anchoring the garment onto your natural skeletal frame. We allocate ${specs.keyFormulas[1].value} directly into anatomical French darts, ensuring complete freedom of movement without excess bulk.

For your ${profile.torsoLength} torso and ${profile.shoulderBreadth} shoulders, we calibrate the armscye pitch to prevent forward-reach tension while preserving a sharp, sculpted shoulder line. Every garment drafted for you carries our zero-gap guarantee.`;
}
