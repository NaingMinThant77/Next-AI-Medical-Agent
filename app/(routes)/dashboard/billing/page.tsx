import { PricingTable } from "@clerk/nextjs";
import React from "react";
import { Crown, Zap, Shield, Star, Check } from "lucide-react";

const Billing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:bg-gradient-to-br darK:from-blue-900 dark:via-black dark:to-blue-800 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Crown className="w-4 h-4" />
            <span className="text-sm font-medium">Premium Features</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Unlock unlimited AI medical consultations and advanced health
            insights with our premium plans
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card/80 backdrop-blur-lg rounded-2xl p-6 border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Instant Access
            </h3>
            <p className="text-muted-foreground text-sm">
              Get immediate medical advice 24/7 without waiting
            </p>
          </div>
          <div className="bg-card/80 backdrop-blur-lg rounded-2xl p-6 border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Privacy First
            </h3>
            <p className="text-muted-foreground text-sm">
              Your health data is encrypted and secure
            </p>
          </div>
          <div className="bg-card/80 backdrop-blur-lg rounded-2xl p-6 border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Expert AI
            </h3>
            <p className="text-muted-foreground text-sm">
              Powered by advanced medical AI technology
            </p>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="bg-card/80 backdrop-blur-lg rounded-3xl shadow-xl border border-border p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Subscription Plans
            </h2>
            <p className="text-muted-foreground">
              Choose the plan that works best for you
            </p>
          </div>
          <PricingTable />
        </div>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Reasonable pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Flexible billing</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>Secure payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
