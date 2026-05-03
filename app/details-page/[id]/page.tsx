"use client";
import { useEffect, useState, use } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function DetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [animal, setAnimal] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    fetch('/data/animal.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((a: any) => a.id.toString() === resolvedParams.id); // eslint-disable-line @typescript-eslint/no-explicit-any
        if (found && found.image) {
          found.image = found.image.startsWith('/') ? found.image : `/${found.image}`;
        }
        setAnimal(found);
      })
      .catch(err => {
        console.error("Error fetching animal details:", err);
      });
  }, [resolvedParams.id]);

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to book an animal.");
      return;
    }
    toast.success("Booking placed successfully!");
    e.currentTarget.reset();
  };

  if (loading || !user) {
    return <div className="text-center py-20 animate-pulse">Checking authentication...</div>;
  }

  if (!animal) return <div className="text-center py-20">Loading details...</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-2 gap-10 animate__animated animate__fadeIn">
      <div>
        <img src={animal.image} alt={animal.name} className="w-full h-auto object-cover rounded-lg shadow-md mb-6" />
        <h1 className="text-4xl font-bold mb-4">{animal.name}</h1>
        <p className="text-2xl text-green-600 font-bold mb-4">৳ {animal.price}</p>
        <div className="bg-white p-6 rounded shadow-sm">
          <p><strong>Type:</strong> {animal.type}</p>
          <p><strong>Breed:</strong> {animal.breed}</p>
          <p><strong>Weight:</strong> {animal.weight} kg</p>
          <p><strong>Age:</strong> {animal.age} years</p>
          <p><strong>Location:</strong> {animal.location}</p>
          <p className="mt-4 text-gray-700">{animal.description}</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md h-fit">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Place Booking</h2>
        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input required type="text" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input required type="email" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input required type="tel" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea required className="w-full border rounded p-2" rows={3}></textarea>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded font-bold hover:bg-green-700">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}