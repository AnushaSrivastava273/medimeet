"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TriageChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      content:
        "Hi! I'm your MediMeet health assistant. Describe your symptoms and I'll help you find the right doctor. 😊",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const [recommendedSpecialty, setRecommendedSpecialty] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Listen for open event from banner
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-triage-chat", handleOpen);
    return () => window.removeEventListener("open-triage-chat", handleOpen);
  }, []);

  // Demo sequence runner (interactive)
  const handleDemoSequence = (userMsg) => {
    // Add user message to chat immediately
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInputValue("");
    setIsTyping(true);

    if (step === 0) {
      setStep(1);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content:
              "I'm sorry to hear that. How long have you been experiencing this chest pain? And does it radiate to your arm or jaw?",
          },
        ]);
      }, 2500);
    } else if (step === 1) {
      setStep(2);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content:
              "Got it. Are you also experiencing shortness of breath or dizziness along with the pain?",
          },
        ]);
      }, 2500);
    } else if (step === 2) {
      setStep(3);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content:
              "Based on your symptoms, I recommend booking a Cardiology specialist right away. These symptoms need prompt attention.",
          },
        ]);
        setRecommendedSpecialty("Cardiology");
      }, 2500);
    } else {
      setIsTyping(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleDemoSequence(inputValue);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="w-[380px] h-[450px] mb-4 flex flex-col shadow-2xl border-emerald-900/20 overflow-hidden bg-background">
          {/* Header */}
          <div className="bg-emerald-800 text-white p-4 flex justify-between items-center">
            <div className="font-semibold flex items-center gap-2">
              <span>🩺</span> AI Triage Assistant
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-emerald-700 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-muted text-foreground"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground max-w-[80%] rounded-lg px-3 py-2 text-sm flex items-center gap-1 h-9">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}

            {recommendedSpecialty && (
              <div className="flex justify-center pt-2">
                <Link href={`/doctors/${recommendedSpecialty}`}>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 w-full animate-in fade-in slide-in-from-bottom-2">
                    Book a {recommendedSpecialty} Appointment &rarr;
                  </Button>
                </Link>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-muted/30">
            <form onSubmit={handleSend} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your symptoms..."
                className="flex-1"
                disabled={isTyping || !!recommendedSpecialty}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isTyping || !!recommendedSpecialty}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full shadow-lg bg-emerald-600 hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center text-2xl"
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : "🩺"}
      </Button>
    </div>
  );
}
