"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

// Bring in the mock data so we can load prototype items into the form
const sampleProducts = [
  { id: 1, name: "Kitchen Gas Lighter", category: "Kitchen Appliances", price: 150, image: "/lighter.jpg", description: "A safe and reliable gas lighter for everyday kitchen use." },
  { id: 2, name: "Knife Set", category: "Home Appliances", price: 800, image: "/knife.jpg", description: "Premium stainless steel knife set for all your culinary needs." },
  { id: 3, name: "Steel Hanger", category: "Home Appliances", price: 200, image: "/hanger.jpg", description: "Durable and space-saving stainless steel hangers." },
  { id: 4, name: "Scissors Pack", category: "Office & Workspace", price: 120, image: "/scissors.jpg", description: "Sharp, multipurpose scissors for home or office." },
  { id: 5, name: "Bulk Kitchen Tools Pack", category: "Bulk Deals", price: 1500, image: "/bulk.jpg", description: "A comprehensive bulk pack of essential kitchen tools." },
];

export default function EditItemPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchItem = async () => {
      // 1. Check mock data first
      const mockItem = sampleProducts.find((p) => p.id.toString() === id);
      
      if (mockItem) {
        setFormData({
          name: mockItem.name,
          price: mockItem.price.toString(),
          description: mockItem.description,
          category: mockItem.category,
          imageUrl: mockItem.image, // mapping image to imageUrl
        });
        setLoading(false);
        return;
      }

      // 2. Fallback to Firebase
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            name: data.name || "",
            price: data.price ? data.price.toString() : "",
            description: data.description || "",
            category: data.category || "",
            imageUrl: data.imageUrl || "",
          });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const isMockItem = sampleProducts.some((p) => p.id.toString() === id);

    // If it's a mock item, simulate the save for the prototype presentation
    if (isMockItem) {
      setTimeout(() => {
        alert("Prototype Mode: Changes saved! (Note: Hardcoded mock items will reset on refresh).");
        router.push(`/item/${id}`);
      }, 800);
      return;
    }

    // If it's a Firebase item, actually update the database
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        name: formData.name,
        price: Number(formData.price), // Convert string back to number
        description: formData.description,
        category: formData.category,
        imageUrl: formData.imageUrl,
      });
      router.push(`/item/${id}`); // Send user back to the item page after saving
    } catch (error) {
      console.error("Error updating document:", error);
      alert("Failed to save changes. Make sure your client is online.");
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-lg font-medium">Loading editor...</div>;

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-6">
        <button onClick={() => router.back()} className="text-sm font-medium text-indigo-600 hover:underline">
          &larr; Cancel and Go Back
        </button>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-8 text-3xl font-extrabold text-gray-900">Edit Item</h1>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Item Name */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">Product Name</label>
              <input 
                required 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
              />
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Price ($)</label>
              <input 
                required 
                type="number" 
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">Category</label>
              <input 
                required 
                type="text" 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">Image Path / URL</label>
              <input 
                type="text" 
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-500" 
              />
              <p className="mt-1 text-xs text-gray-500">For prototype images, use local paths like "/hanger.jpg"</p>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">Description</label>
              <textarea 
                required 
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none" 
              ></textarea>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4 border-t border-gray-200 pt-6">
            <button 
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-xl border border-gray-300 bg-white px-5 py-4 text-center text-sm font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSaving}
              className="flex-1 rounded-xl bg-indigo-600 px-5 py-4 text-center text-sm font-bold text-white shadow-md transition hover:bg-indigo-700 disabled:bg-indigo-400"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}