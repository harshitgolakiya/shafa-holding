import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  light?: boolean;
};

export function Logo({ light = false }: LogoProps) {
  return (
    <Link href="/" aria-label="Shafa Holding home" className="inline-flex shrink-0 items-center">
      <Image
        src={light ? "/logo-white.svg" : "/Shafa-logo.svg"}
        alt=""
        width={183}
        height={49}
        className="h-auto w-[clamp(9.5rem,13vw,11.5rem)]"
        loading="eager"
        unoptimized
        draggable={false}
      />
    </Link>
  );
}
