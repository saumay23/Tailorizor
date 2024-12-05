"use client";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Bounce,
  ToastContainer,
  toast,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HandleGoogleLogin } from "@/lib/handleGoogleLogin";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const searchParams =
    useSearchParams();

  const router =
    useRouter();

  useEffect(() => {
    const error =
      searchParams.get(
        "error"
      );
    console.log(
      error
    );
    if (
      error
    ) {
      toast.error(
        "Failed to Login! Please try Again after sometime",
        {
          position:
            "top-right",
          autoClose: 5000,
          hideProgressBar:
            false,
          closeOnClick:
            true,
          pauseOnHover:
            true,
          draggable:
            true,
          progress:
            undefined,
          theme:
            "light",
          transition:
            Bounce,
        }
      );
      router.replace(
        "/auth/login"
      );
    }
  }, [
    searchParams,
    router,
  ]);

  return (
    <>
      <div className="flex flex-col bg-[#072C50] items-center justify-center space-y-6 min-h-screen">
        <div className="flex h-28 w-28 justify-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={
              100
            }
            height={
              100
            }
            priority
            sizes="100vw"
            style={{
              width:
                "100%",
              height:
                "auto",
            }}
          />
        </div>
        <p className="font-[family-name:var(--font-arkhip-regular)] capitalize  text-6xl lg:text-8xl text-white">
          Tailorizor
        </p>
        <p className="font-[family-name:var(--font-lato)] text-white text-lg md:text-2xl tracking-widest">
          Tailored
          Resumes,
          Every
          Time
        </p>
        <Button
          variant="outline"
          className="w-80 flex items-center justify-center gap-3 py-6"
          onClick={
            HandleGoogleLogin
          }
        >
          <FcGoogle className="w-5 h-5" />
          <p>
            Get
            Started
            With
            Google
          </p>
        </Button>
      </div>
      <ToastContainer />
    </>
  );
}
