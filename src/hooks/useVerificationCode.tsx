import { resetCodeVerification } from '../api/AuthApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const useVerificationCode = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(900); // 5 minutes in seconds
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newCode.every((digit) => digit !== '') && value) {
      handleSubmit(newCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }

    setCode(newCode);

    if (pastedData.length === 6) {
      handleSubmit(newCode);
    } else if (pastedData.length > 0) {
      inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleSubmit = async (codeToVerify = code) => {
    const codeString = codeToVerify.join('');

    if (codeString.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      setError('Please enter the complete 6-digit code');
      return;
    }

    // Simulate API call
    try {
      const res = await resetCodeVerification(codeString);
      setIsLoading(false);
      if (res.status === 200) {
        navigate('/reset-password');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data.message);
        setError(err?.response?.data.message);
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }
    // Mock valid code
  };

  const handleResendCode = async () => {
    setIsResending(true);

    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(300); // Reset timer
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }, 2000);
  };

  return {
    handleResendCode,
    isLoading,
    isResending,
    formatTime,
    handleInputChange,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    timeLeft,
    code,
    error,
    inputRefs,
  };
};

export default useVerificationCode;
