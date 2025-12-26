import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  MessageCircle,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Github,
} from "lucide-react";

// Animated Border Component 
const AnimatedBorder = ({ children }) => {
  return (
    <div className="relative p-[2px] bg-gradient-to-r from-white/20 via-white/40 to-white/20 bg-[length:200%_100%] animate-[gradient_3s_ease_infinite] rounded-3xl">
      <div className="bg-black rounded-3xl overflow-hidden">{children}</div>
    </div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  const messages = [
    "Messages that arrive instantly",
    "Conversations that feel alive",
    "Chat without waiting",
    "Always in sync",
  ];

  // Typing animation effect
  useEffect(() => {
    const currentMessage = messages[messageIndex];
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= currentMessage.length) {
        setTypingText(currentMessage.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [messageIndex]);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .pulse-ring { animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 w-full bg-black/80 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              ConvoPoint
            </span>
          </div>
          <button
            onClick={() => navigate('/signup')}
            className="px-6 py-2.5 bg-white text-black rounded-xl font-semibold hover:bg-white/90 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            Launch App
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="relative max-w-5xl mx-auto">
          {/* Animated Dot */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute inset-0 w-3 h-3 bg-white rounded-full pulse-ring"></div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
              Chat in
              <br />
              <span className="inline-block animate-float">Real-Time</span>
            </h1>

            {/* Typing Animation */}
            <div className="h-12 flex items-center justify-center">
              <p className="text-2xl text-white/60 font-mono">
                {typingText}
                <span
                  className={`${
                    cursorVisible ? "opacity-100" : "opacity-0"
                  } transition-opacity`}
                >
                  |
                </span>
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <button
              onClick={() => navigate('/signup')}
              className="w-full sm:w-auto px-10 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-white/90 transition-all"
            >
              Start Chatting
            </button>
            <a
              href="https://github.com/varshapanda/ConvoPoint"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/20 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">Instant</div>
              <div className="text-white/50 text-sm">Delivery</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-4xl font-bold mb-1">Always</div>
              <div className="text-white/50 text-sm">Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">100%</div>
              <div className="text-white/50 text-sm">Private</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <AnimatedBorder>
          <div className="grid md:grid-cols-2 gap-px bg-white/5">
            {/* Feature 1 */}
            <div className="p-10 bg-black hover:bg-white/5 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No Waiting</h3>
              <p className="text-white/60 leading-relaxed">
                Your messages arrive the moment you hit send. No delays, no
                loading screens.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-10 bg-black hover:bg-white/5 transition-all group md:border-l border-white/5">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Your Privacy Matters</h3>
              <p className="text-white/60 leading-relaxed">
                Built with authentication that keeps your conversations private
                and secure.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-10 bg-black hover:bg-white/5 transition-all group md:border-t border-white/5">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Know Who's There</h3>
              <p className="text-white/60 leading-relaxed">
                See when friends are online and when they're typing a response.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-10 bg-black hover:bg-white/5 transition-all group md:border-t md:border-l border-white/5">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3">More Than Words</h3>
              <p className="text-white/60 leading-relaxed">
                Share images and media in your conversations without switching
                apps.
              </p>
            </div>
          </div>
        </AnimatedBorder>
      </div>

      {/* Final CTA */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <AnimatedBorder>
          <div className="p-16 text-center">
            <h2 className="text-5xl font-bold mb-6 tracking-tight">
              Start Talking
            </h2>
            <p className="text-xl text-white/60 mb-10">
              Join conversations that happen in real-time, not in delays
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="inline-block px-12 py-5 bg-white text-black rounded-xl font-bold text-lg hover:bg-white/90 transition-all"
            >
              Launch ConvoPoint
            </button>
          </div>
        </AnimatedBorder>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center text-white/50">
          <p>© 2024 ConvoPoint · Built by Varsha Panda</p>
        </div>
      </footer>
    </div>
  );
}