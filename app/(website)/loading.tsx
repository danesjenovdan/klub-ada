import { LoadingPing } from "../components/loading-ping";
import { PageWrapper } from "../components/page-wrapper";

export default function Loading() {
  return (
    <PageWrapper>
      <div className="w-full h-full flex items-center justify-center">
        <LoadingPing />
      </div>
    </PageWrapper>
  );
}
