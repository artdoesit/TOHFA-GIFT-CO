"use client";

import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export default function ProductGrid({ products, title }: ProductGridProps) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black text-slate-900">{title}</h2>
            <button className="text-purple-600 font-bold hover:underline">See all</button>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
