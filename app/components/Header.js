"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useRegion } from "../context/RegionContext";

export default function Header() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const { cart } = useCart(); // <-- Access the cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const { region } = useRegion();
  const currency = region ? region.split("-")[1] : null;

  // This useEffect checks the authentication state of the user when the Header component mounts.
  // It listens for changes in authentication status and updates the user state accordingly.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // This useEffect adds an event listener to detect clicks outside the dropdown menu.
  // If a click is detected outside the menu, it closes the menu by setting menuOpen to false.
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // This function handles the sign-out process.
  // It calls the Firebase signOut function, closes the menu, and redirects the user to the home page.
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // Displays the username by taking the user's email and removing the @ and domain part.
  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "My Account";

  return (
    <header className="border-b border-gray-200 bg-white text-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold"
          style={{
            color: "black",
            WebkitTextStroke: "1px #5478FF",
          }}
        >
          Satguru Store
        </Link>

        <nav className="hidden gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-black hover:underline"
          >
            Home
          </Link>

          <Link
            href="/search"
            className="text-sm font-medium text-black hover:underline"
          >
            Products
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-black hover:underline"
          >
            About
          </Link>

          <Link
            href="/"
            className="text-sm font-medium text-black hover:underline"
          >
            Contact
          </Link>
        </nav>

          <div className="flex items-center gap-4"> {/* Added a wrapper for Cart + Account */}
            {currency && (
              <span className="text-sm font-medium text-black">{currency}</span>
            )}
            <Link href="/cart" className="relative text-black hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-100"
          >
            {user ? displayName : "My Account"}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-md">
              {!user ? (
                <Link
                  href="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm text-black hover:bg-gray-100"
                >
                  Sign In
                </Link>
              ) : (
                <>
                  <Link
                    href="/account"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-sm text-black hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full px-4 py-3 text-left text-sm text-black hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}