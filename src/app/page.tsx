import ChatBot from './components/ChatBot/ChatBot';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Lost Girls Vintage Support
        </h1>
        <ChatBot />
      </div>
    </main>
  );
}
