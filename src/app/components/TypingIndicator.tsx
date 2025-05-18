const TypingIndicator = () => {
  return (
    <div className="flex justify-start w-full">
      <div className="self-start flex items-center gap-2 bg-amber-50 text-amber-900 p-3 px-4 rounded-lg rounded-bl-none border-2 border-amber-200">
        <span className="text-sm italic font-serif">Vintage assistant is replying</span>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-0"></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-150"></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;