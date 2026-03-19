"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, User, LogOut, ShieldCheck } from "lucide-react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User as FirebaseUser } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const adminEmail = "admin@tohfagifting.co";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => signOut(auth);

  return (
    <nav className="sticky top-0 z-50 w-full px-6 py-4">
      <div className={cn(
        "max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg"
      )}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-pink-400 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
            T
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
            TOHFA GIFTING CO
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-purple-600 transition-colors">Shop</Link>
          <Link href="/contact" className="hover:text-purple-600 transition-colors">Contact</Link>
          {user?.email === adminEmail && (
            <Link href="/admin" className="flex items-center gap-1.5 text-purple-600 font-bold hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" /> Admin
            </Link>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors hidden sm:block">
            <Search className="w-5 h-5 text-slate-700" />
          </button>
          
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors relative">
            <ShoppingCart className="w-5 h-5 text-slate-700" />
            <span className="absolute top-0 right-0 w-4 h-4 bg-pink-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
              0
            </span>
          </button>

          <div className="h-6 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Logged in as</p>
                <p className="text-sm font-bold text-slate-800 line-clamp-1 max-w-[120px]">{user.displayName || user.email}</p>
              </div>
              <button 
                onClick={logout}
                className="p-2 hover:bg-red-50 rounded-full text-slate-700 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={login}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-2 glass rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-4 gap-4 font-medium text-slate-600">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-purple-600 px-4 py-2 hover:bg-white/30 rounded-xl transition-all">Home</Link>
              <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="hover:text-purple-600 px-4 py-2 hover:bg-white/30 rounded-xl transition-all">Shop</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="hover:text-purple-600 px-4 py-2 hover:bg-white/30 rounded-xl transition-all">Contact</Link>
              {user?.email === adminEmail && (
                <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-purple-600 font-bold px-4 py-2 hover:bg-white/30 rounded-xl transition-all">
                  <ShieldCheck className="w-4 h-4" /> Admin
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
