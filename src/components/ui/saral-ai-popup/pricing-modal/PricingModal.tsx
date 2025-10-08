import { CommonModal } from "../common-modal/CommonModal";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsPaymentOpen: (isOpen: boolean) => void;
  setSelectedPlan:  any;
}

type Plan = {
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  credits: number;
  profiles: number;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Lorem",
    price: 0,
    credits: 450,
    profiles: 450,
    features: [
      "Lorem Ipsum is simply",
      "Lorem Ipsum is simply",
      "Reachout Score (Fit / Not Fit indicator)",
    ],
  },
  {
    name: "Standard",
    price: 2249,
    oldPrice: 3000,
    discount: 25,
    credits: 450,
    profiles: 450,
    features: [
      "All Free features",
      "Unlimited saved search history",
      "Filters on saved searches",
      "Reachout Score (Fit / Not Fit indicator)",
      "HeadScore AI match via natural language prompts",
      "Flexible credit allocation (5 or 10 per prompt)",
    ],
    popular: true,
  },
  {
    name: "Pro",
    price: 5499,
    credits: 1000,
    profiles: 1000,
    features: [
      "All Standard features",
      "Dedicated support (2-hour SLA)",
      "AI-generated LinkedIn message templates",
      "Priority profile delivery",
      "Early access to upcoming AI features",
    ],
  },
];

export function PricingModal({ isOpen, onClose, setIsPaymentOpen, setSelectedPlan }: PricingModalProps) {

  const handlePlanClick = (plan: Plan) => {
    setIsPaymentOpen(true);
    setSelectedPlan(plan);
    onClose();
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} size="full">
      {/* Header */}
      <div className="text-center pt-2 sm:pt-4 pb-2 sm:pb-4 mb-2 sm:mb-4 px-2 sm:px-4">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#3F1562] mb-1 sm:mb-2">
          Upgrade Your Plan
        </h2>
        <p className="text-[royalPurple]/50 text-xs sm:text-sm md:text-base">
          Choose the perfect plan for your recruiting needs
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 font-manrope sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg3:gap-6 px-2 sm:px-3 md:px-4 lg:px-6 pb-3 sm:pb-4 md:pb-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`
              relative h-[100%] xl:w-[95%] xl:p-6 rounded-lg md:rounded-xl p-3 sm:p-4 lg:p-5 transition-all min-h-[350px] sm:min-h-[400px]
              ${
                plan.popular
                  ? "bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-[#3F1562]/50 shadow-lg sm:scale-105"
                  : "bg-white border border-gray-200 hover:shadow-lg"
              }
            `}
          >
            {/* Most Popular Badge */}
            <div className="custom-card h-[85%] sm:h-[90%] flex items-center flex-col justify-between">

              {/* Price */}
              <div className="mb-2 flex flex-col items-start w-full sm:mb-3 mt-1 sm:mt-2">
              {plan.popular && (
                <div className="my-auto ml-12 mb-4 left-1/2 transform -translate-x-1/2">
                  <span className="custom-most-popular whitespace-nowrap bg-[#3F1562] text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold 2xl:text-[9px]">
                    MOST POPULAR
                  </span>
                </div>
              )}
                <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-[#3F1562] 2xl:text-[29px]">
                  ₹{plan.price}{" "}
                  <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-normal text-[royalPurple]/40">
                    /month
                  </span>
                </div>
                {plan.oldPrice && plan.discount && (
                  <div className="flex items-center gap-1 sm:gap-2 mt-1">
                    <span className="text-[royalPurple]/40 line-through text-xs sm:text-sm">
                      ₹{plan.oldPrice}
                    </span>
                    <span className="bg-[#3D1562] rounded-2xl text-white px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-semibold">
                      {plan.discount}%
                    </span>
                  </div>
                )}
              </div>

              {/* Title & Credits */}
              <div className="flex flex-col items-start w-full pl-2 my-4">
                <h3 className="custom-plan-name text-sm 2xl:text-[20px] sm:text-base xl:text-3xl md:text-lg lg:text-xl font-bold text-[#3F1562] mb-0.5 sm:mb-1">
                  {plan.name}
                </h3>
                <p className="text-[#3D1562]/50 mb-3 xl:text-[20px] font-semibold sm:mb-4 text-[10px] sm:text-xs md:text-sm 2xl:text-[13px] credits-text">
                  {plan.credits} credits → {plan.profiles} profiles
                </p>
              </div>

              {/* Features */}
              <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 flex-1">
                {plan.features.map((feature: any) => (
                  <div key={feature} className="flex items-start">
                    <span className="mr-1.5 sm:mr-2 mt-1 flex-shrink-0 text-sm">
                      <svg
                        width="11"
                        height="8"
                        viewBox="0 0 13 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="sm:w-[13px] sm:h-[10px]"
                      >
                        <path
                          d="M11.9391 1.43858L5.96981 9.64444C5.82745 9.83578 5.61517 9.96115 5.38066 9.99238C5.14616 1.0236 4.9091 9.95808 4.72276 9.81052L0.460123 6.35821C0.0839729 6.05328 0.023065 5.4972 0.324082 5.11616C0.625098 4.73512 1.17405 4.67342 1.5502 4.97835L5.10472 7.8591L10.5351 0.393523C10.7131 0.122841 11.0236 -0.0268124 11.3433 0.00397824C11.663 0.0347689 11.9401 0.241022 12.0646 0.540849C12.1891 0.840676 12.1409 1.18556 11.9391 1.43858Z"
                          fill="#C55A83"
                        />
                      </svg>
                    </span>
                    <span className="text-[#3D1562] font-semibold text-[10px] sm:text-xs md:text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="h-[15%] sm:h-[10%] flex items-end">
              <button onClick={() => handlePlanClick(plan)} className={`w-full px-4 sm:px-6 py-2 sm:py-2 outline-none rounded-lg font-medium text-xs sm:text-sm  border-[2px] border-[#3d156236] transition duration-300 ease-in-out ${plan.popular ? 'bg-[#3F1562] text-[#ffffff]' : 'text-[#3F1562]'}`}>
                Choose plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </CommonModal>
  );
}

