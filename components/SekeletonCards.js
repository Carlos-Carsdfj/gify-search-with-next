export function  SkeletonCards(){
    return (
      <>
        <div className="container mx-auto p-2">
          <div className="mt-12 w-full grid grid-flow-row-dense grid-cols-1 lg:grid-cols-3  gap-x-2 gap-y-1 
          animate-pulse flex-row items-center justify-center space-x-1 ">
              <div className="h-[600px] w-[400px] rounded-md bg-gray-300 "></div>
              <div className="h-[600px] w-[400px] rounded-md bg-gray-300 "></div>
              <div className="h-[600px] w-[400px] rounded-md bg-gray-300 "></div>
              <div className="h-[600px] w-[400px] rounded-md bg-gray-300 "></div>
          </div>
        </div>
      </>
    );
  };