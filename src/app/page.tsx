// Updated React component with Afrofuturistic High Priestess inspired styling
// Focus: Look & Feel only — layout, colors, typography, visual hierarchy
// Tailwind-based transformation: celestial gradients, gold accents, botanical motifs, mystical typography

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Send, Volume2, User, Bot } from 'lucide-react';

// ... (existing logic and handlers remain unchanged above the return)

export default function Home() {
  // --- existing state & logic unchanged ---

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
          <h1 className="text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gold-200 to-yellow-400 drop-shadow-lg">
            LORDE BELL HOMILIES
          </h1>
          <p className="text-sm mt-2 text-gold-200/80 italic tracking-wide">
            Ask Lorde Bell, Ecospiritualist Guide
          </p>

          {/* Controls */}
          <div className="mt-4 flex flex-wrap gap-4 items-center">
            <label className={`flex items-center gap-2 text-gold-200 text-xs tracking-widest ${isSpeaking ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                className={`px-4 py-1 text-xs rounded-full border border-gold-300 shadow-sm backdrop-blur-sm transition ${{}
                  continuousListening ? 'bg-gold-300 text-black' : 'bg-white/10 text-gold-200 hover:bg-white/20'
                }`}
              >
                {continuousListening ? 'ON' : 'OFF'}
              </button>
            </label>

            {isListening && !isSpeaking && (
              <span className="text-xs text-gold-200 border border-gold-300 px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
                <Mic size={12} /> LISTENING
              </span>
            )}

            {isSpeaking && (
              <span className="text-xs bg-gold-300 text-black px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
                <Volume2 size={12} /> SPEAKING
              </span>
            )}

            {continuousListening && !isListening && !isSpeaking && (
              <span className="text-xs text-gold-200 px-3 py-1 rounded-full border border-gold-300">
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
              className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gold-300 bg-white/10 backdrop-blur-sm">
                  <Bot size={18} className="text-gold-200" />
                </div>
              )}

              <div
                className={`max-w-[70%] flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-4 rounded-2xl shadow-md leading-relaxed text-sm tracking-wide backdrop-blur-xl border ${{}
                    message.role === 'user'
                      ? 'bg-gold-300/20 text-gold-100 border-gold-300'
                      : 'bg-white/10 text-gold-200 border-white/20'
                  }`}
                >
                  {message.content}
                </div>

                {message.role === 'assistant' && (
                  <button
                    onClick={() => speakText(message.content)}
                    className="mt-2 text-xs px-3 py-1 rounded-full border border-gold-300 text-gold-200 hover:bg-white/10 transition flex items-center gap-2"
                  >
                    <Volume2 size={12} /> PLAY
                  </button>
                )}

                {message.timestamp && (
                  <span className="text-[10px] text-gold-200/70 mt-1 tracking-widest">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                )}
              </div>

              {message.role === 'user' && (
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gold-300 bg-white/10 backdrop-blur-sm">
                  <User size={18} className="text-gold-200" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-6 border-t border-white/20 bg-black/30 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? '>>> LISTENING TO YOUR SPIRIT...' : 'Speak to the High Priestess...'}
              className={`flex-1 p-3 rounded-xl text-sm bg-white/10 text-gold-100 placeholder-gold-200/40 border border-white/20 focus:border-gold-300 focus:ring-2 focus:ring-gold-300/50 transition ${
                isListening ? 'italic tracking-widest' : ''
              }`}
              readOnly={isListening}
            />

            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              className={`p-3 rounded-xl border border-gold-300 text-gold-200 transition shadow-md ${
                isRecording ? 'bg-gold-300 text-black animate-pulse' : 'bg-white/10 hover:bg-white/20'
              }`}
              disabled={isLoading || continuousListening}
            >
              {isRecording ? <Square size={18} /> : <Mic size={18} />}
            </button>

            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-xl bg-gold-300 text-black border border-gold-400 shadow-lg hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
