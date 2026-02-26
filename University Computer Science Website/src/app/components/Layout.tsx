import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import campusBackground from 'figma:asset/aa35fdae5d39aef96d1ba77e86c445c1cc5e4dc4.png';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.03] dark:opacity-[0.02]"
        style={{ backgroundImage: `url(${campusBackground})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}