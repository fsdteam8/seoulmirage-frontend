"use client";

// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/components/auth-layout";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const resetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  // const router = useRouter();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ResetPasswordFormValues) => {
      const formData = new FormData();
      formData.append("email", data.email);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/forget-password`,
        {
          method: "POST",
          body: formData,
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
      // router.push("/reset-password/otp");
    },

    onError: (error: Error) => {
      console.error("Error during mutation:", error);
      toast.error(`Error: ${error.message}`);
    },
  });

  const onSubmit = (data: ResetPasswordFormValues) => {
    mutation.mutate(data);
  };

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter your email to receive the OTP"
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-brand-gray" aria-hidden="true" />
            </div>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              {...form.register("email")}
              className="pl-10"
              disabled={mutation.isPending}
            />
          </div>
          {form.formState.errors.email && (
            <p className="mt-2 text-xs text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Button
            type="submit"
            className="w-full bg-brand-black text-brand-white hover:bg-brand-black/90"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
