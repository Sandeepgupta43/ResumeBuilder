const TemplateSelector = ({ 
  templates, 
  selectedTemplate, 
  onTemplateChange,
  className = ''
}) => {
  return (
    <div className={`w-full max-w-6xl ${className}`}>
      <h3 className="text-lg font-medium text-gray-800 mb-3">Select Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(templates).map(([key, { name, description }]) => (
          <div
            key={key}
            onClick={() => onTemplateChange(key)}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedTemplate === key
                ? "border-blue-500 bg-blue-50 shadow-md"
                : "border-gray-200 hover:border-blue-300 bg-white"
            }`}
          >
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;