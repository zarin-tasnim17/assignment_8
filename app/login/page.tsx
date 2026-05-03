"use client";
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      router.push('/');
    } catch (error: unknown) {
      const e = error as Error;
      toast.error(e.message || "Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      router.push('/');
    } catch (error: unknown) {
      const e = error as Error;
      toast.error(e.message || "Google login failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md animate__animated animate__zoomIn">
      <h2 className="text-2xl font-bold mb-6 text-center">Login to QurbaniHat</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input 
          required 
          type="email" 
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded" 
        />
        <input 
          required 
          type="password" 
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded" 
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Login</button>
      </form>
      <div className="mt-4 text-center">
        <button onClick={handleGoogleLogin} type="button" className="w-full bg-red-500 text-white p-2 rounded mb-4">Login with Google</button>
        <p>Don&apos;t have an account? <Link href="/register" className="text-green-600 underline">Register</Link></p>
      </div>
    </div>
  );
}