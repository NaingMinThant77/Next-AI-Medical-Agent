/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DockerAgentCard";
import {
  Circle,
  PhoneCall,
  PhoneOff,
  Loader2,
  Mic,
  MicOff,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
  createdBy: string;
};

type messages = {
  role: string;
  text: string;
};

const MedicalVoiceAgent = () => {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);
  const [currentRoll, setCurrentRoll] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState("");
  const [messages, setMessages] = useState<messages[]>([]);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (sessionId) GetSessionDetails();
  }, [sessionId]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStarted) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callStarted]);

  const GetSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log("Session Detail Data is : ", result.data);
    setSessionDetail(result.data);
  };

  const startCall = () => {
    if (!sessionDetail?.selectedDoctor) {
      console.error("No selected doctor found in session detail");
      return;
    }

    if (!process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY) {
      console.error("VAPI public key is not set");
      return;
    }

    setLoading(true);
    console.log("VAPI Public Key:", process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    setVapiInstance(vapi);

    const VapiAgentConfig = {
      name: "AI Medical Doctor Voice Agent",
      firstMessage:
        "Hi there! I am AI Medical Doctor Voice Agent. How may I help you today?",
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              sessionDetail.selectedDoctor.agentPrompt ||
              "You are a helpful medical assistant.",
          },
        ],
      },
    };

    console.log("Starting Vapi call with config:", VapiAgentConfig);

    // Start voice conversation
    //@ts-ignore
    vapi.start(VapiAgentConfig);

    // Listen for events
    vapi.on("call-start", () => {
      console.log("Call started");
      setCallStarted(true);
      setLoading(false);
    });
    vapi.on("call-end", () => {
      console.log("Call ended");
      setCallStarted(false);
      setLoading(false);
      setIsSpeaking(false);
    });
    vapi.on("error", (error) => {
      console.error("Vapi error:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      setLoading(false);
    });
    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;
        console.log(`${message.role}: ${message.transcript}`);
        if (transcriptType === "partial") {
          setLiveTranscript(transcript);
          setCurrentRoll(role);
          if (role === "assistant") {
            setIsSpeaking(true);
          }
        } else if (transcriptType === "final") {
          setMessages((prevMessages) => [
            ...(prevMessages || []),
            { role, text: transcript },
          ]);
          setLiveTranscript("");
          setCurrentRoll(null);
          if (role === "assistant") {
            setIsSpeaking(false);
          }
        }
      }
    });
    vapi.on("speech-start", () => {
      console.log("Assistant started speaking");
      setCurrentRoll("assistant");
      setIsSpeaking(true);
    });
    vapi.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setCurrentRoll("user");
      setIsSpeaking(false);
    });
  };

  const endCall = async () => {
    setLoading(true);
    if (!vapiInstance) return;
    // Stop the call
    vapiInstance?.end();

    // Optionally, remove listeners (good for memory management)
    vapiInstance.off("call-start", () => {});
    vapiInstance.off("call-end", () => {});
    vapiInstance.off("message", () => {});

    // Reset call state
    setCallStarted(false);
    setVapiInstance(null);

    const result = await GenerateReport();
    console.log("Generated Report is : ", result);
    toast.success("Your report has been generated successfully.");
    setLoading(false);

    router.replace(`/dashboard`);
  };

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const GenerateReport = async () => {
    const result = await axios.post("/api/medical-report/", {
      messages: messages,
      sessionDetail: sessionDetail,
      sessionId: sessionId,
    });

    return result.data;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-card/80 backdrop-blur-lg rounded-3xl shadow-xl border border-border p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`relative ${callStarted ? "animate-pulse" : ""}`}>
                <Circle
                  className={`w-5 h-5 ${
                    callStarted
                      ? "bg-green-500 text-green-500"
                      : "bg-red-500 text-red-500"
                  } fill="currentColor`}
                />
                {callStarted && (
                  <Circle className="absolute inset-0 w-5 h-5 bg-green-500/20 animate-ping rounded-full" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {callStarted ? "Connected" : "Not Connected"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {callStarted
                    ? "Live consultation in progress"
                    : "Ready to start consultation"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground font-mono">
                {formatTime(callDuration)}
              </div>
              <p className="text-xs text-muted-foreground">Call Duration</p>
            </div>
          </div>
        </div>

        {sessionDetail && (
          <div className="bg-card/80 backdrop-blur-lg rounded-3xl shadow-xl border border-border p-8">
            {/* Doctor Profile */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-50 ${
                    isSpeaking ? "animate-pulse" : ""
                  }`}
                />
                <Image
                  src={sessionDetail?.selectedDoctor?.image || ""}
                  alt={sessionDetail?.selectedDoctor?.specialist || ""}
                  width={120}
                  height={120}
                  className="relative h-32 w-32 object-cover rounded-full border-4 border-background shadow-2xl"
                />
                {callStarted && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg">
                    <Volume2 className="h-4 w-4 animate-pulse text-primary-foreground" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Dr. {sessionDetail?.selectedDoctor?.specialist}
              </h2>
              <p className="text-muted-foreground mb-4">
                AI Medical Voice Assistant
              </p>

              {/* Status Indicators */}
              <div className="flex justify-center gap-4 mb-6">
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    callStarted
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Circle className="w-2 h-2 fill-current" />
                  {callStarted ? "Live" : "Offline"}
                </div>
                {isSpeaking && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    <Mic className="w-3 h-3" />
                    Speaking
                  </div>
                )}
              </div>
            </div>

            {/* Conversation Area */}
            <div className="bg-muted/50 rounded-2xl p-6 mb-6 min-h-[300px] max-h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {messages?.slice(-4).map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-card text-foreground rounded-bl-sm shadow-sm border border-border"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}

                {/* Live Transcript */}
                {liveTranscript && liveTranscript.length > 0 && (
                  <div
                    className={`flex ${currentRoll === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        currentRoll === "user"
                          ? "bg-primary/30 text-primary rounded-br-sm border border-primary/20"
                          : "bg-muted text-muted-foreground rounded-bl-sm animate-pulse"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {currentRoll === "assistant" && (
                          <Volume2 className="w-4 h-4 animate-pulse" />
                        )}
                        <p className="text-sm">{liveTranscript}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-4">
              {callStarted ? (
                <>
                  {/* Mute Button */}
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full h-14 w-14 p-0"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? (
                      <MicOff className="h-5 w-5" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </Button>

                  {/* End Call Button */}
                  <Button
                    variant="destructive"
                    size="lg"
                    className="rounded-full h-16 px-8 bg-red-500 hover:bg-red-600 shadow-lg"
                    onClick={() => endCall()}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Disconnecting...
                      </>
                    ) : (
                      <>
                        <PhoneOff className="h-6 w-6 mr-2" /> End Call
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <Button
                  size="lg"
                  className="rounded-full h-16 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg text-white font-semibold disabled:opacity-50"
                  disabled={loading || !sessionDetail?.selectedDoctor}
                  onClick={() => startCall()}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <PhoneCall className="h-6 w-6 mr-2" />
                      Start Call
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalVoiceAgent;
