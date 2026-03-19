"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-6 pt-12">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight">
            Perfect Gifts <br />
            <span className="text-gradient">for Every Occasion 🎁</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed">
            Discover a curated collection of premium, personalized gifts that make every moment special. Handcrafted with love and delivered with care.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform flex items-center gap-2 group">
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 glass text-slate-900 font-bold rounded-2xl hover:bg-white/30 transition-colors">
              Explore Collection
            </button>
          </div>
        </motion.div>

        {/* 3D Visuals (Mocked with Framer Motion) */}
        <div className="relative flex items-center justify-center h-[500px]">
          {/* Main Gift Box */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-64 h-64 bg-gradient-to-br from-purple-400/80 to-blue-500/80 glass rounded-[2.5rem] flex items-center justify-center shadow-2xl z-10"
          >
            <span className="text-8xl">🎁</span>
          </motion.div>

          {/* Floating Small Elements */}
          <motion.div
            animate={{ 
              y: [0, 30, 0],
              x: [0, 20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-20 right-20 w-32 h-32 bg-pink-300/60 glass rounded-3xl flex items-center justify-center shadow-xl text-4xl"
          >
            🎈
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, -40, 0],
              x: [0, -30, 0],
              rotate: [0, 15, 0]
            }}
            transition={{ 
              duration: 7, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute bottom-20 left-10 w-40 h-40 bg-purple-300/60 glass rounded-[2rem] flex items-center justify-center shadow-xl text-5xl"
          >
            ✨
          </motion.div>

          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] -z-10 rounded-full"
          />
        </div>
      </div>
    </section>
  );
}
