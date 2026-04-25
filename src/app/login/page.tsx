'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { AnimatedCharactersLoginPage } from '@/components/ui/animated-characters-login-page';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, setUser, isLoading, setLoading, checkAuth } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  const handleEmailChange = (email: string) => {
    setFormData(prev => ({ ...prev, email }));
    if (error) setError('');
  };

  const handlePasswordChange = (password: string) => {
    setFormData(prev => ({ ...prev, password }));
    if (error) setError('');
  };

  const handleRememberMeChange = (rememberMe: boolean) => {
    setFormData(prev => ({ ...prev, rememberMe }));
  };

  useEffect(() => {
    // Only redirect if user is authenticated and store has finished initializing
    if (user) {
      router.push(redirectUrl);
      return;
    }

    // Try to recover session from cookie once on mount if not already checked
    if (!isLoading && !user) {
      checkAuth();
    }
  }, [user, router, redirectUrl]); // Removed checkAuth and isLoading to prevent loops

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.data?.user || data.user);
        setSuccess('Successfully logged in! Welcome back.');
        // Redirection will be handled by the useEffect once 'user' state is updated
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error('Login submission error:', err);
      setError('A connection error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedCharactersLoginPage 
      email={formData.email}
      setEmail={handleEmailChange}
      password={formData.password}
      setPassword={handlePasswordChange}
      error={error}
      success={success}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      rememberMe={formData.rememberMe}
      setRememberMe={handleRememberMeChange}
    />
  );
}
