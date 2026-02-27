import { useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { Home } from 'lucide-react';

export function RouteErrorPage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? error.statusText || error.data?.message || 'Something went wrong'
    : error instanceof Error
      ? error.message
      : 'An unexpected error occurred';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1C2D] via-[#7B1E3A] to-[#0B1C2D] text-white relative overflow-hidden pt-20">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />
      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">
          Something went wrong
        </h1>
        <p className="text-lg text-white/90 max-w-md mx-auto mb-8">
          {message}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#7B1E3A] rounded-xl font-semibold hover:bg-[#C8A951] hover:text-white transition-all duration-300 shadow-2xl"
        >
          <Home className="w-5 h-5" />
          Go back home
        </Link>
      </div>
    </div>
  );
}
