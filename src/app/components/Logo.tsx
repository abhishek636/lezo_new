import Link from 'next/link';
import Image from 'next/image';

const Logo = () => (
  <div className="absolute top-1/8 w-full flex justify-center sz-20">
    <Link href="/">
      <Image
        src="/new_logo.svg"
        alt="LEZO Logo"
        width={295}
        height={90}
        priority
        className="w-[196px] h-[58px] sm:w-[295px] sm:h-[90px] object-contain cursor-pointer"
      />
    </Link>
  </div>
);

export default Logo;
