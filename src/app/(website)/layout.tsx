import { Suspense } from "react";
import { Navbar } from "../components/navbar";
import { LoadingAnimation } from "../components/loading-animation";

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
