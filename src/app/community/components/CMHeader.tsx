import Image from "next/image";
import Link from "next/link";
import CHeaderNav from "./CHeaderNav";

function CMHeader() {
  return (
    <header
      className="
    w-full 
    mx-auto
    bg-white shadow-md
    px-3


    flex flex-col justify-center items-center
    md:flex-row md:justify-between
  "
    >
      <Link href="/">
        <Image
          src="/images/피부르르_가로_로그인로고.png"
          alt="로그인 로고"
          width={250}
          height={100}
          className="min-w-[500px] sm:min-w-[300px]"
        />
      </Link>
      <CHeaderNav />
      <div className="flex gap-4 items-center px-3">
        <span>김형준님</span>
        <button className="bg-pink-500 text-white px-3 py-1 rounded">
          로그아웃
        </button>
      </div>
    </header>
  );
}

export default CMHeader;
