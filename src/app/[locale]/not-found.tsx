import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-white px-4 text-center">
      <div className="relative mb-8 h-48 w-48 opacity-80">
        <Image
          src="/robot4.png"
          alt="EiryBot Confused"
          fill
          className="object-contain drop-shadow-md grayscale-[30%]"
        />
      </div>
      <h1 className="text-6xl font-extrabold text-violet-900 tracking-tight">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-gray-800">Página no encontrada</h2>
      <p className="mt-2 text-gray-600 max-w-md">
        Lo sentimos, no pudimos encontrar la página que estás buscando. Es posible que haya sido movida o eliminada.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-violet-700 px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-violet-600 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-violet-300"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
