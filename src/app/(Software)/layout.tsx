import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";

export default function SoftwareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center">
            <Loading
              className="text-primary"
              size={
                100
              }
            />
          </div>
        }
      >
        {
          children
        }
      </Suspense>
    </>
  );
}
