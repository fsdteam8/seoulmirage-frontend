"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Zod schema
const userSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is required"),
  image: z
    .any()
    .refine((file) => file instanceof File || file === null, {
      message: "Invalid image file",
    }),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function UserInformation() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      image: null,
    },
  });

  const image = watch("image");

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setPreviewImage(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);

  const onSubmit = (data: UserFormValues) => {
    console.log("Validated form data:", data);
    // Handle form submission logic
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">User Information</h2>

      {/* Profile Picture */}
      <div className="flex mb-[30px]">
        <label htmlFor="image">
          <Avatar className="w-[200px] h-[200px] border border-gray-200">
            <AvatarImage
              src={previewImage || "/placeholder.svg?height=80&width=80"}
              alt="Profile"
            />
            <AvatarFallback className="text-lg">JD</AvatarFallback>
          </Avatar>
        </label>
        <input
          type="file"
          id="image"
          hidden
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue("image", file);
            }
          }}
        />
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] mb-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" {...register("firstName")} />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" {...register("lastName")} />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" {...register("phone")} />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Save Button */}
      <Button
        type="submit"
        className="bg-black text-white px-6 rounded-3xl py-[10px] hover:bg-gray-800 transition-colors font-medium"
      >
        Update Profile
      </Button>
    </form>
  );
}
