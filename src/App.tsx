/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { FlipkartBanner } from './components/FlipkartBanner';
import { DiverseArchetypesShowcase } from './components/DiverseArchetypesShowcase';
import { FitStudio } from './components/FitStudio';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { MeasurementPassportModal } from './components/MeasurementPassportModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

import { DEFAULT_PROFILES, BODY_ARCHETYPES, PRODUCTS } from './data/clothingData';
import { BodyArchetype, GarmentProduct, FabricOption, MeasurementProfile, CartItem } from './types/clothing';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [profiles, setProfiles] = useState<MeasurementProfile[]>(DEFAULT_PROFILES);
  const [activeProfile, setActiveProfile] = useState<MeasurementProfile>(DEFAULT_PROFILES[0]);
  const [selectedArchetype, setSelectedArchetype] = useState<BodyArchetype>(BODY_ARCHETYPES[0]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Search & Category states for Flipkart browsing
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modal Dialogs
  const [selectedProduct, setSelectedProduct] = useState<GarmentProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isPassportOpen, setIsPassportOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const handleDirectBuy = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleOrderComplete = () => {
    setCart([]);
  };

  // Profile operations
  const handleSaveProfile = (newOrUpdatedProfile: MeasurementProfile) => {
    setProfiles((prev) => {
      const exists = prev.some((p) => p.id === newOrUpdatedProfile.id);
      if (exists) {
        return prev.map((p) => (p.id === newOrUpdatedProfile.id ? newOrUpdatedProfile : p));
      }
      return [...prev, newOrUpdatedProfile];
    });
    setActiveProfile(newOrUpdatedProfile);
  };

  const handleDeleteProfile = (profileId: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== profileId));
    if (activeProfile.id === profileId && profiles.length > 1) {
      setActiveProfile(profiles[0]);
    }
  };

  // Archetype selection triggers
  const handleSelectArchetype = (arch: BodyArchetype) => {
    setSelectedArchetype(arch);
    setActiveProfile(arch.profile);
  };

  const handleSelectAndDraft = (arch: BodyArchetype) => {
    setSelectedArchetype(arch);
    setActiveProfile(arch.profile);
    const fitStudioEl = document.getElementById('fit-studio');
    if (fitStudioEl) {
      fitStudioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewGarment = (garmentId: string) => {
    const product = PRODUCTS.find((p) => p.id === garmentId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleQuickConfigure = (product: GarmentProduct, _fabric: FabricOption) => {
    setSelectedProduct(product);
  };

  const scrollToFitStudio = () => {
    const el = document.getElementById('fit-studio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f2f4] text-stone-900 selection:bg-[#2874f0] selection:text-white">
      {/* Signature Flipkart Navigation Bar */}
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        activeProfile={activeProfile}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenFitStudio={scrollToFitStudio}
      />

      <main id="top" className="flex-1 space-y-2">
        {/* Flipkart Promotional Carousel Banner */}
        <FlipkartBanner
          archetypes={BODY_ARCHETYPES}
          selectedArchetype={selectedArchetype}
          onSelectArchetype={handleSelectArchetype}
          onOpenFitStudio={scrollToFitStudio}
        />

        {/* Product Catalog with Left Sidebar Filters & Right Products Grid */}
        <ProductCatalog
          products={PRODUCTS}
          activeProfile={activeProfile}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickConfigure={handleQuickConfigure}
          onOpenFitStudio={scrollToFitStudio}
        />

        {/* Veronica Interactive Fit Studio & Parametric Drafter */}
        <FitStudio
          currentProfile={activeProfile}
          onUpdateProfile={(updated) => setActiveProfile(updated)}
          onSaveAsNewProfile={(newP) => {
            handleSaveProfile({
              ...newP,
              id: `custom-profile-${Date.now()}`,
              name: `Custom Fit (${newP.bust}"B / ${newP.waist}"W)`,
            });
          }}
          onExploreCollection={() => {
            const el = document.getElementById('collection');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Diverse Body Types & Proportions Showcase */}
        <DiverseArchetypesShowcase
          archetypes={BODY_ARCHETYPES}
          onSelectAndDraft={handleSelectAndDraft}
          onViewGarment={handleViewGarment}
        />
      </main>

      {/* Flipkart-Style Footer */}
      <Footer
        onOpenFitStudio={scrollToFitStudio}
        onOpenPassport={() => setIsPassportOpen(true)}
      />

      {/* Modals & Slide-Over Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        activeProfile={activeProfile}
        availableProfiles={profiles}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onDirectBuy={handleDirectBuy}
        onOpenFitStudio={() => {
          setSelectedProduct(null);
          scrollToFitStudio();
        }}
      />

      <MeasurementPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        profiles={profiles}
        activeProfile={activeProfile}
        onSelectActiveProfile={(p) => setActiveProfile(p)}
        onSaveProfile={handleSaveProfile}
        onDeleteProfile={handleDeleteProfile}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onOpenFitStudio={() => {
          setIsCartOpen(false);
          scrollToFitStudio();
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}
