"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import AuthLayout from "@/components/auth-layout";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;

export default function NewPasswordPage() {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  //  console.log(searchParams)
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const form = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (fromdata: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/forget/password/reset`,
        {
          method: "POST",
          body: fromdata,
        }
      );

      if (!res.ok) {
        let errorMsg = "Something went wrong";
        try {
          const error = await res.json();
          if (error?.message) errorMsg = error.message;
          console.error("API Error Response:", error);
        } catch (e) {
          console.error("Failed to parse error response:", e);
        }
        throw new Error(errorMsg);
      }

      const result = await res.json();
      console.log("API Success Response:", result);
      return result;
    },

    onSuccess: () => {
      toast.success("Reset password link has been sent to your email address.");
      router.push("/login");
    },

    onError: (error: Error) => {
      console.error("Error during mutation:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  const onSubmit = async (data: NewPasswordFormValues) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("token", token);
    formData.append("password", data.newPassword);
    formData.append("password_confirmation", data.confirmPassword);
    mutation.mutate(formData);
  };

  return (
    <AuthLayout title="Reset password" subtitle="Enter your new password">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="newPassword" className="sr-only">
            New Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-brand-gray" aria-hidden="true" />
            </div>
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              {...form.register("newPassword")}
              className="pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-brand-gray hover:text-brand-text-dark"
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {form.formState.errors.newPassword && (
            <p className="mt-2 text-xs text-red-600">
              {form.formState.errors.newPassword.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-brand-gray" aria-hidden="true" />
            </div>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...form.register("confirmPassword")}
              className="pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-brand-gray hover:text-brand-text-dark"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {form.formState.errors.confirmPassword && (
            <p className="mt-2 text-xs text-red-600">
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div>
          <Button
            type="submit"
            className="w-full bg-brand-black text-brand-white hover:bg-brand-black/90"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Continuing..." : "Continue"}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
