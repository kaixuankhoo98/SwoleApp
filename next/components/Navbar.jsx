import Link from 'next/link';

const Navbar = ({ loggedIn, onSignOut }) => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Home
        </Link>
        
        <div className="space-x-4">
          <Link href="/about" className="text-white">
            About
          </Link>
          <Link href="/contact" className="text-white">
            Contact
          </Link>
          {/* Add more navigation tabs as needed */}
        </div>

        {loggedIn ? (
          <button
            onClick={onSignOut}
            className="text-white hover:underline"
          >
            Sign Out
          </button>
        ) : (
          <Link href="/login" className="text-white hover:underline">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
