import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import AnimatedBorder from "../components/AnimatedBorder.jsx";
import { MessageCircleIcon, LoaderIcon, CheckCircle, XCircle } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

function VerifyEmailPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { setAuthUser, connectSocket } = useAuthStore();
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const hasVerified = useRef(false); // Prevent duplicate requests

  useEffect(() => {
    const verifyEmail = async () => {
      // Prevent multiple verification attempts
      if (hasVerified.current) return;
      hasVerified.current = true;

      try {
        const res = await axiosInstance.get(`/auth/verify-email/${token}`);
        
        if (res.data.success && res.data.user) {
          // Set the authenticated user in the store
          setAuthUser(res.data.user);
          
          // Connect socket for real-time features
          connectSocket();
          
          // Update status to success
          setVerificationStatus("success");
          toast.success("Email verified successfully!");
          
          // Redirect to chat page after 2 seconds
          setTimeout(() => {
            navigate("/chat", { replace: true });
          }, 2000);
        }
      } catch (error) {
        setVerificationStatus("error");
        const errorMsg = error?.response?.data?.message || "Failed to verify email";
        toast.error(errorMsg);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate, setAuthUser, connectSocket]);

  return (
    <div className="w-full flex items-center justify-center p-4 bg-black">
      <div className="relative w-full max-w-2xl">
        <AnimatedBorder>
          <div className="w-full p-8 md:p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 mb-6">
                <MessageCircleIcon className="w-10 h-10 text-white" />
              </div>

              {verificationStatus === "verifying" && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Verifying Your Email
                  </h2>
                  <p className="text-gray-400 text-lg mb-8">
                    Please wait while we verify your email address...
                  </p>
                  <LoaderIcon className="w-12 h-12 animate-spin mx-auto text-white" />
                </div>
              )}

              {verificationStatus === "success" && (
                <div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Email Verified Successfully!
                  </h2>
                  <p className="text-gray-400 text-lg mb-4">
                    Your email has been verified. You can now access all features of ConvoPoint.
                  </p>
                  <p className="text-gray-500 text-sm">
                    Redirecting you to the chat page...
                  </p>
                </div>
              )}

              {verificationStatus === "error" && (
                <div>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 border border-red-500/50 mb-6">
                    <XCircle className="w-10 h-10 text-red-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Verification Failed
                  </h2>
                  <p className="text-gray-400 text-lg mb-8">
                    We couldn't verify your email. The link may have expired or has already been used.
                  </p>
                  <button
                    onClick={() => navigate("/login", { replace: true })}
                    className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Go to Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </AnimatedBorder>
      </div>
    </div>
  );
}

export default VerifyEmailPage;