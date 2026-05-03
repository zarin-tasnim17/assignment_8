import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <h2 className="text-5xl font-bold text-red-500 mb-4 animate__animated animate__shakeX">404 - Not Found</h2>
      <p className="text-xl mb-6">Could not find the requested animal or page.</p>
      <Link href="/" className="bg-green-600 text-white px-6 py-2 rounded">
        Return Home
      </Link>
    </div>
  )
}