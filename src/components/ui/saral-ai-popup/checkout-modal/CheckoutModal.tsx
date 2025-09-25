import { CommonModal } from "../common-modal/CommonModal";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const planItems = [
    {
      title: "Standard Plan (1 Month)",
      description: "• 450 Credits → Access 450 Profiles",
      price: "₹3,000",
    },
    {
      title: "Plan Discount (13%)",
      price: "-₹750.99",
    },
    {
      title: "Sub Total",
      price: "₹2,249",
    },
    {
      title: "GST (18%)",
      price: "₹404.82",
    },
    {
      title: (
        <>
          Total{" "}
          <span className="text-sm font-normal text-[#231D4F]/60">
            (Inc Tax)
          </span>
        </>
      ),
      price: "₹2,653",
      highlight: true,
    },
  ];

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} size="md">
      <div className="flex font-manrope items-center mb-6">
        <button
          onClick={onClose}
          className="mr-3 text-gray-600 hover:text-gray-800"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-[#3F1562]">Checkout</h2>
      </div>

      <div className="bg-gradient-to-r from-[#3F1562]/3 to-[#DF6789]/5 p-4 rounded-2xl border-[2px] border-[#3d156236]">
        <div className="bg-transparent rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-[#231D4F] mb-4">
            Purchase summary
          </h3>

          <div className="space-y-3">
            {planItems.map((item, index) => (
              <div key={index}>
                {index === 0 ? (
                  // Plan block (with description)
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-[#231D4F]">
                        {item.title}
                      </div>
                      <div className="text-sm text-[royalPurple]">
                        {item.description}
                      </div>
                    </div>
                    <div className="font-medium text-[#231D4F]">
                      {item.price}
                    </div>
                  </div>
                ) : item.highlight ? (
                  // Total block
                  <>
                    <hr className="my-3 border-gray-300" />
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-[#231D4F]">
                        {item.title}
                      </span>
                      <span className="text-xl font-bold text-[#231D4F]">
                        {item.price}
                      </span>
                    </div>
                  </>
                ) : (
                  // Normal row
                  <>
                    {item.title.toString().includes("Sub Total") && (
                      <hr className="my-3 border-gray-300" />
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#231D4F]">{item.title}</span>
                      <span
                        className={`${
                          item.title.toString().includes("Sub Total")
                            ? "font-semibold"
                            : "font-medium"
                        } text-[#231D4F]`}
                      >
                        {item.price}
                      </span>
                    </div>
                    {item.title.toString().includes("GST") && (
                      <hr className="my-3 border-gray-300" />
                    )}
                  </>
                )}
              </div>
            ))}

            <div className=" w-full flex items-center justify-center mt-3 p-3 bg-gradient-to-r from-[#BF9CF9]/30 to-[peach]/30 rounded-md">
              <span className="text-sm mr-2">✅</span>
              <span className="text-[13px] font-semibold text-[#221D4F]">
                Yay! You saved <strong>₹750</strong> on this plan.
              </span>
            </div>
          </div>
        </div>

        <button
          className="w-full px-6 py-2 rounded-lg font-medium text-sm
  bg-gradient-to-r from-yellow-800 via-purple-800 to-pink-500 
  bg-clip-text text-transparent border-[2px] border-[#3d156236]
  transition duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(236,72,153,0.6)] hover:border-purple-50"
        >
          Proceed to Pay ₹2,653
        </button>
      </div>

      <div className="text-center space-y-2 mt-2">
        <p className="text-sm text-gray-500">
          Need help? Reach out to our support team anytime.
        </p>
        <div className="flex items-center justify-center text-xs text-gray-800">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          100% secure payment · No hidden charges
        </div>
      </div>
    </CommonModal>
  );
}

export default CheckoutModal;