import { Dumbbell ,Instagram,Facebook,Twitter} from "lucide-react";

const Footer=() => {
    return(
         <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">PulseFit</span>
              </div>
              <p className="text-gray-400 mb-4">
                Transform your body and mind with our premium fitness
                experience.
              </p>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter].map((Social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors duration-300"
                  >
                    <Social className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>123 Fitness Street</p>
                <p>Gym City, GC 12345</p>
                <p>+1 (555) 123-4567</p>
                <p>info@pulsefitstudio.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 VVANS Fit Club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
}

export default Footer;