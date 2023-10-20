import Link from 'next/link';

const Navbar = ({ loggedIn, onSignOut }) => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <img src="/favicon.ico" alt="Logo" className="logo-image rounded-image" />
        </Link>
        
        <div className="space-x-4">
          <Link href="/about" className="text-white">
            About
          </Link>
          <Link href="/contact" className="text-white">
            Contact
          </Link>
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
