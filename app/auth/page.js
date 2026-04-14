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
import { useRegion } from "../context/RegionContext";

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
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [gstValid, setGstValid] = useState(null);
  const router = useRouter();
  const { setRegion } = useRegion();

  const regions = [
    { label: "Canada (CAD)", value: "CA-CAD" },
    { label: "United States (USD)", value: "US-USD" },
    { label: "United Kingdom (GBP)", value: "GB-GBP" },
    { label: "European Union (EUR)", value: "EU-EUR" },
    { label: "Australia (AUD)", value: "AU-AUD" }
  ];

  // function to validate GST number based on selected region.
  // Currently just hardcoded for simplicity.
  const validateGST = (value) => {
    const country = selectedRegion.split("-")[0];
    const gstPatterns = {
      CA: /^[1-9]\d{0,8}$/,
      US: /^[1-9]\d{0,8}$/,
      GB: /^[1-9]\d{0,8}$/,
      EU: /^[1-9]\d{0,8}$/,
      AU: /^[1-9]\d{0,8}$/,
      IN: /^[1-9]\d{0,8}$/,
    };
    const gstPattern = gstPatterns[country];
    return gstPattern ? gstPattern.test(value.trim()) : value.trim().length >= 5;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (isRegisterMode) {
      setShowRegionModal(true);
    }
  }, [isRegisterMode]);

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
        resetFields();
        setShowRegionModal(true);
        return;
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

              {/* GST Number */}
              <div>
                <label className="mb-1 block text-sm font-medium text-black">
                  GST Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your GST number"
                    value={gstNumber}
                    onChange={(e) => {
                      setGstNumber(e.target.value);
                      if (e.target.value.trim() === "") {
                        setGstValid(null);
                      } else {
                        setGstValid(validateGST(e.target.value));
                      }
                    }}
                    className={`w-full rounded-md border px-4 py-3 pr-10 text-black placeholder-gray-400 focus:outline-none ${
                      gstValid === null
                        ? "border-gray-300 focus:border-[#5478FF]"
                        : gstValid
                        ? "border-green-500 focus:border-green-500"
                        : "border-red-500 focus:border-red-500"
                    }`}
                  />
                  {gstValid === true && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  )}
                  {gstValid === false && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  )}
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
            disabled={isRegisterMode && gstValid !== true}
            className="w-full rounded-md px-4 py-3 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 disabled:hover:opacity-50"
            style={{ backgroundColor: "#5478FF" }}
          >
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

      {showRegionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-3xl bg-white px-10 py-10 shadow-2xl text-center">
            <p className="mb-6 text-base text-black">
              Please select your region &amp; currency
            </p>
            <div className="relative mb-6">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-400 focus:border-[#5478FF] focus:outline-none appearance-none bg-white"
              >
                <option value="" disabled style={{ color: "#9ca3af", fontStyle: "italic" }}>Region &amp; Currency</option>
                {regions.map((r) => (
                  <option key={r.value} value={r.value} style={{ color: "#111827", fontStyle: "normal" }}>{r.label}</option>
                ))}
              </select>
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                fill="currentColor"
              >
                <path d="M25 32.4l-9.7-9.7 1.4-1.4 8.3 8.3 8.3-8.3 1.4 1.4z" />
              </svg>
            </div>
            <button
              onClick={() => {
                if (selectedRegion) {
                  setRegion(selectedRegion);
                }
                setShowRegionModal(false);
              }}
              className="w-full rounded-lg py-3 text-white font-medium hover:opacity-90"
              style={{ backgroundColor: "#5478FF" }}
            >
              Continue
            </button>
            <button
              onClick={() => {
                setShowRegionModal(false);
                router.push("/");
              }}
              className="mt-3 w-full text-sm text-black underline hover:text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}