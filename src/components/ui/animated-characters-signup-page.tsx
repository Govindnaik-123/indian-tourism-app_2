"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({ 
  size = 12, 
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY
}: PupilProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };

    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;

    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  isSad?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({ 
  size = 48, 
  pupilSize = 16, 
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  isSad = false,
  forceLookX,
  forceLookY
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };

    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150 relative"
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: eyeColor,
        overflow: 'hidden',
      }}
    >
      {isSad && !isBlinking && (
        <div className="absolute top-0 left-0 w-full h-1/3 bg-current opacity-20 pointer-events-none" style={{ backgroundColor: pupilColor }} />
      )}
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
};

interface AnimatedSignupPageProps {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  success?: string;
  isLoading?: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleSuccess?: (token: string) => void;
}

export function AnimatedCharactersSignupPage({
  formData,
  handleChange,
  error = "",
  success = "",
  isLoading = false,
  onSubmit,
  onGoogleSuccess = (token) => {},
}: AnimatedSignupPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);
  
  const [isSad, setIsSad] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const controls = useAnimation();
  
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setIsGoogleLoading(true);
      onGoogleSuccess(tokenResponse.access_token);
    },
    onError: (error) => {
      console.error('Google Signup Failed', error);
      setIsGoogleLoading(false);
    }
  });

  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (error) {
      setIsSad(true);
      controls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5, ease: "easeInOut" }
      });
      const timer = setTimeout(() => setIsSad(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, controls]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking effects
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => {
          setIsPurpleBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;
    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => {
          setIsBlackBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());
      return blinkTimeout;
    };
    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Looking at each other animation when typing starts on normal fields
  useEffect(() => {
    if (isTyping && !isTypingPassword) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => {
        setIsLookingAtEachOther(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setIsLookingAtEachOther(false);
    }
  }, [isTyping, isTypingPassword]);

  // Purple sneaky peeking animation when typing any password field and it's visible
  const isAnyPasswordVisible = showPassword || showConfirmPassword;
  
  useEffect(() => {
    if (isTypingPassword && isAnyPasswordVisible) {
      const schedulePeek = () => {
        const peekInterval = setTimeout(() => {
          setIsPurplePeeking(true);
          setTimeout(() => {
            setIsPurplePeeking(false);
          }, 800);
        }, Math.random() * 3000 + 2000);
        return peekInterval;
      };
      const firstPeek = schedulePeek();
      return () => clearTimeout(firstPeek);
    } else {
      setIsPurplePeeking(false);
    }
  }, [isTypingPassword, isAnyPasswordVisible]);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));
    return { faceX, faceY, bodySkew };
  };

  const purplePos = calculatePosition(purpleRef);
  const blackPos = calculatePosition(blackRef);
  const yellowPos = calculatePosition(yellowRef);
  const orangePos = calculatePosition(orangeRef);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Content Section */}
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-12 text-white overflow-hidden uppercase tracking-tighter">
        <div className="relative z-20">
          <div className="flex items-center gap-2 text-lg font-black italic">
            <div className="size-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <span>TRIPS<span className="text-yellow-400">.</span></span>
          </div>
        </div>

        <div className="relative z-20 flex items-end justify-center h-[500px]">
          {/* Cartoon Characters */}
          <div className="relative" style={{ width: '550px', height: '400px' }}>
            {/* Purple tall rectangle character - Back layer */}
            <motion.div 
              ref={purpleRef}
              animate={controls}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '70px',
                width: '180px',
                height: (isTyping || (isTypingPassword && !isAnyPasswordVisible)) ? '440px' : '400px',
                backgroundColor: '#6C3FF5',
                borderRadius: '10px 10px 0 0',
                zIndex: 1,
                transform: (isTypingPassword && isAnyPasswordVisible)
                  ? `skewX(0deg)`
                  : (isTyping || (isTypingPassword && !isAnyPasswordVisible))
                    ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)` 
                    : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div 
                className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                style={{
                  left: (isTypingPassword && isAnyPasswordVisible) ? `${20}px` : isLookingAtEachOther ? `${55}px` : `${45 + purplePos.faceX}px`,
                  top: (isTypingPassword && isAnyPasswordVisible) ? `${35}px` : isLookingAtEachOther ? `${65}px` : `${40 + purplePos.faceY}px`,
                }}
              >
                <EyeBall 
                  size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D" 
                  isBlinking={isPurpleBlinking} isSad={isSad}
                  forceLookX={(isTypingPassword && isAnyPasswordVisible) ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                  forceLookY={(isTypingPassword && isAnyPasswordVisible) ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                />
                <EyeBall 
                  size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D" 
                  isBlinking={isPurpleBlinking} isSad={isSad}
                  forceLookX={(isTypingPassword && isAnyPasswordVisible) ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                  forceLookY={(isTypingPassword && isAnyPasswordVisible) ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                />
              </div>
            </motion.div>

            {/* Black tall rectangle character - Middle layer */}
            <motion.div 
              ref={blackRef}
              animate={controls}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '240px',
                width: '120px',
                height: '310px',
                backgroundColor: '#2D2D2D',
                borderRadius: '8px 8px 0 0',
                zIndex: 2,
                transform: (isTypingPassword && isAnyPasswordVisible)
                  ? `skewX(0deg)`
                  : isLookingAtEachOther
                    ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                    : (isTyping || (isTypingPassword && !isAnyPasswordVisible))
                      ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)` 
                      : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div 
                className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                style={{
                  left: (isTypingPassword && isAnyPasswordVisible) ? `${10}px` : isLookingAtEachOther ? `${32}px` : `${26 + blackPos.faceX}px`,
                  top: (isTypingPassword && isAnyPasswordVisible) ? `${28}px` : isLookingAtEachOther ? `${12}px` : `${32 + blackPos.faceY}px`,
                }}
              >
                <EyeBall 
                  size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D" 
                  isBlinking={isBlackBlinking} isSad={isSad}
                  forceLookX={(isTypingPassword && isAnyPasswordVisible) ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={(isTypingPassword && isAnyPasswordVisible) ? -4 : isLookingAtEachOther ? -4 : undefined}
                />
                <EyeBall 
                  size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D" 
                  isBlinking={isBlackBlinking} isSad={isSad}
                  forceLookX={(isTypingPassword && isAnyPasswordVisible) ? -4 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={(isTypingPassword && isAnyPasswordVisible) ? -4 : isLookingAtEachOther ? -4 : undefined}
                />
              </div>
            </motion.div>

            {/* Orange semi-circle character - Front left */}
            <motion.div 
              ref={orangeRef}
              animate={controls}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '0px',
                width: '240px',
                height: '200px',
                zIndex: 3,
                backgroundColor: '#FF9B6B',
                borderRadius: '120px 120px 0 0',
                transform: (isTypingPassword && isAnyPasswordVisible) ? `skewX(0deg)` : `skewX(${orangePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div 
                className="absolute flex gap-8 transition-all duration-200 ease-out"
                style={{
                  left: (isTypingPassword && isAnyPasswordVisible) ? `${50}px` : `${82 + (orangePos.faceX || 0)}px`,
                  top: (isTypingPassword && isAnyPasswordVisible) ? `${85}px` : `${90 + (orangePos.faceY || 0)}px`,
                }}
              >
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(isTypingPassword && isAnyPasswordVisible) ? -5 : undefined} forceLookY={(isTypingPassword && isAnyPasswordVisible) ? -4 : undefined} />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(isTypingPassword && isAnyPasswordVisible) ? -5 : undefined} forceLookY={(isTypingPassword && isAnyPasswordVisible) ? -4 : undefined} />
              </div>
            </motion.div>

            {/* Yellow tall rectangle character - Front right */}
            <motion.div 
              ref={yellowRef}
              animate={controls}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '310px',
                width: '140px',
                height: '230px',
                backgroundColor: '#E8D754',
                borderRadius: '70px 70px 0 0',
                zIndex: 4,
                transform: (isTypingPassword && isAnyPasswordVisible) ? `skewX(0deg)` : `skewX(${yellowPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div 
                className="absolute flex gap-6 transition-all duration-200 ease-out"
                style={{
                  left: (isTypingPassword && isAnyPasswordVisible) ? `${20}px` : `${52 + (yellowPos.faceX || 0)}px`,
                  top: (isTypingPassword && isAnyPasswordVisible) ? `${35}px` : `${40 + (yellowPos.faceY || 0)}px`,
                }}
              >
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(isTypingPassword && isAnyPasswordVisible) ? -5 : undefined} forceLookY={(isTypingPassword && isAnyPasswordVisible) ? -4 : undefined} />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" forceLookX={(isTypingPassword && isAnyPasswordVisible) ? -5 : undefined} forceLookY={(isTypingPassword && isAnyPasswordVisible) ? -4 : undefined} />
              </div>
              {/* Horizontal line for mouth */}
              <div 
                className="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full transition-all duration-500 ease-out"
                style={{
                  left: (isTypingPassword && isAnyPasswordVisible) ? `${10}px` : `${40 + (yellowPos.faceX || 0)}px`,
                  top: isSad ? `${100 + (yellowPos.faceY || 0)}px` : (isTypingPassword && isAnyPasswordVisible) ? `${88}px` : `${88 + (yellowPos.faceY || 0)}px`,
                  height: isSad ? '8px' : '4px',
                  borderRadius: isSad ? '50% 50% 10% 10%' : '2px',
                }}
              />
            </motion.div>
          </div>
        </div>

        <div className="relative z-20 flex items-center gap-8 text-sm font-bold text-white/60 lowercase">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-1/4 right-1/4 size-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Right Signup Section */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-[420px]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 text-lg font-black italic mb-12">
            <div className="size-8 rounded-lg bg-blue-600/10 flex items-center justify-center">
              <Sparkles className="size-4 text-blue-600" />
            </div>
            <span>TRIPS<span className="text-yellow-400">.</span></span>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase italic underline decoration-blue-500 underline-offset-8">Join Us 🇮🇳</h1>
            <p className="text-muted-foreground text-sm font-medium mt-4">Create an account to save your favorite spots.</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-black tracking-widest uppercase text-gray-400">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Anna Smith"
                value={formData.name}
                autoComplete="off"
                onChange={handleChange}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                required
                className="h-12 bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-black tracking-widest uppercase text-gray-400">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="anna@gmail.com"
                value={formData.email}
                autoComplete="off"
                onChange={handleChange}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                required
                className="h-12 bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-black tracking-widest uppercase text-gray-400">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setIsTypingPassword(true)}
                    onBlur={() => setIsTypingPassword(false)}
                    required
                    className="h-12 pr-10 bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-xs font-black tracking-widest uppercase text-gray-400">Confirm</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setIsTypingPassword(true)}
                    onBlur={() => setIsTypingPassword(false)}
                    required
                    className="h-12 pr-10 bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded-xl animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 text-xs font-bold text-green-600 bg-green-50 border border-green-100 rounded-xl animate-in fade-in slide-in-from-top-1">
                {success}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-sm font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all" 
              size="lg" 
              disabled={isLoading}
            >
              {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating...
                  </span>
                ) : "Sign Up Free"}
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="w-full h-12 bg-white border-gray-200 hover:bg-gray-50 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              type="button"
              onClick={() => handleGoogleLogin()}
              disabled={isLoading || isGoogleLoading}
            >
              {isGoogleLoading ? (
                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              ) : (
                <FcGoogle className="size-5" />
              )}
              {isGoogleLoading ? "Connecting..." : "Sign in with Google"}
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center text-sm text-muted-foreground mt-8 p-6 rounded-2xl bg-gray-50/50">
            Already a member?{" "}
            <a href="/login" className="text-blue-600 font-black hover:underline uppercase italic">
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
