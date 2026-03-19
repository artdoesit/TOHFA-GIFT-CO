// TOHFA GIFTING CO - Production Optimized
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Custom Photo Mug",
    price: 250,
    image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&q=80&w=400",
    description: "Personalized ceramic mug with your favorite memories.",
    category: "Mugs",
  },
  {
    id: "2",
    name: "3D Moon Lamp",
    price: 850,
    image: "https://images.unsplash.com/photo-1533221216560-d4d4204c35be?auto=format&fit=crop&q=80&w=400",
    description: "Rechargeable 3D printed moon lamp for a magical vibe.",
    category: "Lamps",
  },
  {
    id: "3",
    name: "Leather Wallet",
    price: 1200,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400",
    description: "Premium handcrafted leather wallet with personalization.",
    category: "Wallets",
  },
  {
    id: "4",
    name: "Explosion Box",
    price: 450,
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=400",
    description: "Creative DIY explosion box for anniversaries and birthdays.",
    category: "Explosion Boxes",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid products={MOCK_PRODUCTS} title="Featured Products" />
      <ProductGrid products={MOCK_PRODUCTS.slice(0, 2)} title="Trending Gifts" />
    </>
  );
}
