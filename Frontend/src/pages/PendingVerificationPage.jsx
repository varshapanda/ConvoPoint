import { useState } from "react";
import AnimatedBorder from "../components/AnimatedBorder.jsx";
import { MessageCircleIcon, LoaderIcon, Mail, RefreshCw } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useLocation } from "react-router";

function PendingVerificationPage() {
  const location = useLocation();
  const email = location.state?.email || "";
  const [isResending, setIsResending] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error("Email not found. Please sign up again.");
      return;
    }

    setIsResending(true);
    try {
      const res = await axiosInstance.post("/auth/resend-verification", { email });
      toast.success(res.data.message || "Verification email sent!");
      
      // Disable resend button for 60 seconds
      setResendDisabled(true);
      setCountdown(60);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "Failed to resend verification email";
      toast.error(errorMsg);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4 bg-black">
      <div className="relative w-full max-w-2xl">
        <AnimatedBorder>
          <div className="w-full p-8 md:p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 mb-6">
                <MessageCircleIcon className="w-10 h-10 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">
                Verify Your Email
              </h2>
              
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/50 mb-6">
                <Mail className="w-10 h-10 text-blue-500" />
              </div>

              <p className="text-gray-400 text-lg mb-4">
                We've sent a verification email to:
              </p>
              
              <p className="text-white font-semibold text-xl mb-8">
                {email}
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8 text-left">
                <h3 className="text-white font-semibold mb-3">Next Steps:</h3>
                <ol className="text-gray-400 space-y-2 list-decimal list-inside">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the verification link in the email</li>
                  <li>You'll be automatically redirected to ConvoPoint</li>
                </ol>
              </div>

              <p className="text-gray-500 text-sm mb-6">
                Didn't receive the email?
              </p>

              <button
                onClick={handleResendEmail}
                disabled={isResending || resendDisabled}
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {isResending ? (
                  <>
                    <LoaderIcon className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : resendDisabled ? (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Resend in {countdown}s
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Resend Verification Email
                  </>
                )}
              </button>

              <p className="text-gray-500 text-xs mt-8">
                The verification link will expire in 24 hours.
              </p>
            </div>
          </div>
        </AnimatedBorder>
      </div>
    </div>
  );
}

export default PendingVerificationPage;