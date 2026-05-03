export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">QurbaniHat</h3>
          <p className="text-gray-400">Your trusted modern livestock marketplace for Qurbani.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Info</h3>
          <p className="text-gray-400">Email: support@qurbanihat.com</p>
          <p className="text-gray-400">Phone: +880 1234 567890</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Social Links</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-green-400">Facebook</a>
            <a href="#" className="hover:text-green-400">Twitter</a>
            <a href="#" className="hover:text-green-400">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}