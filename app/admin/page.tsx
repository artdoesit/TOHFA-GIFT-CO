"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit, LayoutDashboard, Settings, Package, LogOut, Lock } from "lucide-react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { cn } from "@/lib/utils";
import { Product } from "@/types";

export default function AdminPanel() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const adminEmail = "admin@tohfagifting.co";
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "Mugs",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/");
      } else if (currentUser.email !== adminEmail) {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
        setUser(currentUser);
        fetchProducts();
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        ...formData,
        price: Number(formData.price),
      });
      setFormData({ name: "", price: "", image: "", description: "", category: "Mugs" });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const logout = () => {
    signOut(auth);
    router.push("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-6">
          <Lock className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-slate-400 mb-8 max-w-md">
          You don't have permission to access this area. Only the designated administrator can view this panel.
        </p>
        <button 
          onClick={() => router.push("/")}
          className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 glass-dark border-r border-slate-800 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold">A</div>
          <span className="text-xl font-bold tracking-tight">Admin Portal</span>
        </div>

        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-600/20 text-purple-400 font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
            <Package className="w-5 h-5" /> Manage Products
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>

        <button 
          onClick={logout}
          className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold">Product Management</h1>
          <div className="flex items-center gap-4">
            <div className="glass px-4 py-2 rounded-xl text-sm border-purple-500/30">
              admin@tohfagifting.co
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* Add Product Form */}
          <div className="xl:col-span-1">
            <div className="glass-dark p-8 rounded-[2rem] border border-white/10 shadow-2xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-500" /> Add New Product
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="e.g. Custom Mug"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="250"
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Image URL</label>
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Description</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors h-32 resize-none"
                    placeholder="Tell something about the product..."
                  />
                </div>
                <div>
                  <label className="text-sm text-slate-400 block mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Mugs" className="bg-slate-900">Mugs</option>
                    <option value="Lamps" className="bg-slate-900">Lamps</option>
                    <option value="Wallets" className="bg-slate-900">Wallets</option>
                    <option value="Explosion Boxes" className="bg-slate-900">Explosion Boxes</option>
                    <option value="Custom Gifts" className="bg-slate-900">Custom Gifts</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-transform active:scale-95"
                >
                  Create Product
                </button>
              </form>
            </div>
          </div>

          {/* Product Table */}
          <div className="xl:col-span-2">
            <div className="glass-dark rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-400">Product</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-400">Category</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-400">Price</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-10 text-center text-slate-500 italic">
                        Loading products...
                      </td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-10 text-center text-slate-500 italic">
                        No products found. Start by adding some!
                      </td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden relative border border-white/10">
                              <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                            </div>
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-md text-xs border border-purple-500/20">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-mono">₹{product.price}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
