import { Download, BookOpen, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const HomeUi = () => {
  const navigate = useNavigate();
  const handleButton = (): void => {
    navigate('/subjects');
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Geometric background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg rotate-45 opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl rotate-12 opacity-25 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg -rotate-12 opacity-20 animate-bounce animation-delay-4000"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        <div className="animate-fade-in">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white text-sm font-medium">
              An easy way to download files
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8">
            Your Digital
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Library
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-gray-300 font-normal">
              Awaits
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Discover thousands of books, download instantly, and read anywhere.
            Your next favorite story is just one click away.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button
              onClick={handleButton}
              size="lg"
              className="bg-gradient-to-r flex justify-between items-center from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold px-10 py-6 text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl border-0 group"
            >
              <Download className="w-6 h-6 mr-3" />
              Start Reading Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={handleButton}
              variant="outline"
              size="lg"
              className="border-2 flex justify-between items-center border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-10 py-6 text-lg rounded-2xl transition-all duration-300 backdrop-blur-sm"
            >
              <BookOpen className="w-6 h-6 mr-3" />
              Browse Collection
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-cyan-400 mb-2">50K+</div>
              <div className="text-gray-300">Books Available</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                Instant
              </div>
              <div className="text-gray-300">Downloads</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-pink-400 mb-2">
                All Genres
              </div>
              <div className="text-gray-300">Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeUi;
