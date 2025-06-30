"use client";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
let currentOTPIndex = 0;
const OtpForm = () => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(-1);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [resendOtp] = useResendOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const userData = JSON.parse(localStorage.getItem("regData") || "{}");

  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);

    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);

    setOtp(newOTP);
  };

  const handleKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      setActiveOTPIndex(currentOTPIndex - 1);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  useEffect(() => {
    setLoading(true);
    const otpCreationDate = new Date(userData?.created_at);
    const otpExpiryDate = new Date(otpCreationDate.getTime() + 2 * 60000);

    const startCountdown = (expiryDate: Date) => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        const timeLeft = expiryDate.getTime() - new Date().getTime();
        setRemainingTime(Math.max(timeLeft, 0));
        if (timeLeft <= 0 && intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }, 1000);
    };

    startCountdown(otpExpiryDate);

    setLoading(false);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleResend = async () => {
    setLoading(true);
    try {
      const res = await resendOtp({ mobile: userData.mobile }).unwrap();
      if (res.data) {
        const updatedData = { ...userData, created_at: new Date() };
        localStorage.setItem("regData", JSON.stringify(updatedData));
        setError("");
        const newExpiryDate = new Date(
          updatedData.created_at.getTime() + 2 * 60000,
        );
        setRemainingTime(newExpiryDate.getTime() - new Date().getTime());

        const startCountdown = (expiryDate: Date) => {
          if (intervalRef.current) clearInterval(intervalRef.current);
          intervalRef.current = setInterval(() => {
            const timeLeft = expiryDate.getTime() - new Date().getTime();
            setRemainingTime(Math.max(timeLeft, 0));
            if (timeLeft <= 0 && intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }, 1000);
        };

        startCountdown(newExpiryDate);

        toast.success(res?.message || "OTP sent successfully!!");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error("Failed to resend OTP");
      setError("Failed to resend OTP");
    
    }
  };

  const formatTime = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValue = otp.join("");
    try {
      setLoading(true);
      const res = await verifyOtp({
        mobile: userData.mobile,
        otp: otpValue,
      }).unwrap();
      if (res.data) {
        router.push(`/auth/login`);
        toast.success(res?.message || "OTP verified successfully!!");
        setLoading(false);
      }
    } catch (err) {
     
      setError("Invalid OTP");
      setLoading(false);
    }
  };
  if (loading) return <div>Loading...</div>;

  return (
    <div className="mx-auto w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="otp-area">
          <div className="mt-8 text-center">
            {otp.map((data, index) => (
              <span key={index}>
                {index === 0 && (
                  <>
                    <label className="otp-label text-black">Enter OTP:</label>{" "}
                    <br />
                  </>
                )}
                <input
                  ref={index === activeOTPIndex ? inputRef : null}
                  key={index}
                  className="otp-input text-black"
                  type="number"
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  value={otp[index]}
                />
              </span>
            ))}
          </div>
          <div className="f mt-8 flex justify-center font-medium text-black">
            Didn’t receive OTP?
            <span className="font-semibold text-sky-400">
              {remainingTime > 0 && (
                <span className="px-1">
                  Resend available in {formatTime(remainingTime)}
                </span>
              )}
              {remainingTime !== -1 && remainingTime === 0 && (
                <span
                  onClick={handleResend}
                  className="cursor-pointer px-1 font-semibold text-blue-600"
                >
                  {"  "} Resend{"  "}
                </span>
              )}
            </span>
          </div>
          <small className="mt-2 block text-center text-sm text-red">
            {error}
          </small>
          <div className="mt-4">
            <button
              type="submit"
              disabled={otp.some((data) => data === "")}
              className="btn w-full max-w-md rounded border-0 bg-sky-800 text-base font-medium text-white hover:bg-sky-900"
            >
              Submit OTP
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OtpForm;
