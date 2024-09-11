import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Go Back to Home
      </Link>
    </div>
  );
}
