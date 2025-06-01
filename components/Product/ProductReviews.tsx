"use client"

import type React from "react"

import { useState } from "react"
import { Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Review {
  id: string
  productId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  date: string
}

interface ReviewsSectionProps {
  productId: string
}

// Mock reviews data - in real app, this would come from an API
const mockReviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userName: "Kristin Watson",
    userAvatar: "/diverse-woman-portrait.png",
    rating: 5,
    comment:
      "You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.",
    date: "March 14, 2021",
  },
  {
    id: "2",
    productId: "1",
    userName: "John Smith",
    userAvatar: "/thoughtful-man.png",
    rating: 5,
    comment: "Amazing product! The quality exceeded my expectations and the customer service was outstanding.",
    date: "March 12, 2021",
  },
  {
    id: "3",
    productId: "1",
    userName: "Sarah Johnson",
    userAvatar: "/woman-2.png",
    rating: 4,
    comment: "Great value for money. Fast delivery and exactly as described. Would definitely recommend!",
    date: "March 10, 2021",
  },
  {
    id: "4",
    productId: "1",
    userName: "Mike Davis",
    userAvatar: "/contemplative-man.png",
    rating: 5,
    comment: "Perfect! This is exactly what I was looking for. The build quality is excellent and it works flawlessly.",
    date: "March 8, 2021",
  },
  {
    id: "5",
    productId: "1",
    userName: "Emily Brown",
    userAvatar: "/woman-3.png",
    rating: 5,
    comment: "Highly recommended! Easy to use and great results. Customer support was very helpful too.",
    date: "March 6, 2021",
  },
  {
    id: "6",
    productId: "product-2",
    userName: "Alex Wilson",
    userAvatar: "/thoughtful-man-3.png",
    rating: 4,
    comment: "Good product overall. Some minor issues but nothing major. Would buy again.",
    date: "March 5, 2021",
  },
]

function StarRating({ rating, size = "w-4 h-4" }: { rating: number; size?: string }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${star <= rating ? "fill-black text-black" : "fill-white text-white"}`}
        />
      ))}
    </div>
  )
}

function WriteReviewModal({ productId }: { productId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const reviewData = {
      productId,
      userName: formData.name,
      email: formData.email,
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }

    console.log("Review submitted:", reviewData)

    // Reset form and close modal
    setFormData({ name: "", email: "", rating: 5, comment: "" })
    setIsOpen(false)
  }

  const handleRatingClick = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full px-6">
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => handleRatingClick(star)} className="p-1">
                  <Star
                    className={`w-6 h-6 ${
                      star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
              placeholder="Share your experience with this product..."
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function ProductReviews({ productId }: ReviewsSectionProps) {
  // Filter reviews by productId and get only first 4
  const productReviews = mockReviews.filter((review) => review.productId === productId).slice(0, 4)

  const totalReviews = mockReviews.filter((review) => review.productId === productId).length
  const averageRating =
    productReviews.length > 0
      ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length
      : 0

  return (
    <div className="w-full  max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side - Ratings Overview and Write Review */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Ratings and Reviews</h2>

            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={Math.round(averageRating)} size="w-5 h-5" />
              <span className="text-lg font-medium text-gray-700">{totalReviews} Reviews</span>
            </div>

            <WriteReviewModal productId={productId} />
          </div>
        </div>

        {/* Right Side - Reviews List */}
        <div className="space-y-6 ">
          {productReviews.length > 0 ? (
            productReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-400 pb-6 ">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                    <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
                    <AvatarFallback>
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="mb-2 ">
                      <StarRating  rating={review.rating} />
                    </div>

                    <p className="text-gray-700 text-sm sm:text-base mb-3 leading-relaxed">{review.comment}</p>

                    <div className="text-sm text-gray-500">
                      <p className="font-medium text-gray-900">{review.userName}</p>
                      <p>{review.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No reviews yet for this product.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
