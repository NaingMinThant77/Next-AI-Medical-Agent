/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { doctorAgent } from "./DocterAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

type prop = {
  title?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  preselectedDoctor?: doctorAgent | null;
};

const AddNewSessionDialog = ({
  title,
  isOpen,
  onOpenChange,
  preselectedDoctor,
}: prop) => {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();

  const router = useRouter();

  const { has } = useAuth();
  const paidUser = has?.({ plan: "pro" });

  useEffect(() => {
    if (preselectedDoctor) {
      setSelectedDoctor(preselectedDoctor);
      setSuggestedDoctors([preselectedDoctor]);
    }
  }, [preselectedDoctor]);

  const OnClickNext = async () => {
    if (!note.trim()) {
      toast.error("Please describe your symptoms");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post("/api/suggest-doctors", { notes: note });
      console.log("API Response:", result.data);

      if (Array.isArray(result.data) && result.data.length > 0) {
        setSuggestedDoctors(result.data);
      } else {
        setSuggestedDoctors([]);
        toast.error("No doctors found. Please try different symptoms.");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setSuggestedDoctors([]);
      toast.error("Failed to get doctor recommendations");
    }
    setLoading(false);
  };

  const OnStartConsultation = async () => {
    // Check if selected doctor is premium
    if (selectedDoctor?.subscriptionRequired && !paidUser) {
      toast.error("This doctor is premium and service not available");
      return;
    }

    setLoading(true);
    const result = await axios.post("/api/session-chat", {
      notes: note,
      selectedDoctor: selectedDoctor,
    });
    console.log(result.data);
    if (result.data.sessionId) {
      console.log(result.data.sessionId);
      router.push(`/dashboard/medical-agent/${result.data.sessionId}`);
    }

    setLoading(false);
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when dialog closes
      setSuggestedDoctors(undefined);
      setSelectedDoctor(undefined);
      setNote("");

      if (onOpenChange) {
        onOpenChange(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {!isOpen && (
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full px-6 py-3 shadow-lg transition-all duration-300 hover:shadow-xl">
            {title ?? "+ Start Consultation"}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="bg-background/95 backdrop-blur-xl border border-border max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {suggestedDoctors
              ? "Choose Your AI Doctor"
              : "Start New Consultation"}
          </DialogTitle>
          <DialogDescription asChild>
            {!suggestedDoctors ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Describe your symptoms or health concerns to get AI doctor
                  recommendations
                </p>
                <div className="relative">
                  <Textarea
                    placeholder="I'm experiencing headaches and fatigue..."
                    className="h-40 border-2 border-border rounded-2xl p-4 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                    {note.length}/500
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground mb-4">
                  Based on your symptoms, here are most suitable AI doctors:
                </p>
                <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto p-2">
                  {Array.isArray(suggestedDoctors) &&
                  suggestedDoctors.length > 0 ? (
                    suggestedDoctors.map((doctor, index) => (
                      <SuggestedDoctorCard
                        key={index}
                        doctorAgent={doctor}
                        setSelectedDoctor={setSelectedDoctor}
                        //@ts-ignore
                        selectedDoctor={selectedDoctor}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8">
                      <div className="bg-muted rounded-2xl p-6">
                        <p className="text-muted-foreground mb-2">
                          No doctors available
                        </p>
                        <p className="text-sm text-muted-foreground/70">
                          Please try again with different symptoms
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-muted/50 rounded-b-2xl p-6">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-full px-6">
              Cancel
            </Button>
          </DialogClose>
          {!suggestedDoctors ? (
            <Button
              disabled={!note.trim() || loading}
              onClick={() => OnClickNext()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full px-6 transition-all duration-300"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Finding Doctors...
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button
              disabled={loading || !selectedDoctor}
              onClick={() => OnStartConsultation()}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-full px-6 transition-all duration-300"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  Start Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewSessionDialog;
