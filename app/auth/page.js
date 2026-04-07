"use client";

import { useEffect, useState } from "react";
import { auth, googleProvider } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  // handles Google sign in separately from the email/password form
  const handleGoogleSignIn = async () => {
    setMessage("");

    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/popup-closed-by-user":
          setMessage("Google sign in was cancelled.");
          break;
        case "auth/popup-blocked":
          setMessage("Popup was blocked by the browser.");
          break;
        default:
          setMessage("Google sign in failed.");
      }
    }
  };

  // handleSubmit is used for both registration and login, so it checks the mode and calls the appropriate Firebase function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
        if (isRegisterMode) {
        await createUserWithEmailAndPassword(auth, email, password);
        } else {
        await signInWithEmailAndPassword(auth, email, password);
        }

        setEmail("");
        setPassword("");
        setUsername("");
        router.push("/");
    } catch (error) {
        console.error(error);

        switch (error.code) {
        case "auth/email-already-in-use":
            setMessage("That email is already in use.");
            break;
        case "auth/invalid-email":
            setMessage("Invalid email address.");
            break;
        case "auth/weak-password":
            setMessage("Password must be at least 6 characters.");
            break;
        case "auth/invalid-credential":
            setMessage("Incorrect email or password.");
            break;
        default:
            setMessage("Something went wrong.");
        }
      }
    };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-900">
          Satguru Store
        </h1>
        {/* The heading changes based on whether the user is in register mode or sign-in mode */}
        <h2 className="mb-6 text-center text-xl font-semibold text-black">
          {isRegisterMode ? "Register" : "Sign In"}
        </h2>
        {/* Google sign in button sits above the email/password inputs */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="mb-4 w-full rounded-md border border-black bg-white px-4 py-3 text-black hover:bg-gray-100"
        >
          Sign in with Google
        </button>

        {/* The form uses the handleSubmit function for both registration and login, so it checks the mode and calls the appropriate Firebase function */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-black px-4 py-3 text-black placeholder-black"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-black px-4 py-3 text-black placeholder-black"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-black px-4 py-3 text-black placeholder-black"
            required
          />

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-3 text-white hover:bg-blue-700"
          >
            {/* The button text changes based on the mode */}
            {isRegisterMode ? "Create Account" : "Sign In"}
          </button>
        </form>
        {/* This button toggles between register mode and sign-in mode, allowing users to switch between the two forms. It also clears any messages when switching modes. */}
        <button
          onClick={() => {
            setIsRegisterMode(!isRegisterMode);
            setMessage("");
          }}
          className="mt-4 w-full text-sm text-blue-600 hover:underline"
        >
          {isRegisterMode
            ? "Already have an account? Sign in"
            : "Need an account? Register"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-slate-700">{message}</p>
        )}
      </div>
    </main>
  );
}