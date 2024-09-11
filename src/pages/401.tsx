import Link from 'next/link'; // VER VIDEO NA INTERNET DE COMO FAZER PAGINA DE ERRO CUSTOMIZADA EM NEXTJS

export default function Custom401() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-blue-700">401</h1>
      <p className="text-xl text-gray-600 mt-4">Unauthorized - Access Denied</p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Go Back to Home
      </Link>
    </div>
  );
}
