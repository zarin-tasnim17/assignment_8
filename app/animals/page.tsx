"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

interface Animal {
  id: string | number;
  name: string;
  image: string;
  breed: string;
  price: number;
}

export default function Animals() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setLoading(true);
        
        const response = await fetch("/data/animal.json", { 
          cache: 'no-store',
          headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          const sanitizedData = data.map((animal: Animal) => {
            const imagePath = animal.image || "";
            return {
              ...animal,
              image: imagePath.startsWith('/') ? imagePath : `/${imagePath}`
            };
          });
          setAnimals(sanitizedData);
        }
      } catch (err) {
        console.error("Animal data fetch error:", err);
        if (isMounted) toast.error("Could not load animal data. Please refresh.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, []);

  const sortedAnimals = useMemo(() => {
    return [...animals].sort((a, b) => 
      sortOrder === "asc" ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price)
    );
  }, [animals, sortOrder]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold animate-pulse">Loading Animal Data...</h1>
        <p className="text-gray-500">If this persists, check the browser console.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-green-700">Available Animals</h1>
        <select 
          className="border p-2 rounded shadow-sm"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sortedAnimals.length > 0 ? (
          sortedAnimals.map((animal) => (
            <div key={animal.id} className="border rounded-xl shadow-lg overflow-hidden bg-white">
              <div className="relative h-56 w-full">
                <Image 
                  src={animal.image} 
                  alt={animal.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h2 className="text-xl font-bold">{animal.name}</h2>
                <p className="text-gray-600">Breed: {animal.breed}</p>
                <p className="text-green-600 font-extrabold text-xl mt-2">৳ {animal.price}</p>
                <Link href={`/details-page/${animal.id}`} className="mt-4 block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-xl text-gray-500">No animals found in the database.</p>
          </div>
        )}
      </div>
    </div>
  );
}