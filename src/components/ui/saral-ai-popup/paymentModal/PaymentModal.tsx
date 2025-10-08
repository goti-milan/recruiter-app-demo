"use client";

import { CommonModal } from "../common-modal/CommonModal";
import { FaAngleLeft } from "react-icons/fa6";

const PaymentModal = ({
  isOpen,
  onClose,
  selectedPlan,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: any;
}) => {


  const getGST = (amount: number) => {
    const gst = (amount * 0.18).toFixed(2);
    return gst;
  };

  const getTotal = (amount: number) => {
    const gst = (amount * 0.18).toFixed(2);
    const total = (amount + Number(gst)).toFixed(0);
    return total;
  };
  

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} size="md">
      <div className="flex flex-col space-y-3 w-full ">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <button onClick={onClose} className="text-[#3F1562]">
            <FaAngleLeft size={20} />
          </button>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#3F1562]">
            Checkout
          </h2>
        </div>

        {/* Purchase Summary */}
        <div className="border border-[#3F1562] rounded-lg p-4 bg-[#F9F1FF] shadow-sm space-y-4">
          <h3 className="font-bold text-[18px] text-[#3F1562] text-base">Purchase summary</h3>

          {/* Plan Details */}
          <div className="flex justify-between text-sm">
            <div>
              <p className="font-bold text-[18px] text-[#3F1562] ">{selectedPlan?.name} (1 Month)</p>
              <p className="font-medium text-[16px] text-[#3F1562] ">• {selectedPlan?.credits} Credits → Access {selectedPlan?.profiles} Profiles</p>
            </div>
            <p className="font-bold text-[18px] text-[#3F1562]">₹{selectedPlan?.oldPrice}</p>
          </div>

          {/* Plan Discount */}
          <div className="flex justify-between text-sm">
            <span className="font-medium text-[16px] text-[#3F1562]" >Plan Discount ({selectedPlan?.discount}%)</span>
            <span className="font-medium text-[16px] text-[#3F1562]">-₹{selectedPlan?.oldPrice - selectedPlan?.price}</span>
          </div>

          <hr className="text-gray-300" />

          {/* Sub Total */}
          <div className="flex justify-between text-sm">
            <span className="font-medium text-[16px] text-[#3F1562]" >Sub Total</span>
            <span className="font-bold text-[16px] text-[#3F1562]" >₹{selectedPlan?.price}</span>
          </div>

          {/* GST */}
          <div className="flex justify-between text-sm">
            <span className="font-medium text-[16px] text-[#3F1562]" >GST (18%)</span>
            <span className="font-medium text-[16px] text-[#3F1562]" >₹{getGST(selectedPlan?.price)}</span>
          </div>

          <hr className="text-gray-300" />

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-bold">
            <span className="font-bold text-[18px] text-[#3F1562]">Total (Inc Tax)</span>
            <span className="font-bold text-[18px] text-[#3F1562]">₹{getTotal(selectedPlan?.price)}</span>
          </div>

          {/* Savings Info */}
          <div className="flex items-center gap-2 text-green-600 bg-white justify-center p-2 text-sm rounded-xl">
            ✅ <span className="font-bold text-[14px] text-[#3F1562]">Yay! You saved ₹{selectedPlan?.oldPrice - selectedPlan?.price} on this plan.</span>
          </div>

          {/* Proceed Button */}
          <button className="w-full bg-[#3F1562] text-white py-3 rounded-xl font-semibold hover:bg-[#33124e] transition">
            Proceed to Pay ₹{getTotal(selectedPlan?.price)}
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-[12px] text-[#3F1562]">
          Need help? Reach out to our support team anytime.<br />
          🔒 100% secure payment · No hidden charges
        </div>
      </div>
    </CommonModal>
  );
};

export default PaymentModal;
