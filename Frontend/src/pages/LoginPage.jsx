import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import AnimatedBorder from "../components/AnimatedBorder.jsx";
import { Link } from "react-router";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  LoaderIcon,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-black">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <AnimatedBorder>
          <div className="w-full flex flex-col md:flex-row">
            {/* Left side of the form */}
            <div className="hidden md:flex md:w-1/2 items-center justify-center md:border border-white/10">
              <div className="max-w-md space-y-8 px-4 lg:px-0">
                <div>
                  <h3 className="text-4xl font-bold text-white mb-4 leading-tight">
                    Welcome Back to
                    <br />
                    ConvoPoint
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Continue your conversations where you left off. Your connections are waiting for you.
                  </p>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        Your Connections
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Pick up right where you left off with your ongoing conversations
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Always Available</h4>
                      <p className="text-gray-400 text-sm">
                        Access your messages anytime, anywhere with seamless sync
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        Stay Updated
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Never miss important messages with real-time notifications
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex gap-3">
                    <span className="auth-badge">Secure Login</span>
                    <span className="auth-badge">Multi-Device</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side of Form */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border border-white/10">
              <div className="w-full max-w-md">
                {/* Heading */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 mb-6">
                    <MessageCircleIcon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                    Welcome Back
                  </h2>
                  <p className="text-gray-400 text-md">
                    Sign in to continue to ConvoPoint
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                        placeholder="vincentchase@gmail.com"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                        placeholder="*****"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <LoaderIcon className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">
                    Don't have an account?{" "}
                    <span className="font-semibold">Sign up</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </AnimatedBorder>
      </div>
    </div>
  );
}

export default LoginPage;