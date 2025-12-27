import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import AnimatedBorder from "../components/AnimatedBorder.jsx";
import { Link, useNavigate } from "react-router";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
  MessageSquare,
  Zap,
  Shield,
} from "lucide-react";

function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningup } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(formData);
    if (result?.success) {
      navigate("/pending-verification", { state: { email: formData.email } });
    }
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
                    Welcome to
                    <br />
                    ConvoPoint
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Experience real-time communication at its finest. Connect,
                    chat, and collaborate seamlessly with our modern messaging
                    platform.
                  </p>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        Real-Time Messaging
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Instant message delivery with typing indicators and
                        online status
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Fast</h4>
                      <p className="text-gray-400 text-sm">
                        Built with cutting-edge technology for seamless
                        performance
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        Secure & Private
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Your conversations are protected with end-to-end
                        security
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex gap-3">
                    <span className="auth-badge">Free Forever</span>
                    <span className="auth-badge">No Credit Card</span>
                    <span className="auth-badge">Instant Setup</span>
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
                    Create Account
                  </h2>
                  <p className="text-gray-400 text-md">
                    Join ConvoPoint and start connecting
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="input"
                        placeholder="Vincent Chase"
                      />
                    </div>
                  </div>

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
                    disabled={isSigningup}
                  >
                    {isSigningup ? (
                      <LoaderIcon className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/login" className="auth-link">
                    Already have an account?{" "}
                    <span className="font-semibold">Login</span>
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

export default SignupPage;
