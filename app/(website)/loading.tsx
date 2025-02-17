import { LoadingAnimation } from "../components/loading-animation";
import { PageWrapper } from "../components/page-wrapper";

export default function Loading() {
  return (
    <div className="w-full pt-32 flex items-center justify-center">
      <LoadingAnimation />
    </div>
  );
}
