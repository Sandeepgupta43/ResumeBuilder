const ErrorDisplay = ({ error }) => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
      <strong>Error:</strong> {error?.message || "Something went wrong."}
    </div>
  );
};

export default ErrorDisplay;
