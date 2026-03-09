/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <div className="relative flex max-w-full flex-col items-center justify-center px-4 py-10 md:py-20">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 opacity-10 blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold text-gray-900 md:text-5xl lg:text-7xl mb-6">
              {"🩺Revolutionize Patient Care with AI Voice Agent"
                .split(" ")
                .map((word, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                    className="mr-2 inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    {word}
                  </motion.span>
                ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="relative z-10 mx-auto max-w-2xl py-4 text-center text-lg font-normal text-gray-600 leading-relaxed"
            >
              Deliver instant, accurate medical assistance through natural voice
              conversation. Automate appointment scheduling, symptoms tracking,
              and follow-up care—24/7.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1 }}
              className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link href="/sign-in">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full px-8 py-3 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
                  Get Started
                </Button>
              </Link>
              {user && (
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-3 border-2 border-gray-300 hover:border-blue-500 transition-all duration-300"
                  >
                    View Dashboard
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="relative z-10 mt-16"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Experience the Future of Healthcare
                </h3>
                <p className="text-gray-600">
                  AI-powered medical consultations at your fingertips
                </p>
              </div>
              <div className="w-full overflow-hidden rounded-2xl border border-gray-200 shadow-inner">
                <img
                  src="MediVoiceAI.jpeg"
                  alt="Landing page preview"
                  className="aspect-[16/9] h-auto w-full object-cover"
                  height={1000}
                  width={1000}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();
  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-white/20 px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg" />
            <div className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-50 blur-md" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MediVoice AI
          </h1>
        </div>

        {!user ? (
          <Link href="/sign-in">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full px-6 py-2 shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
              Login
            </Button>
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <UserButton />
            <Button
              asChild
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full px-6 py-2 shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
