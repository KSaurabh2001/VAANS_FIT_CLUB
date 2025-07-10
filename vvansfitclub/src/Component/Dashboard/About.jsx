import {
  Menu,
  X,
  Play,
  Star,
  Clock,
  Users,
  Dumbbell,
  Heart,
  Zap,
  ArrowRight,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
const About=() =>{
    return(<section
        id="about"
        className="py-20 px-6 bg-gradient-to-b from-black to-gray-900"
      >
        <div className=" inset-0 z-0 max-w-7xl mx-auto">
          


          
          <div className=" grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-12 h-0.5 bg-red-500"></div>
                <span className="text-red-500 font-semibold tracking-wider">
                  ABOUT US
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Where Fitness Meets
                <span className="block text-red-500">Excellence</span>
              </h2>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                At PulseFit Studio, we believe fitness is more than just
                exercise—it's a lifestyle. Our state-of-the-art facility
                combines cutting-edge equipment with expert guidance to create
                an environment where you can push your limits and achieve
                extraordinary results.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  {
                    icon: Heart,
                    title: "Health Focus",
                    desc: "Holistic approach to wellness",
                  },
                  {
                    icon: Users,
                    title: "Community",
                    desc: "Supportive fitness family",
                  },
                  {
                    icon: Zap,
                    title: "Results",
                    desc: "Proven transformation methods",
                  },
                  {
                    icon: Star,
                    title: "Excellence",
                    desc: "Premium fitness experience",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="bg-gradient-to-r from-red-500 to-orange-500 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300">
                Learn More
              </button>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Gym Equipment"
                  className="rounded-lg object-cover h-64"
                />
                <img
                  src="https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Personal Training"
                  className="rounded-lg object-cover h-64 mt-8"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-red-500 to-orange-500 p-6 rounded-lg">
                <div className="text-2xl font-bold">5+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>)
  
}

export default About;