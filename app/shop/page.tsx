"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Mugs", "Lamps", "Wallets", "Explosion Boxes", "Custom Gifts"];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategory, priceRange, products]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let temp = [...products];

    // Search
    if (searchQuery) {
      temp = temp.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category
    if (selectedCategory !== "All") {
      temp = temp.filter(p => p.category === selectedCategory);
    }

    // Price
    temp = temp.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

    setFilteredProducts(temp);
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-black text-slate-900 uppercase">Our Collection</h1>
            <p className="mt-4 text-slate-600 max-w-lg">
              Browse through our curated collection of premium gifts. Use filters to find exactly what you're looking for.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group flex-grow md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-purple-500 transition-colors" />
              <input 
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-purple-500 transition-all shadow-sm"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "p-4 rounded-2xl border transition-all flex items-center gap-2 font-bold",
                showFilters 
                ? "bg-slate-900 text-white border-slate-900" 
                : "bg-white/50 text-slate-900 border-slate-200 hover:bg-white/80"
              )}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Filter Drawer/Bar */}
        {showFilters && (
          <div className="mb-12 glass p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-top-4 duration-300">
            {/* Category Filter */}
            <div>
              <label className="text-sm font-bold text-slate-900 mb-4 block uppercase tracking-wider">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                      selectedCategory === cat
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                      : "bg-white/50 text-slate-600 border border-slate-200 hover:bg-white"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="text-sm font-bold text-slate-900 mb-4 block uppercase tracking-wider text-center md:text-left">
                Price: ₹0 - ₹{priceRange.max}
              </label>
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="100"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono">
                <span>₹0</span>
                <span>₹5000+</span>
              </div>
            </div>

            {/* Sort/Clear */}
            <div className="flex items-end justify-end">
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setPriceRange({ min: 0, max: 5000 });
                }}
                className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" /> Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="glass rounded-[2rem] h-[400px] animate-pulse">
                <div className="h-2/3 bg-slate-200/50 rounded-t-[2rem]" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-slate-200/50 rounded w-3/4" />
                  <div className="h-4 bg-slate-200/50 rounded w-1/2" />
                  <div className="flex gap-2 pt-4">
                    <div className="h-10 bg-slate-200/50 rounded-xl flex-1" />
                    <div className="h-10 bg-slate-200/50 rounded-xl flex-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-24 text-center glass rounded-3xl border-dashed border-2">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900">No products found</h3>
            <p className="mt-2 text-slate-500">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setPriceRange({ min: 0, max: 5000 });
              }}
              className="mt-6 text-purple-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
