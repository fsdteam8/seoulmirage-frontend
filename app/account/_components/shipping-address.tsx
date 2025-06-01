"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Zod schema
const addressSchema = z.object({
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  stateProvince: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
  country: z.string().min(1, "Country is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function ShippingAddress() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      apartment: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "",
    },
  });

  const onSubmit = (data: AddressFormValues) => {
    console.log("Shipping address submitted:", data);
    // handle API call or update logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Shipping Address
      </h2>

      {/* Apartment */}
      <div className="mb-4">
        <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
        <Input id="apartment" {...register("apartment")} />
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" {...register("city")} />
          {errors.city && (
            <p className="text-sm text-red-500">{errors.city.message}</p>
          )}
        </div>

        {/* State/Province */}
        <div className="space-y-2">
          <Label htmlFor="stateProvince">State/Province</Label>
          <Select
            onValueChange={(value) => setValue("stateProvince", value)}
            value={watch("stateProvince")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ca">California</SelectItem>
              <SelectItem value="ny">New York</SelectItem>
              <SelectItem value="tx">Texas</SelectItem>
              <SelectItem value="fl">Florida</SelectItem>
              <SelectItem value="wa">Washington</SelectItem>
            </SelectContent>
          </Select>
          {errors.stateProvince && (
            <p className="text-sm text-red-500">
              {errors.stateProvince.message}
            </p>
          )}
        </div>

        {/* Postal Code */}
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" {...register("postalCode")} />
          {errors.postalCode && (
            <p className="text-sm text-red-500">{errors.postalCode.message}</p>
          )}
        </div>
      </div>

      {/* Country */}
      <div className="mb-6 space-y-2">
        <Label htmlFor="country">Country</Label>
        <Select
          onValueChange={(value) => setValue("country", value)}
          value={watch("country")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="au">Australia</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="text-sm text-red-500">{errors.country.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium"
      >
        Update Shipping Address
      </Button>
    </form>
  );
}
