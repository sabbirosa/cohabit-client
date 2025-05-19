
function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
      <p className="text-sm text-gray-700 font-medium">
        Loading, please wait...
      </p>
    </div>
  );
}

export default Loading;
