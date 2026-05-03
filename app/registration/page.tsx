"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

export default function Register() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      await updateProfile(userCredential.user, {
        displayName: formData.name,
        photoURL: formData.photoUrl
      });
      
      toast.success("Registration Successful!");
      router.push("/login");
    } catch (error: unknown) {
      const e = error as Error;
      toast.error(e.message || "Registration failed. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google");
      router.push("/");
    } catch (error: unknown) {
      const e = error as Error;
      toast.error(e.message || "Google login failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create an Account</h1>
      
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-80">
        <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Name" autoComplete="off" className="border p-2" required />
        <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" autoComplete="off" className="border p-2" required />
        <input name="photoUrl" value={formData.photoUrl} onChange={handleChange} type="url" placeholder="Photo URL" autoComplete="off" className="border p-2" required />
        <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" autoComplete="new-password" className="border p-2" required />
        
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Register
        </button>
      </form>

      <button onClick={handleGoogleLogin} type="button" className="mt-4 border p-2 w-80 rounded flex items-center justify-center gap-2">
        Login with Google
      </button>

      <p className="mt-4 text-sm">
        Already have an account? <Link href="/login" className="text-blue-600">Login here</Link>
      </p>
    </div>
  );
}