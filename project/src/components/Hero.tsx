import { Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Share Food, <span className="text-lime-600">Share Hope</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join us in the mission to eliminate hunger and reduce food waste. Your donation can make a difference.
            </p>
            <div className="flex gap-4">
              <a href="/donate" className="btn-primary">
                <Heart className="w-5 h-5" />
                Donate Now
              </a>
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Volunteers distributing food"
                className="w-full h-auto"
              />
            </div>
            <div className="stat-card absolute bottom-4 left-4">
              <p className="text-2xl font-bold text-lime-700">5,000+</p>
              <p className="text-gray-600">Meals Donated</p>
            </div>
            <div className="stat-card absolute top-4 right-4">
              <p className="text-2xl font-bold text-lime-700">200+</p>
              <p className="text-gray-600">Volunteers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}