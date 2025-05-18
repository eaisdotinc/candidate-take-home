import { WelcomePrompt } from "../types/welcomePrompts";
import ChatMessage from "./ChatMessage";
import ErrorMessage from "./ErrorMessage";
import TypingIndicator from "./TypingIndicator";

const WelcomePrompts:React.FC<WelcomePrompt> = ({
  messageContainerRef,
  messages,
  setInputMessage,
  isPending,
  error,
}) => {
  return (
    <div
      ref={messageContainerRef}
      className="flex-1 p-3 md:p-6 overflow-y-auto flex flex-col gap-4 md:gap-5 bg-[url('/vintage-paper-texture.png')] bg-repeat"
      style={{ backgroundSize: "400px" }}
    >
      {messages.length === 0 ? (
        <div className="flex flex-1 items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md text-center p-4 md:p-6 rounded-lg border-2 border-amber-200 bg-amber-50 bg-opacity-90 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-100 px-3 md:px-4 text-amber-800 font-serif text-xs md:text-sm border border-amber-200 rounded-full">
              Welcome
            </div>
            <p className="text-amber-900 mb-3 md:mb-4 font-serif italic text-sm md:text-base">
              Send a message to start chatting with our vintage fashion
              specialists!
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() =>
                  setInputMessage("I'm looking for a 1950s cocktail dress")
                }
                className="py-2 px-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-md text-xs md:text-sm transition-colors duration-150 border border-amber-200"
              >
                I&apos;m looking for a 1950s cocktail dress
              </button>
              <button
                onClick={() =>
                  setInputMessage("Do you authenticate vintage pieces?")
                }
                className="py-2 px-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-md text-xs md:text-sm transition-colors duration-150 border border-amber-200"
              >
                Do you authenticate vintage pieces?
              </button>
              <button
                onClick={() => setInputMessage("What era is your speciality?")}
                className="py-2 px-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-md text-xs md:text-sm transition-colors duration-150 border border-amber-200"
              >
                What era is your speciality?
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4 md:space-y-5 w-full">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isPending && <TypingIndicator />}

            {error && (
              <ErrorMessage message="Our vintage telegram system is having issues. Please try again." />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WelcomePrompts;
