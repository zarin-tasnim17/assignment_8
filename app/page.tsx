"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Animal {
  id: string | number;
  name: string;
  image: string;
  breed: string;
  price: number;
}

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    fetch("/data/animal.json")
      .then((res) => res.json())
      .then((data) => {
        const sanitizedData = data.map((animal: Animal) => ({
          ...animal,
          image: animal.image.startsWith('/') ? animal.image : `/${animal.image}`
        }));
        setAnimals(sanitizedData);
      })
      .catch((err) => console.error("Error loading animals:", err));
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <section className="relative bg-gray-100 py-20 border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Find Your Perfect Qurbani Animal
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse trusted local sellers and book with confidence. We ensure healthy and quality livestock for your needs.
          </p>
          <Link 
            href="/animals" 
            className="bg-green-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            Browse Animals
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white flex-grow">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Animals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {animals.slice(0, 4).map((animal) => (
              <Link href={`/details-page/${animal.id}`} key={animal.id} className="block border rounded-xl p-4 shadow hover:shadow-md transition-shadow cursor-pointer">
                 <img 
                    src={animal.image} 
                    alt={animal.name} 
                    className="w-full h-48 object-cover rounded-lg mb-4" 
                 />
                 <h3 className="text-xl font-bold text-gray-800">{animal.name}</h3>
                 <p className="text-gray-500 text-sm mb-2">{animal.breed}</p>
                 <p className="text-green-600 font-bold text-lg">৳{animal.price}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/animals" className="text-blue-600 hover:underline font-medium">
              View All Animals page to see full list.
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Top Breeds for Qurbani</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h3 className="text-xl font-bold text-green-700">Deshi Cow</h3>
              <p className="text-sm text-gray-600 mt-2">Perfect for family sacrifice with natural grazing.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h3 className="text-xl font-bold text-green-700">Sahiwal</h3>
              <p className="text-sm text-gray-600 mt-2">High meat yield and very healthy structure.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h3 className="text-xl font-bold text-green-700">Black Bengal</h3>
              <p className="text-sm text-gray-600 mt-2">Premium quality meat goat.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h3 className="text-xl font-bold text-green-700">Brahman</h3>
              <p className="text-sm text-gray-600 mt-2">Giant and majestic bulls for large gatherings.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Important Qurbani Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-4">
              <div className="text-4xl mb-4 animate__animated animate__pulse animate__infinite">🐄</div>
              <h4 className="text-xl font-bold mb-2">Age Requirements</h4>
              <p className="text-green-100">Cows & Buffaloes must be at least 2 years old. Goats & Sheep must be at least 1 year old.</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-4">🩺</div>
              <h4 className="text-xl font-bold mb-2">Physical Health</h4>
              <p className="text-green-100">Ensure the animal has no physical defects, is not blind, and can walk properly.</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-4">🦷</div>
              <h4 className="text-xl font-bold mb-2">Check the Teeth</h4>
              <p className="text-green-100">Examine the teeth to properly verify the exact age and maturity of the animal.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Why Choose QurbaniHat?</h2>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="w-64 p-6 bg-white rounded-xl shadow-sm border">
              <h4 className="text-lg font-bold mb-2 text-green-600">✅ Verified Sellers</h4>
              <p className="text-gray-500 text-sm">We strictly verify all farmers and sellers on our platform.</p>
            </div>
            <div className="w-64 p-6 bg-white rounded-xl shadow-sm border">
              <h4 className="text-lg font-bold mb-2 text-green-600">🏥 Vet Inspected</h4>
              <p className="text-gray-500 text-sm">All our animals pass basic health and Qurbani eligibility checks.</p>
            </div>
            <div className="w-64 p-6 bg-white rounded-xl shadow-sm border">
              <h4 className="text-lg font-bold mb-2 text-green-600">🚚 Hassle-free Delivery</h4>
              <p className="text-gray-500 text-sm">Get your animal delivered directly to your doorstep safely.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}