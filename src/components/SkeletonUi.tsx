export default function SkeletonUi() {
  return (
    <div className="flex flex-col w-full h-full m-4 border border-gray-300 rounded-md text-xs bg-white shadow-md">
      <div className="w-full h-120 bg-gray-300"></div>
      <div className="flex flex-col justify-center p-2">
        <div className="w-100 h-6 bg-gray-300 my-1"></div>
        <div className="w-100 h-6 bg-gray-300 my-1"></div>
        <div className="w-100 h-6 bg-gray-300"></div>
      </div>
    </div>
  );
}
