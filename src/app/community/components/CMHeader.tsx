"use client";
import { checkLoginStatus, getUserInfo, logout } from "@/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

function CMHeader() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname(); // ✅ 현재 경로 확인

  const { data: loginState } = useQuery({
    queryKey: ["loginState"],
    queryFn: checkLoginStatus,
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
  });

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    // refetchOnMount: true,
    // refetchOnWindowFocus: true,
  });

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      Swal.fire("로그아웃", "로그아웃 되었습니다.", "success").then(() => {
        queryClient.invalidateQueries({ queryKey: ["userInfo"] });
        queryClient.invalidateQueries({ queryKey: ["loginState"] }); // 추가
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        Swal.fire("오류", `로그 아웃 실패 : ${error.message}`, "error");
      } else {
        Swal.fire("오류", `알 수 없는 에러`, "error");
      }
    },
  });
  if (pathname === "/community/login") return;
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
      <div className="flex gap-4 items-center px-3">
        {loginState ? (
          <div className="flex flex-row items-center gap-x-3">
            <span>{userInfo?.userName}님</span>
            <button
              onClick={() => mutation.mutate()}
              className="
          bg-pink-500 text-white font-bold rounded-lg
          hover:bg-pink-600 active:bg-pink-700
          transition cursor-pointer
          px-4 py-2
          text-sm sm:text-lg
          "
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => router.push("/community/login")}
              className="
          bg-pink-500 text-white font-bold rounded-lg
          hover:bg-pink-600 active:bg-pink-700
          transition cursor-pointer
          px-4 py-2
          text-sm sm:text-lg
          "
            >
              로그인
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default CMHeader;
