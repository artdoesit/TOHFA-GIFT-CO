"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, CreditCard, X, Maximize2, RotateCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const whatsappNumber = "911234567890"; // Admin phone number
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi, I want to order ${product.name} (ID: ${product.id}) for ₹${product.price}`
  )}`;

  const upiId = "tohfa@upi"; // Admin UPI ID
  const upiUrl = `upi://pay?pa=${upiId}&pn=TOHFA%20GIFTING%20CO&am=${product.price}&cu=INR`;

  return (
    <>
      {/* Regular Product Card (Trigger) */}
      <motion.div
        whileHover={{ y: -10 }}
        className="glass group rounded-[2rem] overflow-hidden shadow-lg transition-all duration-300 hover:shadow-purple-500/20 flex flex-col h-full"
      >
        <div className="relative aspect-square overflow-hidden bg-white/50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs font-bold text-slate-800">
            {product.category}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{product.name}</h3>
            <span className="text-purple-600 font-bold">₹{product.price}</span>
          </div>
          
          <p className="text-sm text-slate-500 line-clamp-2 mb-6">
            {product.description}
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-auto flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
          >
            <Maximize2 className="w-4 h-4" />
            View Item
          </button>
        </div>
      </motion.div>

      {/* Glassmorphic Modal with Flip Card */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg perspective-1000"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-pink-400 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Flip Card Container */}
              <div 
                className="relative w-full aspect-[4/5] cursor-pointer preserve-3d transition-transform duration-700 h-[80vh] md:h-[600px]"
                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden rounded-[2.5rem] glass overflow-hidden shadow-2xl flex flex-col">
                  <div className="relative h-3/5 w-full">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="p-8 flex flex-col items-center justify-center h-2/5 text-center bg-white/30 backdrop-blur-sm">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter line-clamp-2">{product.name}</h2>
                    <p className="text-purple-600 font-bold text-sm md:text-lg mb-4">Click to see details</p>
                    <div className="animate-bounce">
                      <RotateCw className="w-6 h-6 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div 
                  className="absolute inset-0 backface-hidden rounded-[2.5rem] glass shadow-2xl flex flex-col p-6 md:p-10 bg-white/60 text-slate-900 overflow-y-auto"
                  style={{ transform: 'rotateY(180deg)' }}
                >
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-slate-400">Product Details</span>
                      <span className="bg-purple-600 text-white px-3 md:px-4 py-1 rounded-full font-bold text-sm md:text-base">₹{product.price}</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black mb-4 uppercase tracking-tighter leading-tight">{product.name}</h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6" />
                    <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-auto space-y-3" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-5 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold transition-all shadow-xl shadow-green-500/30 hover:scale-[1.02] active:scale-95"
                    >
                      <MessageCircle className="w-6 h-6" />
                      Order via WhatsApp
                    </a>
                    <a
                      href={upiUrl}
                      className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all shadow-xl hover:scale-[1.02] active:scale-95"
                    >
                      <CreditCard className="w-6 h-6" />
                      Order Now (UPI)
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
