export type MeasurementUnit = 'in' | 'cm';

export type TorsoLength = 'short' | 'regular' | 'long';
export type ShoulderBreadth = 'narrow' | 'standard' | 'broad';
export type BustCup = 'A/B' | 'C/D' | 'DD/E' | 'F+';
export type BicepEase = 'fitted' | 'standard' | 'relaxed';
export type HipShape = 'hourglass' | 'pear' | 'rectangle' | 'inverted_triangle' | 'apple';

export interface MeasurementProfile {
  id: string;
  name: string;
  unit: MeasurementUnit;
  height: number;
  bust: number;
  underbust: number;
  waist: number;
  highHip: number;
  fullHip: number;
  torsoLength: TorsoLength;
  shoulderBreadth: ShoulderBreadth;
  bustCup: BustCup;
  bicepEase: BicepEase;
  hipShape: HipShape;
  inseam: number;
  notes?: string;
  isDefault?: boolean;
}

export interface BodyArchetype {
  id: string;
  name: string;
  archetypeLabel: string;
  heightStr: string;
  statsStr: string;
  cup: BustCup;
  torso: TorsoLength;
  profile: MeasurementProfile;
  description: string;
  quote: string;
  offTheRackFrustrations: string[];
  bespokeAdjustments: string[];
  recommendedGarmentId: string;
}

export interface FabricOption {
  id: string;
  name: string;
  composition: string;
  weight: string;
  colorName: string;
  colorHex: string;
  texturePattern: string;
  priceDelta: number;
}

export interface GarmentCustomizationOption {
  id: string;
  label: string;
  options: string[];
  defaultOption: string;
}

export interface GarmentProduct {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  category: 'Blazers & Suits' | 'Trousers & Pants' | 'Dresses' | 'Tops & Shirts' | 'Skirts';
  basePrice: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  isAssured: boolean;
  deliveryInfo: string;
  description: string;
  fabricDetails: string;
  accentColor: string;
  silhouetteType: string;
  fabrics: FabricOption[];
  customizations: GarmentCustomizationOption[];
  solvedFlaws: {
    flaw: string;
    bespokeSolution: string;
  }[];
  patternSpecs: {
    easeBust: string;
    easeWaist: string;
    easeHip: string;
    dartDistribution: string;
    waistbandContour: string;
  };
  recommendedFor: HipShape[];
}

export interface CartItem {
  cartItemId: string;
  product: GarmentProduct;
  selectedFabric: FabricOption;
  selectedOptions: Record<string, string>;
  measurementProfile: MeasurementProfile;
  monogram?: string;
  price: number;
  quantity: number;
  customFitNotes?: string;
}
