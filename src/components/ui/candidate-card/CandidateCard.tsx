// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import HeadScore from "../progressbar/HeadScore";
// import Linkdin from "@/assets/svg/saral-ai/linkdin/Linkdin";
// import {
//   createSavedProfile,
//   deleteSavedProfile,
// } from "@/helpers/apis/saral-ai.ts";
// import Delete from "@/assets/svg/saral-ai/logo/delete/Delete";
// import { getAuthorizedUserId } from "@/helpers/authorization.ts";
// import { useNavigate } from "react-router";
// import { LOGIN, SARAL_AI_LINKEDIN_CAMPAIGN } from "@/routes";

// // Define the props interface
// interface CandidateCardProps {
//   candidate: {
//     id: number;
//     name: string;
//     initials: string;
//     position: string;
//     experience: string;
//     location: string;
//     assessmentScore?: number;
//     profileUrl?: string;
//   };
//   initialSavedState?: boolean;
//   isForSavedList?: boolean;
//   onSaveToggle?: (candidateId: number, isSaved: boolean) => void;
//   animationDelay?: number;
//   maxWidth?: number;
//   SavedProfileCount?: () => void;
//   handleDelete?: () => void;
//   delLoading?: boolean;
// }

// const CandidateCard: React.FC<CandidateCardProps> = ({
//   candidate,
//   initialSavedState = false,
//   onSaveToggle,
//   animationDelay = 0.2,
//   maxWidth = 100,
//   isForSavedList = false,
//   handleDelete,
//   SavedProfileCount
// }) => {
//   const [isSaved, setIsSaved] = useState(initialSavedState);
//   const [loading, setLoading] = useState(false);
//   const [savedProfileId, setSavedProfileId] = useState<number | null>(null);

//   const [authorizedUserId, setAutorizedUserId] = useState<string>("");
//   const X_USER_ID = authorizedUserId;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userId = getAuthorizedUserId();
//     if (!userId) {
//       navigate(LOGIN);
//     }
//     setAutorizedUserId(userId ?? "");
//   }, []);

// const handleMessageCandidate = () => {
//   navigate(SARAL_AI_LINKEDIN_CAMPAIGN, {
//     state: { candidate },
//   });
// };

//   const handleSaveToggle = async () => {
//     if (loading) return;
//     setLoading(true);

//     try {
//       if (!isSaved) {
//         // --- Save Profile ---
//         const res = await createSavedProfile(X_USER_ID,candidate.id);
//         // @ts-ignore
//         if (res.data) {
//           setSavedProfileId((res as any).id);
//           setIsSaved(true);
//           onSaveToggle?.(candidate.id, true);
//           SavedProfileCount?.();
//         }
//       } else {
//         // --- Unsave Profile ---
//         if (!savedProfileId) {
//           console.warn("No savedProfileId found for unsave");
//           return;
//         }
//         const res = await deleteSavedProfile(X_USER_ID, candidate.id);
//         if (res && (res as any).success !== false) {
//           setIsSaved(false);
//           setSavedProfileId(null);
//           onSaveToggle?.(candidate.id, false);
//         }
//       }
//     } catch (err) {
//       console.error("Save/Unsave error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewProfile = () => {
//     if (candidate.profileUrl) {
//       window.open(candidate.profileUrl, "_blank");
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: animationDelay }}
//       className="w-full"
//       style={{ maxWidth: `${maxWidth}px` }}
//     >
//     <div
//   className={`p-[2.5px] rounded-lg transition-all duration-300 ${
//     isSaved
//       ? "bg-gradient-to-r from-[#DF6789] to-[#3F1562]"
//       : "bg-gradient-to-r from-[#F3E8FF] to-[#FDECF5]"
//   }`}
// >
//    <div className="bg-white rounded-lg p-3">
//         <div
//           className={`rounded-lg p-3 relative transition-all duration-300 ${
//              "bg-white/50 backdrop-blur-sm"
//           }`}
//         >
//           {/* Header */}
//           <div className="flex items-start justify-between mb-4">
//             <div className="flex items-center space-x-2">
//               <div className="w-12 h-12 bg-[#F1DFFF] rounded-full flex items-center justify-center border border-purple-300">
//                 <span className="text-2xl font-bold text-purple-800">
//                   {candidate.initials}
//                 </span>
//               </div>
//               <div className="ml-2">
//                 <h1 className="text-base font-bold text-[#3D1562] mb-0.5">
//                   {candidate.name}
//                 </h1>
//                 <p className="text-xs text-[#3D1562] opacity-50">
//                   {candidate.position.split(" ")[0]}{" "}
//                   {candidate.position.split(" ")[1]}
//                 </p>
//               </div>
//             </div>
//             <div className="bg-transparent border-[2px] border-[#ffffff] rounded-md px-2 py-1">
//               <button
//                 onClick={handleViewProfile}
//                 disabled={!candidate.profileUrl}
//                 className={`flex items-center border border-black/20 rounded-sm p-2 w-20 flex justify-center space-x-1 transition-opacity ${
//                   candidate.profileUrl
//                     ? "cursor-pointer hover:opacity-80"
//                     : "cursor-not-allowed opacity-50"
//                 }`}
//               >
//                 <span className="text-[#0077B4] text-[10px] font-medium">
//                   View on
//                 </span>
//                 <Linkdin />
//               </button>
//             </div>
//           </div>

//           {/* Content */}
//           <div
//             className={`${
//                "bg-[#F9F1FF]"
//             } backdrop-blur-sm border-[2px] border-[#ffffff] rounded-lg p-3`}
//           >
//             <div className="grid grid-cols-2 gap-3">
//               <div className="space-y-3">
//                 <div>
//                   <p className="text-[#3D1562] text-[13px] mb-0.5 opacity-50">
//                     Experience
//                   </p>
//                   <p className="text-base opacity-90 font-bold text-[#3D1562]">
//                     {
//                       candidate.experience.split("·")[
//                         candidate.experience.split("-").length - 1
//                       ]
//                     }
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-[#3D1562] text-[10px] mb-0.5 opacity-50">
//                     Location
//                   </p>
//                   <p className="text-[12px] font-base text-[#3D1562] opacity-70">
//                     {candidate.location}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex flex-col items-center justify-center">
//                 <div className="flex flex-col items-center justify-center mb-8">
//                   <div className="relative w-14 h-14 mr-6">
//                     <HeadScore value={candidate.assessmentScore ?? 0} />
//                   </div>
//                   <span className="text-[#3D1562] text-[12px] ml-6 font-semibold opacity-55 mt-2">
//                     Assessment score
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Save / Saved Button */}
//             <div className="mt-3 flex justify-center">
//               {isForSavedList && (
//                 <>
//                   <button
//                     className={`w-full max-w-[45px] bg-white border-[2px] mr-2 border-[#eddddd] hover:opacity-80 rounded-xl text-sm font-bold px-3 py-1.5 transition-all duration-300 ease-in-out
//                 text-transparent bg-clip-text bg-gradient-to-r from-[#3F1562] to-[#DF6789]`}
//                     onClick={handleDelete}
//                   >
//                     <Delete />
//                   </button>
//                 </>
//               )}
//              {
//               isForSavedList
//               ?
//                <button
//                 onClick={handleMessageCandidate}
//                 disabled={loading}
//                 className={`w-full max-w-[380px] rounded-xl text-sm font-bold px-3 py-1.5 transition-all duration-300 ease-in-out
//                 text-transparent bg-clip-text bg-gradient-to-r from-[#3F1562] to-[#DF6789]
//                 ${
//                   isSaved
//                     ? "border-[2px] border-[#eddddd] hover:opacity-80"
//                     : "border-[2px] border-[#ffffff] hover:bg-purple-50 hover:border-purple-100"
//                 } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//               >
//                 Message
//               </button>
//               :

//                <button
//                 onClick={handleSaveToggle}
//                 disabled={loading}
//                 className={`w-full max-w-[380px] rounded-xl text-sm font-bold px-3 py-1.5 transition-all duration-300 ease-in-out
//                 ${
//                   isSaved
//                     ? "bg-[#3F1562] text-[#FFFFFF] border-[2px] border-[#eddddd] hover:opacity-80"
//                     : "text-[#3F1562] border-[2px] border-[#886F9D] hover:bg-[#6b3796] hover:border-purple-100"
//                 } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//               >
//                 {loading ? "Processing..." : isSaved ? "Saved" : "Save"}
//               </button>
//              }
//             </div>
//           </div>
//         </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default CandidateCard;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeadScore from "../progressbar/HeadScore";
import Linkdin from "@/assets/svg/saral-ai/linkdin/Linkdin";
import {
  createSavedProfile,
  deleteSavedProfile,
} from "@/helpers/apis/saral-ai.ts";
import Delete from "@/assets/svg/saral-ai/logo/delete/Delete";
import { getAuthorizedUserId } from "@/helpers/authorization.ts";
import { useNavigate } from "react-router";
import { LOGIN, SARAL_AI_LINKEDIN_CAMPAIGN } from "@/routes";
import { BiTrash } from "react-icons/bi";

// Define the props interface
interface CandidateCardProps {
  candidate: {
    id: number;
    name: string;
    initials: string;
    position: string;
    experience: string;
    location: string;
    assessmentScore?: number;
    profileUrl?: string;
  };
  initialSavedState?: boolean;
  isForSavedList?: boolean;
  onSaveToggle?: (candidateId: number, isSaved: boolean) => void;
  animationDelay?: number;
  maxWidth?: number;
  SavedProfileCount?: () => void;
  handleDelete?: () => void;
  delLoading?: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  initialSavedState = false,
  onSaveToggle,
  animationDelay = 0.2,
  maxWidth = 350,
  isForSavedList = false,
  handleDelete,
  SavedProfileCount,
}) => {
  const [isSaved, setIsSaved] = useState(initialSavedState);
  const [loading, setLoading] = useState(false);
  const [savedProfileId, setSavedProfileId] = useState<number | null>(null);

  const [authorizedUserId, setAutorizedUserId] = useState<string>("");
  const X_USER_ID = authorizedUserId;
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getAuthorizedUserId();
    if (!userId) {
      navigate(LOGIN);
    }
    setAutorizedUserId(userId ?? "");
  }, []);

  const handleSaveToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (!isSaved) {
        // --- Save Profile ---
        const res = await createSavedProfile(X_USER_ID, candidate.id);
        // @ts-ignore
        console.log('res', res);
        
        if (res.data) {
          setSavedProfileId((res as any).id);
          setIsSaved(true);
          onSaveToggle?.(candidate.id, true);
          SavedProfileCount?.();
        }
      } else {
        // --- Unsave Profile ---
        if (!savedProfileId) {
          console.warn("No savedProfileId found for unsave");
          return;
        }
        const res = await deleteSavedProfile(X_USER_ID, candidate.id);
        if (res && (res as any).success !== false) {
          setIsSaved(false);
          setSavedProfileId(null);
          onSaveToggle?.(candidate.id, false);
        }
      }
    } catch (err) {
      console.error("Save/Unsave error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = () => {
    if (candidate.profileUrl) {
      window.open(candidate.profileUrl, "_blank");
    }
  };

  return (
    <div
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.5, delay: animationDelay }}
      className="w-full flex-1 min-w-[348px] max-h-[275px] card-view card-mobile"
      style={{ maxWidth: `${maxWidth}px` }}
    >
      <div
        className={`p-[2px] rounded-[20px] transition-all duration-300 `}
        
      >
        <div className="bg-white rounded-[20px] p-5 hover:outline  hover:border-[#3D1562] ">
          <div
            className={`rounded-lg relative transition-all duration-300 ${"bg-white/50 backdrop-blur-sm"}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                  <span className="text-xl uppercase font-bold text-[#3D1562]">
                    {candidate.initials}
                  </span>
                </div>
                <div className="ml-2">
                  <h1 className="text-sm text-[14px] font-bold text-[#3D1562] mb-0.5">
                    {candidate.name}
                  </h1>

                  <p className="text-xs text-[#3D1562] opacity-50">
                    {candidate.position.split(" ")[0]}{" "}
                    {candidate.position.split(" ")[1]}
                  </p>
                </div>
              </div>
              <div className="bg-transparent border-[2px] border-[#ffffff] rounded-md  py-1">
                <button
                  onClick={handleViewProfile}
                  disabled={!candidate.profileUrl}
                  className={`border border-black/20 rounded-xl p-2 w-22 flex justify-center items-center  space-x-1 transition-opacity ${
                    candidate.profileUrl
                      ? "cursor-pointer hover:opacity-80"
                      : "cursor-not-allowed opacity-50"
                  }`}
                >
                  <span className="text-[#0077B4] text-xs font-medium mt-[3px]">
                    View on
                  </span>
                  <Linkdin />
                </button>
              </div>
            </div>

            {/* Content */}
            <div
              className={`${"bg-[#F9F1FF]"} backdrop-blur-sm border-[2px] border-[#ffffff] rounded-lg p-3`}
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div>
                    <p className="text-[#3D1562] text-[12px] mb-0.5 opacity-50">
                      Experience
                    </p>
                    <p className="text-[14px] opacity-90 font-bold text-[#3D1562]">
                      {
                        candidate.experience.split("·")[
                          candidate.experience.split("-").length - 1
                        ]
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-[#3D1562] text-[12px] mb-0.5 opacity-50">
                      Location
                    </p>
                    <p
                      className="text-[14px] font-bold text-[#3D1562] opacity-70 text-ellipsis hover:text-clip"
                      style={{
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={candidate.location} // Tooltip on hover
                    >
                      {candidate.location}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center mb-[10px]">
                    <div className="relative w-14 h-14 mr-6">
                      <HeadScore value={candidate.assessmentScore ?? 0} />
                    </div>
                    <span className="text-[#3D1562] text-[10px] ml-8 font-semibold opacity-55 mt-2">
                      Assessment score
                    </span>
                  </div>
                </div>
              </div>

              {/* Save / Saved Button */}
              <div className="flex justify-center gap-2 mt-2">
                {isForSavedList && (
                  <>
                    <button
                      className={`w-full max-w-[40px] bg-white flex justify-center items-center  hover:opacity-80 hover:bg-gray-200 rounded-xl text-sm font-bold transition-all duration-300 ease-in-out
                `}
                      onClick={handleDelete}
                    >
                     <BiTrash className=" text-red-400 text-xl" />
                    </button>
                  </>
                )}
                {isForSavedList ? (
                  <button
                    // onClick={handleMessageCandidate}
                    disabled={loading}
                    className={`w-full max-w-[380px] rounded-xl text-sm font-bold px-3 py-1.5 transition-all duration-300 ease-in-out
                text-[#3F1562] bg-white border-[#3F1562] border-[1px] 
               ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Saved
                  </button>
                ) : (
                  <button
                    onClick={handleSaveToggle}
                    disabled={loading}
                    className={`w-full max-w-[380px] rounded-xl text-sm font-bold px-3 py-1.5 transition-all duration-300 ease-in-out
                ${
                  isSaved
                    ? "bg-[#3F1562] text-[#FFFFFF] border-[2px] border-[#eddddd] hover:opacity-80"
                    :  "bg-white text-[#3F1562] border-[2px] border-[#886F9D] hover:bg-[#3F1562] hover:text-white  hover:border-purple-100"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {loading ? "Processing..." : isSaved ? "Saved" : "Save"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
