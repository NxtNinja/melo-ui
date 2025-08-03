// components/layouts/ProtectedLayout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (res.status !== 200) {
          router.replace("/login");
        } else {
          setChecking(false);
        }
      } catch {
        router.replace("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderCircle className="animate-spin h-6 w-6" />
      </div>
    );
  }

  return <>{children}</>;
}
