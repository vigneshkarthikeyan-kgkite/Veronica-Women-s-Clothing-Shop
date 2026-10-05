import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Scissors, ArrowRight, Truck } from 'lucide-react';
import { CartItem } from '../types/clothing';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    fullName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Green Acres, Koramangala 4th Block',
    city: 'Bengaluru',
    postalCode: '560034',
    state: 'Karnataka',
  });
  const [orderId, setOrderId] = useState<string>('');

  const totalSellingPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `OD${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    setOrderId(id);
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-xs shadow-2xl overflow-hidden my-6 border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-1.5 text-white/80 hover:text-white rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'details' ? (
          <div>
            {/* Flipkart Header */}
            <div className="p-4 bg-[#2874f0] text-white flex items-center justify-between">
              <h2 className="text-base font-bold">
                Order Delivery & Tailoring Details
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Delivery Address */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  1. Delivery Address
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full p-2 text-xs bg-stone-50 border border-stone-300 rounded-xs focus:border-[#2874f0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">10-Digit Mobile</label>
                    <input
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2 text-xs bg-stone-50 border border-stone-300 rounded-xs focus:border-[#2874f0] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">Address (Area and Street)</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2 text-xs bg-stone-50 border border-stone-300 rounded-xs focus:border-[#2874f0] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">City/District/Town</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2 text-xs bg-stone-50 border border-stone-300 rounded-xs focus:border-[#2874f0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full p-2 text-xs bg-stone-50 border border-stone-300 rounded-xs focus:border-[#2874f0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full p-2 text-xs bg-stone-50 border border-stone-300 rounded-xs focus:border-[#2874f0] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary Snapshot */}
              <div className="pt-3 border-t border-stone-200">
                <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                  2. Order Summary ({items.length} items)
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xs text-xs space-y-1">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="flex justify-between text-stone-700">
                      <span>{item.product.name} (Custom Fitted for {item.measurementProfile.name})</span>
                      <span className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-stone-200 flex justify-between font-extrabold text-stone-900 text-sm">
                    <span>Total Amount Payable</span>
                    <span className="text-[#388e3c]">₹{totalSellingPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-bold uppercase text-stone-500 hover:text-stone-800 cursor-pointer"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  className="py-3 px-8 bg-[#fb641b] hover:bg-[#e8540d] text-white font-extrabold text-xs uppercase tracking-wider rounded-xs shadow-md transition-colors cursor-pointer"
                >
                  CONFIRM & PLACE ORDER
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                Order Placed Successfully!
              </div>
              <h3 className="text-2xl font-bold text-stone-900">
                Order ID: {orderId}
              </h3>
              <p className="text-xs text-stone-600 mt-2 max-w-md mx-auto">
                Thank you, {formData.fullName}. Your custom measurements have been assigned to our master cutter. Your order will be delivered to {formData.city} within 2-3 business days.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xs border border-stone-200 text-xs text-stone-700 max-w-sm mx-auto text-left space-y-1">
              <div className="font-bold text-stone-900">Delivery Address:</div>
              <div>{formData.address}, {formData.city}, {formData.state} - {formData.postalCode}</div>
              <div className="pt-2 font-bold text-emerald-700">✦ 60-Day Free Alterations Guarantee Included</div>
            </div>

            <button
              onClick={() => {
                onOrderComplete();
                onClose();
              }}
              className="px-6 py-2.5 bg-[#2874f0] text-white text-xs font-bold uppercase rounded-xs hover:bg-[#1855b5] cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
