"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1s splash
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="splash-overlay">
        <div className="loader"><Image src='logo.svg' alt="logo" width={120} height={60} /></div>
      </div>
    );
  }

  return <>{children}</>;
}
