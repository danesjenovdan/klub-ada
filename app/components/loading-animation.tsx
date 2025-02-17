import Image from "next/image";

export function LoadingAnimation() {
  return (
    <Image src="/assets/loader.gif" alt="loader" height={250} width={250} />
  );
}
