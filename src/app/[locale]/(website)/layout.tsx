import { Suspense } from "react";
import { Navbar } from "@/src/app/[locale]/components/navbar";
import { LoadingAnimation } from "@/src/app/[locale]/components/loading-animation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="w-full pt-32 flex items-center justify-center">
            <LoadingAnimation />
          </div>
        }
      >
        {children}
      </Suspense>
    </>
  );
}
