"use client";

import { useEffect, useState } from "react";
import { auth, googleProvider } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setStreetAddress("");
    setCity("");
    setProvince("");
    setPostalCode("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // handles Google sign in separately from the email/password form
  const handleGoogleSignIn = async () => {
    setMessage("");

    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (error) {

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

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("Please enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to send reset email.");
    }
  };

  // handleSubmit is used for both registration and login, so it checks the mode and calls the appropriate Firebase function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (isRegisterMode && password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (isRegisterMode) {
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setMessage("Password must contain an upper case character.");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setMessage("Password must contain a numeric character.");
      return;
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
      setMessage("Password must contain a non-alphanumeric character.");
      return;
    }
  }

    try {
      if (isRegisterMode) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      resetFields();
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
      <div className={`w-full rounded-xl bg-white p-8 shadow-md ${isRegisterMode ? "max-w-2xl" : "max-w-md"}`}>
        <h1
          className="mb-6 text-center text-3xl font-bold"
          style={{
            color: "black",
            WebkitTextStroke: "1px #5478FF",
          }}
        >
          Satguru Store
        </h1>
        {/* The form uses the handleSubmit function for both registration and login, so it checks the mode and calls the appropriate Firebase function */}  
        <h2 className="mb-6 text-center text-2xl font-bold italic text-black">
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode ? (
            <>
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-black">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:border-[#5478FF] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-black">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:border-[#5478FF] focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:border-[#5478FF] focus:outline-none"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:border-[#5478FF] focus:outline-none"
                />
              </div>

              {/* Street Address */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="123 Main Street"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:border-[#5478FF] focus:outline-none"
                />
              </div>

              {/* City, Province, Postal Code */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-black">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Calgary"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:border-[#5478FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-black">
                    Province
                  </label>
                  <input
                    type="text"
                    placeholder="AB"
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:border-[#5478FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-black">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="T2L 8A1"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:border-[#5478FF] focus:outline-none"
                  />
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-black">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-4 py-3 pr-16 text-black placeholder-gray-400 focus:border-[#5478FF] focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-black">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-4 py-3 pr-16 text-black placeholder-gray-400 focus:border-[#5478FF] focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Email Address */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-black placeholder-gray-400 focus:border-[#5478FF] focus:outline-none"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-3 pr-16 text-black placeholder-gray-400 focus:border-[#5478FF] focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-[#5478FF] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full rounded-md px-4 py-3 text-white hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: "#5478FF" }}
          >
            {/* The button text changes based on the mode */}
            {isRegisterMode ? "Create Account" : "Sign In"}
          </button>
        </form>

        {/* The heading changes based on whether the user is in register mode or sign-in mode */}
        {isRegisterMode ? (
          <p className="mt-4 text-center text-sm text-black">
            Already have an account?{" "}
            <button
              onClick={() => { setIsRegisterMode(false); resetFields(); setMessage(""); }}
              className="text-[#5478FF] hover:underline cursor-pointer"
            >
              Sign in
            </button>
          </p>
        ) : (
          <p className="mt-4 text-center text-sm text-black">
            Need an account?{" "}
            <button
              onClick={() => { setIsRegisterMode(true); resetFields(); setMessage(""); }}
              className="text-[#5478FF] hover:underline cursor-pointer"
            >
              Sign up
            </button>
            {" "}Or{" "}
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-[#5478FF] hover:underline cursor-pointer"
            >
              Continue as Guest
            </button>
          </p>
        )}

        {message && (
          <p className="mt-4 text-center text-sm text-slate-700">{message}</p>
        )}
      </div>
    </main>
  );
}