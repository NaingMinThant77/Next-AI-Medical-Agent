/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DockerAgentCard";
import { Circle, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";

type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

type messages = {
  role: string;
  text: string;
};

const MedicalVoiceAgent = () => {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<Vapi | null>(null);
  const [currentRoll, setCurrentRoll] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState("");
  const [messages, setMessages] = useState<messages[]>([]);

  useEffect(() => {
    if (sessionId) GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
    console.log("Session Detail Data is : ", result.data);
    setSessionDetail(result.data);
  };

  const startCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);
    setVapiInstance(vapi);

    // Start voice conversation
    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);

    // Listen for events
    vapi.on("call-start", () => {
      console.log("Call started");
      setCallStarted(true);
    });
    vapi.on("call-end", () => {
      console.log("Call ended");
      setCallStarted(false);
    });
    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;
        console.log(`${message.role}: ${message.transcript}`);
        if (transcriptType === "partial") {
          setLiveTranscript(transcript);
          setCurrentRoll(role);
        } else if (transcriptType === "final") {
          setMessages((prevMessages) => [
            ...(prevMessages || []),
            { role, text: transcript },
          ]);
          setLiveTranscript("");
          setCurrentRoll(null);
        }
      }
    });
    vapiInstance?.on("speech-start", () => {
      console.log("Assistant started speaking");
      setCurrentRoll("assistant");
    });
    vapiInstance?.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setCurrentRoll("user");
    });
  };

  const endCall = () => {
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
  };

  return (
    <div className="p-5 border rounded-3xl bg-secondary">
      <div className="flex justify-between items-center">
        <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center">
          <Circle
            className={`w-4 h-4 ${callStarted ? "bg-green-500" : "bg-red-500"}`}
          />{" "}
          {callStarted ? "Connected..." : "Not Connected"}
        </h2>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>

      {sessionDetail && (
        <div className="flex items-center flex-col mt-10">
          <Image
            src={sessionDetail?.selectedDoctor?.image || ""}
            alt={sessionDetail?.selectedDoctor?.specialist || ""}
            width={120}
            height={120}
            className="h-[100px] w-[100px] object-cover rounded-full"
          />
          <h2 className="mt-2 text-lg">
            {sessionDetail?.selectedDoctor?.specialist}
          </h2>
          <p className="text-sm text-gray-400">AI Medical Voice Agent</p>

          <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
            {messages?.slice(-4).map((msg, index) => (
              <h2 key={index} className="text-gray-400 p-2">
                {msg.role}: {msg.text}
              </h2>
            ))}
            <h2 className="text-gray-400">Assistant Msg</h2>
            {liveTranscript && liveTranscript.length > 0 && (
              <h2 className="text-lg">
                {currentRoll} : {liveTranscript}
              </h2>
            )}
          </div>

          {callStarted ? (
            <Button
              variant={"destructive"}
              className="flex items-center gap-2"
              disabled={!callStarted}
              onClick={() => endCall()}
            >
              <PhoneOff className="h-5 w-5" /> End Call
            </Button>
          ) : (
            <Button
              className="flex items-center gap-2"
              disabled={callStarted}
              onClick={() => startCall()}
            >
              <PhoneCall className="h-5 w-5" /> Start Call
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MedicalVoiceAgent;
