"use client";

import { createContext, useContext, useState } from "react";

const RegionContext = createContext();

export function RegionProvider({ children }) {
  const [region, setRegion] = useState("");

  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  return useContext(RegionContext);
}
