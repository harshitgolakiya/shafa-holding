import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="Shafa Holding home" className="inline-flex shrink-0 items-center">
      <Image
        src="/final-logo.svg"
        alt=""
        width={138}
        height={30}
        className="h-auto w-[clamp(9.5rem,13vw,11.5rem)]"
        loading="eager"
        unoptimized
        draggable={false}
      />
    </Link>
  );
}
