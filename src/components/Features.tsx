import { Zap, Shield, Smartphone, Cloud, BookOpen, Heart } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description:
        'Download your favorite books in seconds with our optimized CDN network.',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description:
        'All downloads are encrypted and virus-scanned for complete peace of mind.',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: Smartphone,
      title: 'Any Device',
      description:
        'Read seamlessly across all your devices with automatic sync.',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Cloud,
      title: 'Cloud Storage',
      description:
        'Your personal library is safely backed up in the cloud forever.',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: BookOpen,
      title: 'Vast Collection',
      description: 'Explore over 50,000 books across every genre imaginable.',
      color: 'from-indigo-400 to-purple-500',
    },
    {
      icon: Heart,
      title: 'Personalized',
      description:
        'Get custom recommendations based on your reading preferences.',
      color: 'from-rose-400 to-pink-500',
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-cyan-500/20">
            <span className="text-cyan-400 text-sm font-medium">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Built for
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {' '}
              Modern{' '}
            </span>
            Readers
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience reading like never before with our cutting-edge platform
            designed for the digital age
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
