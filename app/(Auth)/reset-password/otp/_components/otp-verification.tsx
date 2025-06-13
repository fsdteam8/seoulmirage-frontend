"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  //   CardDescription,
  //   CardHeader,
  //   CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AuthLayout from "@/components/auth-layout";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter a complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success/failure
      if (otp === "123456") {
        alert("Verification successful!");
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen  from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back button */}
        <AuthLayout title="Enter OTP" subtitle="Enter verification code">
          <Card className="border-none bg-white shadow-none">
            <CardContent className="space-y-6 shadow-none">
              {/* OTP Input */}
              <div className="space-y-2">
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => {
                      setOtp(value);
                      setError("");
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot className="py-5 px-5" index={0} />
                      <InputOTPSlot className="py-5 px-5" index={1} />
                      <InputOTPSlot className="py-5 px-5" index={2} />
                      <InputOTPSlot className="py-5 px-5" index={3} />
                      <InputOTPSlot className="py-5 px-5" index={4} />
                      <InputOTPSlot className="py-5 px-5" index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Verify button */}
              <Button
                onClick={handleVerify}
                disabled={otp.length !== 6 || isLoading}
                className="w-full h-12 text-base font-medium"
              >
                {isLoading ? "Verifying..." : "Verify Account"}
              </Button>
            </CardContent>
          </Card>
        </AuthLayout>
      </div>
    </div>
  );
}
