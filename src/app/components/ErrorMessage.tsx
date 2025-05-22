const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-start w-full">
      <div className="bg-red-50 text-red-800 p-3 rounded-lg rounded-bl-none max-w-[75%] border-2 border-red-200 font-serif">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {message}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;