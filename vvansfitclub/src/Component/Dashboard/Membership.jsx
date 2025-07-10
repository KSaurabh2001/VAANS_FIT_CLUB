import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allMembership } from "../../Redux/GymOwner/Action";




const Membership = () => {

  //   const pricingPlans = [
  //   {
  //     name: "Basic",
  //     price: "$19",
  //     period: "/mo",
  //     features: [
  //       "Gym Floor Access",
  //       "1 Group Class/Week",
  //       "Locker Room Access",
  //       "Free Wi-Fi",
  //     ],
  //     gradient: "bg-gradient-to-br from-gray-800 to-gray-900",
  //   },
  //   {
  //     name: "Pro",
  //     price: "$39",
  //     period: "/mo",
  //     popular: true,
  //     features: [
  //       "All Basic Features",
  //       "5 Group Classes/Week",
  //       "Diet Consultation (Monthly)",
  //       "Free Gym Merchandise",
  //       "Priority Booking",
  //     ],
  //     gradient: "bg-gradient-to-br from-red-800 to-orange-700",
  //   },
  //   {
  //     name: "Elite",
  //     price: "$59",
  //     period: "/mo",
  //     features: [
  //       "All Pro Features",
  //       "Dedicated Personal Trainer",
  //       "Customized Workout Plan",
  //       "Weekly Diet Review",
  //       "InBody Composition Analysis",
  //     ],
  //     gradient: "bg-gradient-to-br from-orange-800 to-yellow-600",
  //   },
  //   {
  //     name: "Premium+",
  //     price: "$79",
  //     period: "/mo",
  //     features: [
  //       "All Elite Features",
  //       "Unlimited Personal Training",
  //       "Daily Nutrition Tracking",
  //       "1-on-1 Wellness Coach",
  //       "24/7 Gym Access",
  //       "Free Entry to All Events",
  //     ],
  //     gradient: "bg-gradient-to-br from-red-900 to-yellow-600",
  //   },
  // ];


  const dispatch = useDispatch();
  const pricingPlans = useSelector((store) => store.owner.AllMembership);
  const token = localStorage.getItem("token");
  const gradient = {
    "Basic": "bg-gradient-to-br from-gray-800 to-gray-900",
    "Premium+": "bg-gradient-to-br from-red-800 to-orange-700",
    "Elite": "bg-gradient-to-br from-orange-800 to-yellow-600",
    "Pro": "bg-gradient-to-br from-red-900 to-yellow-600"

  }

  useEffect(() => {
    dispatch(allMembership(token))
  }, [dispatch, token]);
  console.log(pricingPlans);
  return (
    <section
      id="pricing"
      className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-0.5 bg-red-500"></div>
            <span className="text-red-500 font-semibold tracking-wider">
              MEMBERSHIP
            </span>
            <div className="w-12 h-0.5 bg-red-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="block text-red-500">Membership Plan</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Flexible membership options designed to fit your lifestyle and
            fitness goals.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans?.map((plan, index) => (
       <div
  key={index}
  className={`rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 hover:ring-2 hover:ring-orange-400 ${
    gradient[plan.name] || "bg-gradient-to-br from-gray-800 to-gray-900"
  }`}
>
              {/* Title & Price */}
              <div className="text-center mb-6 space-y-2">
                {/* Plan Heading */}
                <h3 className="text-2xl font-extrabold tracking-wide text-white uppercase">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex justify-center items-baseline gap-1">
                  <span className="text-xl text-gray-300">₹</span>
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                </div>

                {/* Duration */}
                <p className="text-sm text-gray-400 font-medium tracking-wide">
                  Per {plan.duration || "month"}
                </p>
              </div>


              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-200">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Membership;