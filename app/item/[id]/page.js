"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useCart } from "../../context/CartContext";

// We bring in the same mock data used on the Search Page to unblock the prototype
const sampleProducts = [
  { id: 1, name: "Kitchen Gas Lighter", category: "Kitchen Appliances", price: 150, image: "/lighter.jpg", description: "A safe and reliable gas lighter for everyday kitchen use." },
  { id: 2, name: "Knife Set", category: "Home Appliances", price: 800, image: "/knife.jpg", description: "Premium stainless steel knife set for all your culinary needs." },
  { id: 3, name: "Steel Hanger", category: "Home Appliances", price: 200, image: "/hanger.jpg", description: "Durable and space-saving stainless steel hangers." },
  { id: 4, name: "Scissors Pack", category: "Office & Workspace", price: 120, image: "/scissors.jpg", description: "Sharp, multipurpose scissors for home or office." },
  { id: 5, name: "Bulk Kitchen Tools Pack", category: "Bulk Deals", price: 1500, image: "/bulk.jpg", description: "A comprehensive bulk pack of essential kitchen tools." },
];

export default function ItemPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      // 1. First, check if the ID matches our prototype mock data
      const mockItem = sampleProducts.find((p) => p.id.toString() === id);
      
      if (mockItem) {
        // Map 'image' to 'imageUrl' to match your component structure
        setItem({ ...mockItem, imageUrl: mockItem.image });
        setLoading(false);
        return;
      }

      // 2. If not in mock data, try fetching from Firebase
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document in Firebase!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
        // If it's a mock item, just redirect. Otherwise, delete from Firebase.
        const isMockItem = sampleProducts.some((p) => p.id.toString() === id);
        
        if (isMockItem) {
            alert("Cannot delete hardcoded prototype data.");
            return;
        }

        try {
          await deleteDoc(doc(db, "products", id));
          router.push("/search");
        } catch (error) {
          console.error("Error deleting document:", error);
        }
    }
  };

  if (loading) return <div className="p-10 text-center text-lg font-medium">Loading item...</div>;
  if (!item) return <div className="p-10 text-center text-lg font-medium text-red-500">Item not found.</div>;

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-6">
        <button onClick={() => router.back()} className="text-sm font-medium text-indigo-600 hover:underline">
          &larr; Back to Products
        </button>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Item Image */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 shadow-sm md:h-[450px]">
          <img src={item.imageUrl || "/hanger.jpg"} alt={item.name} className="h-full w-full object-cover" />
        </div>

        {/* Item Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-3 inline-block w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            {item.category || "General"}
          </div>
          
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900">{item.name}</h1>
          <p className="mb-6 text-3xl font-bold text-gray-900">${(item.price || 0).toLocaleString()}</p>
          <p className="mb-8 text-lg leading-relaxed text-gray-600">{item.description || "No description provided for this item."}</p>

          <button
            onClick={() => addToCart(item)}
            className="mb-8 w-full rounded-xl bg-indigo-600 px-6 py-4 text-center text-lg font-bold text-white shadow-md transition hover:bg-indigo-700 md:w-auto"
          >
            Add to Cart
          </button>

          {/* Edit / Delete Controls */}
          <div className="flex gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <button 
              onClick={() => router.push(`/edit/${item.id}`)}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Edit Item
            </button>
            <button 
              onClick={handleDelete}
              className="flex-1 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
            >
              Delete Item
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}