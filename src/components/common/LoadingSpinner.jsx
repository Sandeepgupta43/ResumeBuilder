const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <span className="ml-2 text-sm text-gray-700">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
