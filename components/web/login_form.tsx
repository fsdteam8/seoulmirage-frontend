"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// 1. Zod Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    console.log("Form Data:", data);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error);
      }
      toast.success("Login successful!");
      router.push("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Login error:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: "#F5E6D3" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-normal text-gray-900">
            Sign in to your account
          </h1>
          <p className="text-gray-600 text-base">Or create a new account</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-normal text-gray-700"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-normal text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full h-11 px-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Checkbox and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember-me"
                  {...register("rememberMe")}
                  className="h-4 w-4"
                />
                <Label
                  htmlFor="remember-me"
                  className="text-sm font-normal text-gray-700 cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <Link
                href="/reset-password"
                className="text-sm text-gray-900 hover:text-gray-700 font-normal"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-black hover:bg-gray-800 text-white font-normal rounded-md transition-colors"
            >
              {isLoading ? "Sign in..." : "Sign In"}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="flex mb-4 justify-center">
            <Link
              href="#"
              className="text-gray-900 text-center hover:text-gray-700"
            >
              Don&apos;t have an account?
            </Link>
            {"  "}
            <Link href={"/sign-up"}>
              {" "}
              <span className="underline cursor-pointer">Sgin up</span>
            </Link>
          </div>

          <p className="text-sm text-gray-600">
            By signing in, you agree to our{" "}
            <Link
              href="#"
              className="text-gray-900 hover:text-gray-700 underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="text-gray-900 hover:text-gray-700 underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
