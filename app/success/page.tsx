"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Component() {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const newPositions = Array.from({ length: 6 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 10,
    }));
    setPositions(newPositions);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5e6d3] flex items-center justify-center p-4">
      <motion.div
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Checkmark */}
        <motion.div
          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Check className="w-10 h-10 text-white stroke-[3]" />
          </motion.div>
        </motion.div>

        {/* Main Text */}
        <motion.h1
          className="text-2xl font-medium text-gray-800 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Your payment has been{" "}
          <motion.span
            className="text-green-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            received
          </motion.span>
          !
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-600 mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Please check your email for a payment confirmation & invoice.
        </motion.p>

        {/* Continue Shopping Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-md font-medium transition-all duration-200 group"
            asChild
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue Shopping
              <motion.div
                className="ml-2 inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </Button>
        </motion.div>

        {/* Floating particles animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {positions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-400 rounded-full opacity-60"
              initial={{
                x: pos.x,
                y: pos.y,
                scale: 0,
              }}
              animate={{
                y: -10,
                scale: [0, 1, 0],
                rotate: 360,
              }}
              transition={{
                duration: 3,
                delay: 1 + i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
