"use client";

import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();
    // This useEffect checks if the user is authenticated when the component runs. If not, it redirects to the /auth page. If authenticated, it sets the user state with the current user's information.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/auth");
      } else {
        setUser(currentUser);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);
  // If the user state is still null, it means we're waiting for the authentication check to complete, so we can show a loading message or spinner.
  if (!user) {
    return (
      <main className="bg-white px-6 py-10 text-black">
        <p>Loading account...</p>
      </main>
    );
  }
  // Display username by taking the email and removing the @ and domain part
  const username = user.displayName || user.email.split("@")[0];

  return (
    <main className="mx-auto max-w-5xl bg-white px-6 py-10 text-black">
      <div className="rounded-xl border border-gray-200 bg-white p-8">
        <h1 className="mb-6 text-3xl font-bold text-black">My Account</h1>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-4">
            <p className="mb-2 text-sm text-black">Username</p>
            <p className="font-medium text-black">{username}</p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <p className="mb-2 text-sm text-black">Email</p>
            <p className="font-medium text-black">{user.email}</p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <p className="mb-2 text-sm text-black">User ID</p>
            <p className="break-all font-medium text-black">{user.uid}</p>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <p className="mb-2 text-sm text-black">Account Status</p>
            <p className="font-medium text-black">Signed In</p>
          </div>
        </div>
      </div>
    </main>
  );
}