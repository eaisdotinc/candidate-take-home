import { Message } from "../types/chat";

const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] md:max-w-[75%] p-4 rounded-lg relative ${
          isUser 
            ? 'bg-rose-800 text-rose-50 rounded-br-none border-2 border-rose-700' 
            : 'bg-amber-50 text-amber-900 rounded-bl-none border-2 border-amber-200'
        }`}
      >
        {!isUser && <div className="absolute -top-2 -left-2 w-4 h-4 bg-amber-100 border-2 border-amber-200 rounded-full"></div>}
        {isUser && <div className="absolute -top-2 -right-2 w-4 h-4 bg-rose-700 border-2 border-rose-600 rounded-full"></div>}
        
        <p className="font-serif">{message.content}</p>
        <div className="flex items-center justify-end mt-2 gap-1.5">
          <span className={`block text-xs ${isUser ? 'text-rose-200' : 'text-amber-700'} font-medium`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {isUser && (
            <svg className="w-3 h-3 text-rose-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;