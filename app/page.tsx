/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import { motion } from "motion/react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

function HomePageContent() {
  const { user, isLoaded } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-purple-50">
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
            <h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold text-foreground md:text-5xl lg:text-7xl mb-6">
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
              className="relative z-10 mx-auto max-w-2xl py-4 text-center text-lg font-normal text-muted-foreground leading-relaxed"
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
              <Link href="/">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full px-8 py-3 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
                  Get Started
                </Button>
              </Link>
              {isLoaded && user && (
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="rounded-full px-8 py-3 border-2 border-border hover:border-primary transition-all duration-300"
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
            <div className="bg-card/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-border p-8">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Experience the Future of Healthcare
                </h3>
                <p className="text-muted-foreground">
                  AI-powered medical consultations at your fingertips
                </p>
              </div>
              <div className="w-full overflow-hidden rounded-2xl border border-border shadow-inner">
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
  const { isLoaded } = useUser();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="bg-card/80 backdrop-blur-lg border-b border-border px-6 py-4 sticky top-0 z-50 shadow-sm">
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

        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-foreground" />
              )}
            </button>
          )}
          {isLoaded ? (
            <>
              <SignedOut>
                <Link href="/sign-in">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full px-6 py-2 shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
                    Login
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center gap-3">
                  <UserButton />
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full px-6 py-2 shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                </div>
              </SignedIn>
            </>
          ) : (
            <div className="w-20 h-9 animate-pulse bg-muted rounded-full" />
          )}
        </div>
      </div>
    </nav>
  );
};

// Error boundary component to catch Clerk errors
class ClerkErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Check if it's a Clerk-related error
    if (
      error.message.includes("Clerk") ||
      error.message.includes("failed_to_load_clerk")
    ) {
      return { hasError: true };
    }
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log Clerk errors to console, don't show them to user
    if (
      error.message.includes("Clerk") ||
      error.message.includes("failed_to_load_clerk")
    ) {
      console.warn("Clerk loading error handled gracefully:", error.message);
    } else {
      console.error("Non-Clerk error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when Clerk fails to load - show basic login/signup
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-purple-50">
          <div className="bg-card/80 backdrop-blur-lg border-b border-border px-6 py-4 sticky top-0 z-50 shadow-sm">
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
              <Link href="/sign-in">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full px-6 py-2 shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
                  Login
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative flex max-w-full flex-col items-center justify-center px-4 py-10 md:py-20">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-3xl" />
              <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 opacity-10 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="relative z-10 mx-auto max-w-4xl text-center text-3xl font-bold text-foreground md:text-5xl lg:text-7xl mb-6">
                  {"🩺Revolutionize Patient Care with AI Voice Agent"
                    .split(" ")
                    .map((word, index) => (
                      <span
                        key={index}
                        className="mr-2 inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                      >
                        {word}
                      </span>
                    ))}
                </h1>
                <p className="relative z-10 mx-auto max-w-2xl py-4 text-center text-lg font-normal text-muted-foreground leading-relaxed">
                  Deliver instant, accurate medical assistance through natural
                  voice conversation. Automate appointment scheduling, symptoms
                  tracking, and follow-up care—24/7.
                </p>
                <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link href="/sign-in">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full px-8 py-3 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function Home() {
  return (
    <ClerkErrorBoundary>
      <HomePageContent />
    </ClerkErrorBoundary>
  );
}
