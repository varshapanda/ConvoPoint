import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import {Toaster} from "react-hot-toast";
import LandingPage from "./pages/LandingPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import PendingVerificationPage from "./pages/PendingVerificationPage";

export default function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if(isCheckingAuth) return <PageLoader/>
  return (
    <div className="min-h-screen bg-black relative flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-white opacity-10 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-white opacity-10 blur-[100px]" />

      <Routes>
        <Route path="/" element={authUser ? <Navigate to="/chat" /> : <LandingPage/>} />
        <Route path="/chat" element={authUser? <ChatPage /> : <Navigate to={"/signup"}/>}/>
        <Route path="/login" element={!authUser? <LoginPage />: <Navigate to={"/"}/>}/>
        <Route path="/signup" element={!authUser? <SignupPage />: <Navigate to={"/"}/>} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/pending-verification" element={<PendingVerificationPage />} />
      </Routes>
      <Toaster/>
    </div>
  );
}
