export function LoadingPing() {
  return (
    <span className="relative flex justify-center items-center size-8">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-pink300"></span>
      <span className="relative inline-flex size-6 rounded-full bg-pink500"></span>
    </span>
  );
}
