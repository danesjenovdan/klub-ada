import { LoadingAnimation } from "@/src/app/components/loading-animation";
import { PageWrapper } from "@/src/app/components/page-wrapper";

export default function Loading() {
  return (
    <div className="w-full pt-32 flex items-center justify-center">
      <LoadingAnimation />
    </div>
  );
}
