import { Play } from "lucide-react";

const Hero=() => {
    return(
         <section id="home" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-0.5 bg-red-500"></div>
              <span className="text-red-500 font-semibold tracking-wider">
                TRANSFORM YOUR BODY
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Unleash Your
              <span className="block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Inner Strength
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Join VVANS Fit Club and discover a fitness experience that goes
              beyond the ordinary. Our expert trainers and cutting-edge
              equipment will help you achieve your goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* <button className="group bg-gradient-to-r from-red-500 to-orange-500 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 flex items-center justify-center">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button> */}
              <button className="group border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Video
              </button>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-20 right-6 hidden lg:block">
          <div className="space-y-4">
            {[
              { number: "500+", label: "Members" },
              { number: "15+", label: "Classes" },
              { number: "8", label: "Trainers" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center border border-white/20"
              >
                <div className="text-2xl font-bold text-red-500">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}

export default Hero;