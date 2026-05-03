"use client";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { updateProfile } from 'firebase/auth';

export default function UpdateProfile() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    } else if (user) {
      // eslint-disable-next-line
      setName(user.displayName || '');
      // eslint-disable-next-line
      setPhotoUrl(user.photoURL || '');
    }
  }, [user, loading, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoUrl
      });
      toast.success("Profile updated successfully!");
      router.push('/my-profile');
    } catch (error: unknown) {
      const e = error as Error;
      toast.error(e.message || "Failed to update profile.");
    }
  };

  if (loading || !user) {
    return <div className="text-center py-20 animate-pulse">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Information</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Update Name" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm mb-1">Image URL</label>
          <input required type="url" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="Update Photo URL" className="w-full border p-2 rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Update Information</button>
      </form>
    </div>
  );
}