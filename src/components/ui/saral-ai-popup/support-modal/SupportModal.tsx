import { CommonModal } from "../common-modal/CommonModal";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  return (
    <CommonModal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="text-center font-manrope mb-6">
        <h2 className="text-xl font-bold text-[#3D1562] mb-1">
          Contact Support
        </h2>
        <p className="text-[#3D15623D1562] opacity-40 text-sm">
          We're here to help you succeed
        </p>
      </div>

      {/* Wrapper for both cards */}
      <div className="grid grid-cols-1 font-manrope md:grid-cols-2 gap-4 bg-white rounded-2xl ">
        {/* Email Support */}
        <div className="rounded-xl border border-gray-200 bg-[#F9F1FF] p-5 shadow-sm">
          <h3 className="text-2xl font-bold text-[#3D1562] mb-1">Email Support</h3>
          <p className="text-[#3D1562] opacity-40 text-sm mb-4">
            Get help via email within 24 hours
          </p>
          <div className="flex items-center gap-2 text-[#3D1562] bg-white rounded-xl py-2 px-4">
            {/* Email Icon */}
            <svg
              width="19"
              height="16"
              viewBox="0 0 19 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.1172 14.3281H4.14844C2.59513 14.3281 1.33594 13.0689 1.33594 11.5156V4.48438C1.33594 2.93107 2.59513 1.67188 4.14844 1.67188H15.1172C16.6705 1.67188 17.9297 2.93107 17.9297 4.48438V11.5156C17.9297 13.0689 16.6705 14.3281 15.1172 14.3281Z"
                stroke="#3D1562"
                stroke-width="1.40625"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.14844 4.48438L8.63845 9.11502C9.18763 9.66419 10.078 9.66419 10.6272 9.11502L15.1172 4.48438M4.14844 11.5156L7.52344 8M11.7422 8L15.1172 11.5156"
                stroke="#3D1562"
                stroke-width="1.40625"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span className="text-sm text-[#3D1562] font-medium">
              support@headsin.com
            </span>
          </div>
        </div>

        {/* Contact Number */}
         <div className="rounded-xl border border-gray-200 bg-[#F9F1FF] p-5 shadow-sm">
          <h3 className="text-2xl font-bold text-[#3D1562] mb-1">Contact No.</h3>
          <p className="text-[#3D1562] opacity-40 text-sm mb-4">
            Chat with our support team
          </p>
         <div className="flex items-center gap-2 text-[#3D1562] bg-white rounded-xl py-2 px-4">
            {/* Mobile Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.25 1.5H5.75C4.64543 1.5 3.75 2.39543 3.75 3.5V15.5C3.75 16.6046 4.64543 17.5 5.75 17.5H13.25C14.3546 17.5 15.25 16.6046 15.25 15.5V3.5C15.25 2.39543 14.3546 1.5 13.25 1.5Z"
                stroke="#3D1562"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 14.25H12"
                stroke="#3D1562"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm text-[#3D1562] font-medium">
              +91 907-907-5059
            </span>
          </div>
        </div>
      </div>
    </CommonModal>
  );
}