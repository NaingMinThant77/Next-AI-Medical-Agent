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
import { useState } from "react";
import { doctorAgent } from "./DockerAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";

const AddNewSessionDialog = () => {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();

  const router = useRouter();

  const OnClickNext = async () => {
    setLoading(true);
    const result = await axios.post("/api/suggest-doctors", { notes: note });
    console.log(result.data);
    setSuggestedDoctors(result.data);
    setLoading(false);
  };

  const OnStartConsultation = async () => {
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
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3">+ Start a Consultation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {suggestedDoctors ? "AI Suggested Doctors" : "Add Basic Details"}
          </DialogTitle>
          <DialogDescription asChild>
            {!suggestedDoctors ? (
              <div>
                <h2>Add Symthoms or Any Other Details</h2>
                <Textarea
                  placeholder="Add Detail here..."
                  className="mt-3 h-40"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <h2 className="mb-3 text-bold text-lg">Select a Doctor</h2>
                <div className="grid grid-cols-2 gap-2">
                  {Array.isArray(suggestedDoctors) &&
                  suggestedDoctors.length > 0 ? (
                    suggestedDoctors.map((doctor, index) => (
                      <SuggestedDoctorCard
                        key={index}
                        doctorAgent={doctor}
                        setSelectedDoctor={setSelectedDoctor}
                        // @ts-ignore
                        selectedDoctor={selectedDoctor}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 text-center text-gray-500 py-4">
                      No doctors available. Please try again with different
                      symptoms.
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          {!suggestedDoctors ? (
            <Button disabled={!note || loading} onClick={() => OnClickNext()}>
              Next{" "}
              {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </Button>
          ) : (
            <Button
              disabled={loading || !selectedDoctor}
              onClick={() => OnStartConsultation()}
            >
              Start Consultation
              {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewSessionDialog;
