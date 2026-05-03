"use client";
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MyProfile() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="text-center py-20 animate-pulse">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-md text-center animate__animated animate__fadeIn">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <img src={user.photoURL || "https://via.placeholder.com/150"} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-green-500" />
      <h2 className="text-2xl font-semibold">{user.displayName || "User"}</h2>
      <p className="text-gray-600 mb-8">{user.email}</p>
      
      <Link href="/update-profile" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
        Update Information
      </Link>
    </div>
  );
}