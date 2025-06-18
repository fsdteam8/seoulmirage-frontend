"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCartStore } from "@/store/cart-store"
// import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { createCheckoutSession, createOrder, OrderData } from "@/types/order"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  apartment: string
  city: string
  state: string
  postal: string
  country: string
  promo: string
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  // const router = useRouter()
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    apartment: "",
    city: "",
    state: "",
    postal: "",
    country: "",
    promo: "",
  })

  const subtotal = getTotalPrice()
  const shippingCosts = {
    standard: 5.99,
    express: 12.99,
    overnight: 24.99,
  }
  const shipping = shippingCosts[shippingMethod as keyof typeof shippingCosts]
  const total = subtotal + shipping

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (orderResponse) => {
      // On successful order creation, create checkout session
      createCheckoutMutation.mutate({
        order_id: orderResponse.id,
        email: formData.email,
      })
    },
    onError: (error) => {
      toast.error(`Failed to create order: ${error.message}`)
    },
  })

  // Create checkout session mutation
  const createCheckoutMutation = useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (checkoutResponse) => {
      if (checkoutResponse.status === "success" && checkoutResponse.checkout_url) {
        // Clear cart and redirect to Stripe checkout
        clearCart()
        window.location.href = checkoutResponse.checkout_url
      } else {
        toast.error("Failed to create checkout session")
      }
    },
    onError: (error) => {
      toast.error(`Failed to create checkout session: ${error.message}`)
    },
  })

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validateForm = (): boolean => {
    const requiredFields: (keyof FormData)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "city",
      "state",
      "postal",
      "country",
    ]

    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`)
        return false
      }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return false
    }

    if (items.length === 0) {
      toast.error("Your cart is empty")
      return false
    }

    return true
  }

  const handlePayment = () => {
    if (!validateForm()) {
      return
    }

    // Prepare order data
    const orderData: OrderData = {
      full_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      full_address: formData.apartment ? `${formData.apartment}, ${formData.city}` : formData.city,
      city: formData.city,
      state: formData.state,
      postal_code: formData.postal,
      country: formData.country,
      type: "online",
      items: items.length.toString(),
      status: "pending",
      shipping_method: shippingMethod,
      shipping_price: shipping.toString(),
      order_summary: items.map((item) => `${item.name} x${item.quantity}`).join(", "),
      payment_method: "cash_on_delivery",
      payment_status: "unpaid",
      promocode_id: formData.promo ? "1" : undefined,
      total: total.toString(),
      products: items.map((item) => ({
        product_id: item.id.toString(),
        quantity: item.quantity.toString(),
      })),
      promocode_name: formData.promo || undefined,
    }

    // Create order
    createOrderMutation.mutate(orderData)
  }

  const isLoading = createOrderMutation.isPending || createCheckoutMutation.isPending

  return (
    <div className="min-h-screen bg-[#F5E6D3]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg">
            <div className="space-y-6">
              {/* Shipping Information */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Full name *</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      placeholder="01700000001"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="apartment"
                      placeholder="House 1, Road 1"
                      value={formData.apartment}
                      onChange={(e) => handleInputChange("apartment", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      placeholder="Dhaka"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province *</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => handleInputChange("state", value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dhaka">Dhaka</SelectItem>
                        <SelectItem value="chittagong">Chittagong</SelectItem>
                        <SelectItem value="sylhet">Sylhet</SelectItem>
                        <SelectItem value="rajshahi">Rajshahi</SelectItem>
                        <SelectItem value="khulna">Khulna</SelectItem>
                        <SelectItem value="barisal">Barisal</SelectItem>
                        <SelectItem value="rangpur">Rangpur</SelectItem>
                        <SelectItem value="mymensingh">Mymensingh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="postal">Postal Code *</Label>
                    <Input
                      id="postal"
                      placeholder="1205"
                      value={formData.postal}
                      onChange={(e) => handleInputChange("postal", e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="promo">Promo Code</Label>
                    <Input
                      placeholder="FREESHIP"
                      value={formData.promo}
                      onChange={(e) => handleInputChange("promo", e.target.value)}
                      className="mb-2"
                      id="promo"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => handleInputChange("country", value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} disabled={isLoading}>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard Shipping (5-7 business days)</Label>
                    </div>
                    <span className="font-semibold">$5.99</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express">Express Shipping (2-3 business days)</Label>
                    </div>
                    <span className="font-semibold">$12.99</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="overnight" id="overnight" />
                      <Label htmlFor="overnight">Overnight Shipping (1 business day)</Label>
                    </div>
                    <span className="font-semibold">$24.99</span>
                  </div>
                </RadioGroup>
              </div>

              {/* Error Display */}
              {(createOrderMutation.error || createCheckoutMutation.error) && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">
                    {createOrderMutation.error?.message || createCheckoutMutation.error?.message}
                  </p>
                </div>
              )}

              <Button
                onClick={handlePayment}
                disabled={isLoading}
                className="w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Payment →"
                )}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">${item.price}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              {formData.promo && (
                <div className="flex justify-between text-green-600">
                  <span>Promo ({formData.promo})</span>
                  <span>Applied</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
