const CardLoading = () => {
  return (
    <div className="w-64">
      <div className="bg-white border rounded-md p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-md mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default CardLoading;
