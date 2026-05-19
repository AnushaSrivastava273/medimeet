"use client";
import { Button } from "@/components/ui/button";
import { Loader2, Mic, MicOff, User, Video, VideoOff, PhoneOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const VideoCall = ({ sessionId, token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const sessionRef = useRef(null);
  const publisherRef = useRef(null);
  const router = useRouter();

  const appId = process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID;
  const privateKey = process.env.VONAGE_PRIVATE_KEY;

  const handleScriptLoad = () => {
    setScriptLoaded(true);
    if (!window.OT) {
      toast.error("Failed to load Vonage Video API");
      setIsLoading(false);
      return;
    }
    initializeSession();
  };

  const initializeSession = () => {
    if (!appId || !sessionId || !token) {
      toast.error("Missing required video call parameters");
      router.push("/appointments");
      return;
    }
    try {
      sessionRef.current = window.OT.initSession(appId, sessionId);
      sessionRef.current.on("streamCreated", (event) => {
        sessionRef.current.subscribe(
          event.stream,
          "subscriber",
          {
            insertMode: "append",
            width: "100%",
            height: "100%",
          },
          (error) => {
            if (error) {
              toast.error("Error connecting to other participant's streams");
            }
          }
        );
      });
      sessionRef.current.on("sessionConnected", () => {
        setIsConnected(true);
        setIsLoading(false);
      });
      sessionRef.current.on("sessionDisconnected", () => {
        setIsConnected(false);
      });

      sessionRef.current.connect(token, (error) => {
        if (error) {
          toast.error("Failed to connect to video session");
          setIsLoading(false);
          return;
        }
        publisherRef.current = window.OT.initPublisher(
          "publisher",
          {
            insertMode: "append",
            width: "100%",
            height: "100%",
            publishAudio: isAudioEnabled,
            publishVideo: isVideoEnabled,
          },
          (error) => {
            if (error) {
              toast.error("Error connecting to your stream");
              setIsLoading(false);
              return;
            }
          }
        );
        if (publisherRef.current) {
          sessionRef.current.publish(publisherRef.current, (error) => {
            if (error) {
              toast.error("Error publishing stream");
            }
          });
        }
      });
    } catch (error) {
      toast.error("Error initializing video session");
      setIsLoading(false);
    }
  };

  const toggleVideo = () => {
    if (publisherRef.current) {
      publisherRef.current.publishVideo(!isVideoEnabled);
      setIsVideoEnabled((prev) => !prev);
    }
  };

  const toggleAudio = () => {
    if (publisherRef.current) {
      publisherRef.current.publishAudio(!isAudioEnabled);
      setIsAudioEnabled((prev) => !prev);
    }
  };

  const endCall = () => {
    if (publisherRef.current) {
      publisherRef.current.destroy();
      publisherRef.current = null;
    }
    if (sessionRef.current) {
      sessionRef.current.disconnect();
      sessionRef.current = null;
    }
    router.push("/appointments");
  };

  useEffect(() => {
    return () => {
      if (sessionRef.current) {
        sessionRef.current.disconnect();
        sessionRef.current = null;
      }
      if (publisherRef.current) {
        publisherRef.current.destroy();
        publisherRef.current = null;
      }
    };
  }, []);

  if (!sessionId || !token || !appId || !privateKey) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font text-white mb-4">Invalid Video Call</h1>
        <p className="text-muted-foreground mb-6">Missing required parameters for the video call.</p>
        <Button onClick={() => router.push("/appointments")} className="bg-emerald-600 hover:bg-emerald-700">
          Back to Appointments
        </Button>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://unpkg.com/@vonage/client-sdk-video@latest/dist/js/opentok.js"
        onLoad={handleScriptLoad}
        onError={() => {
          toast.error("Failed to load video call script");
          setIsLoading(false);
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Video Consultation</h1>
          <p className="text-muted-foreground">
            {isConnected ? "Connected" : isLoading ? "Connecting..." : "Connection failed"}
          </p>
        </div>
        {isLoading && !scriptLoaded ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-emerald-400 animate-spin mb-4" />
            <p className="text-white text-lg">Loading video call components...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-emerald-900/20 rounded-lg overflow-hidden">
                <div className="bg-emerald-900/10 px-3 py-2 text-emerald-400 text-sm font-medium">You</div>
                <div className="w-full h-[300px] md:h-[400px] bg-muted/30" id="publisher">
                  {!scriptLoaded && (
                    <div className="flex items-center justify-center h-full">
                      <div className="bg-muted/50 p-8 rounded-lg">
                        <User className="h-12 w-12 text-muted-foreground mb-3" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="border border-emerald-900/20 rounded-lg overflow-hidden">
                <div className="bg-emerald-900/10 px-3 py-2 text-emerald-400 text-sm font-medium">Doctor</div>
                <div id="subscriber" className="w-full h-[300px] md:h-[400px] bg-muted/30">
                  {(!isConnected || !scriptLoaded) && (
                    <div className="flex items-center justify-center h-full">
                      <div className="bg-muted/20 rounded-full p-8">
                        <User className="h-12 w-12 text-emerald-400" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Video call control buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                size="lg"
                onClick={toggleVideo}
                className={`rounded-full p-4 h-14 w-14 ${
                  isVideoEnabled
                    ? "border-emerald-900/30"
                    : "bg-red-900/20 border-red-900/30 text-red-400"
                }`}
                disabled={!publisherRef.current}
              >
                {isVideoEnabled ? <Video /> : <VideoOff />}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={toggleAudio}
                className={`rounded-full p-4 h-14 w-14 ${
                  isAudioEnabled
                    ? "border-emerald-900/30"
                    : "bg-red-900/20 border-red-900/30 text-red-400"
                }`}
                disabled={!publisherRef.current}
              >
                {isAudioEnabled ? <Mic /> : <MicOff />}
              </Button>
              <Button
                variant="destructive"
                size="lg"
                onClick={endCall}
                className="rounded-full p-4 h-14 w-14 bg-red-600 hover:bg-red-700"
              >
                <PhoneOff />
              </Button>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">
                {isVideoEnabled ? "Video is ON" : "Video is OFF"} | {isAudioEnabled ? "Audio is ON" : "Audio is OFF"}
              </p>
              <p>When you're finished with your consultation, click the red button to end the call.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoCall;