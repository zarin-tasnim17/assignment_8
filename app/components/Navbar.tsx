"use client";
import { useAuth } from "../context/AuthContext"; 
import Link from "next/link";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b">
      <div className="text-2xl font-bold text-green-700">QurbaniHat</div>
      
      <div className="flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/animals">All Animals</Link>

        {user ? (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => logout()} 
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Logout
            </button>
            <Link href="/my-profile" className="w-10 h-10 rounded-full border overflow-hidden block cursor-pointer">
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || user.email || 'User'}&background=random`} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link 
              href="/login" 
              className="px-4 py-2 border border-green-600 text-green-600 rounded-md"
            >
              Login
            </Link>
            <Link 
              href="/registration" 
              className="px-4 py-2 bg-green-700 text-white rounded-md"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}