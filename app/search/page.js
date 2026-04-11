"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const sampleProducts = [
  {
    id: 1,
    name: "Kitchen Gas Lighter",
    category: "Kitchen Appliances",
    price: 150,
    image: "/lighter.jpg",
  },
  {
    id: 2,
    name: "Knife Set",
    category: "Home Appliances",
    price: 800,
    image: "/knife.jpg",
  },
  {
    id: 3,
    name: "Steel Hanger",
    category: "Home Appliances",
    price: 200,
    image: "/hanger.jpg",
  },
  {
    id: 4,
    name: "Scissors Pack",
    category: "Office & Workspace",
    price: 120,
    image: "/scissors.jpg",
  },
  {
    id: 5,
    name: "Bulk Kitchen Tools Pack",
    category: "Bulk Deals",
    price: 1500,
    image: "/bulk.jpg",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return sampleProducts;

    return sampleProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value)
    );
  }, [query]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-8 pb-16">
      {/* Back Navigation */}
      <div className="mb-5">
        <Link
          href="/"
          className="text-base font-medium text-indigo-600 hover:underline"
        >
          &larr; Back to Home
        </Link>
      </div>

      {/* Search Header */}
      <div className="mb-7 rounded-2xl border border-gray-200 bg-gradient-to-br from-indigo-50 to-white p-7">
        <h1 className="mb-3 text-4xl font-extrabold text-gray-900">
          Search Products
        </h1>

        <p className="mb-5 max-w-2xl text-lg text-gray-600">
          Browse Satguru Store items by searching product names or categories.
        </p>

        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-lg rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-500 px-4 py-3 text-base outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* Results Count */}
      <div className="mb-5 text-base font-medium text-gray-700">
        {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div
              key={item.id}
              className="rounded-[18px] border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.name}
                className="mb-3 h-44 w-full rounded-xl bg-gray-100 object-cover"
              />

              <div className="mb-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                {item.category}
              </div>

              <h2 className="mb-2 text-xl font-bold text-gray-900">
                {item.name}
              </h2>

              <p className="mb-4 text-lg font-bold text-gray-900">
                ${item.price.toLocaleString()}
              </p>

              {/* View Product Link - Replaced Button */}
              <Link
                href={`/item/${item.id}`}
                className="block w-full rounded-xl bg-indigo-600 p-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                View Product
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-gray-500">
            No matching products found.
          </div>
        )}
      </div>
    </main>
  );
}