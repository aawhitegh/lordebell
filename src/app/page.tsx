// Updated React component with corrected Tailwind class interpolations
// and fixed template literal issues.

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Send, Volume2, User, Bot } from 'lucide-react';

export default function Home() {
  // --- existing state & logic unchanged ---
  const [continuousListening, setContinuousListening] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  // Placeholder handlers
  const startSpeechRecognition = () => {};
  const stopSpeechRecognition = () => {};
  const speakText = () => {};
  const startRecording = () => {};
  const stopRecording = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-start py-10 px-4 bg-gradient-to-b from-[#0a0f1f] via-[#1c1440] to-[#2b0f30]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 10%, rgba(255,215,0,0.35), transparent 70%), url('https://images.unsplash.com/photo-1536589961747-e239b2a304e2?auto=format&fit=crop&q=80&w=2000')",
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay',
        fontFamily: 'serif',
      }}
    >
      <div className="backdrop-blur-xl bg-white/5 border border-white/20 shadow-2xl rounded-3xl max-w-4xl w-full overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/20 bg-gradient-to-r from-[#3b1b4a]/60 via-[#8a5b1e]/40 to-[#143d3c]/60">
          <h1 className="text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400 drop-shadow-lg">
            LORDE BELL HOMILIES
          </h1>
          <p className="text-sm mt-2 text-yellow-200/80 italic tracking-wide">
            Ask Lorde Bell, Ecospiritualist Guide
          </p>

          {/* Controls */}
          <div className="mt-4 flex flex-wrap gap-4 items-center">
            <label
              className={`flex items-center gap-2 text-yellow-200 text-xs tracking-widest ${
                isSpeaking ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="uppercase">Continuous Listen</span>
              <button
                onClick={async () => {
                  if (isSpeaking) return;
                  const newValue = !continuousListening;
                  if (newValue) {
                    try {
                      await navigator.mediaDevices.getUserMedia({ audio: true });
                      setContinuousListening(true);
                      startSpeechRecognition();
                    } catch (error) {
                      alert('Please allow microphone access to use speech recognition');
                    }
                  } else {
                    setContinuousListening(false);
                    stopSpeechRecognition();
                    setInput('');
                  }
                }}
                disabled={isSpeaking}
                className={`px-4 py-1 text-xs rounded-full border border-yellow-300 shadow-sm backdrop-blur-sm transition ${
                  continuousListening
                    ? 'bg-yellow-300 text-black'
                    : 'bg-white/10 text-yellow-200 hover:bg-white/20'
                }`}
              >
                {continuousListening ? 'ON' : 'OFF'}
              </button>
            </label>

            {isListening && !isSpeaking && (
              <span className="text-xs text-yellow-200 border border-yellow-300 px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
                <Mic size={12} /> LISTENING
              </span>
            )}

            {isSpeaking && (
              <span className="text-xs bg-yellow-300 text-black px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
                <Volume2 size={12} /> SPEAKING
              </span>
            )}

            {continuousListening && !isListening && !isSpeaking && (
              <span className="text-xs text-yellow-200 px-3 py-1 rounded-full border border-yellow-300">
                PAUSED
              </span>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="h-[650px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-transparent to-black/20">
          {messages.slice(1).map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-yellow-300 bg-white/10 backdrop-blur-sm">
                  <Bot size={18} className="text-yellow-200" />
                </div>
              )}

              <div
                className={`max-w-[70%] fle
