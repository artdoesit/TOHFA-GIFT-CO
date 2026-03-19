// TOHFA GIFTING CO - Production Optimized
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Custom Photo Mug",
    price: 250,
    image: "/products/mug.png",
    description: "Personalized ceramic mug with your favorite memories.",
    category: "Mugs",
  },
  {
    id: "2",
    name: "3D Moon Lamp",
    price: 850,
    image: "/products/lamp.png",
    description: "Rechargeable 3D printed moon lamp for a magical vibe.",
    category: "Lamps",
  },
  {
    id: "3",
    name: "Leather Wallet",
    price: 1200,
    image: "/products/wallet.png",
    description: "Premium handcrafted leather wallet with personalization.",
    category: "Wallets",
  },
  {
    id: "4",
    name: "Explosion Box",
    price: 450,
    image: "/products/explosion-box.png",
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
