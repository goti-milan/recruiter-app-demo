
const SkeletonCard = () => (
  <div className="w-full" style={{ maxWidth: '400px' }}>
    <div className="p-[1.5px] rounded-lg bg-gradient-to-r from-[#F3E8FF] to-[#FDECF5] animate-pulse">
      <div className="rounded-lg p-3 bg-gradient-to-br from-[#FFFFFF] to-[#F9EEEE]">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="ml-2">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
          <div className="bg-transparent border-[2px] border-[#ffffff] rounded-md px-2 py-1">
            <div className="flex items-center space-x-1">
              <div className="h-4 bg-gray-200 rounded w-12"></div>
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Content box */}
        <div className="bg-[#fcf9f9] backdrop-blur-sm border-[2px] border-[#ffffff] rounded-lg p-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-3">
              {/* Experience */}
              <div>
                <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              {/* Location */}
              <div>
                <div className="h-3 bg-gray-200 rounded w-14 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
            
            {/* Assessment score column */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center mb-8">
                <div className="relative w-14 h-14 mr-6">
                  <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-3 bg-gray-200 rounded w-20 ml-6 mt-2"></div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-3 flex justify-center">
            <div className="w-full max-w-[380px] h-9 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SkeletonCard;