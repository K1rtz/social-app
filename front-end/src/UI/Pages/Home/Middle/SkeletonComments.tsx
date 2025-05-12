const SkeletonComments = () => {
    return (
      <div className="space-y-6 animate-pulse">

        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-full bg-[#312c40]" />
          <div className="flex flex-col w-full space-y-2">
            <div className="h-3 w-1/4 bg-[#3d3752] rounded" />
            <div className="h-10 bg-[#3d3752] rounded" />
          </div>
        </div>
  
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-[#312c40]" />
            <div className="flex flex-col w-full space-y-2 bg-[#2a273a] border border-[#3d3752] p-3 rounded-lg">
              <div className="flex justify-between">
                <div className="h-3 w-1/3 bg-[#3d3752] rounded" />
                <div className="h-3 w-1/4 bg-[#3d3752] rounded" />
              </div>
              <div className="h-4 w-full bg-[#3d3752] rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  };
  

export default SkeletonComments