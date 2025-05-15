import Chatbot from './components/Chatbot';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Lost Girls Vintage Support</h1>
      <Chatbot />
    </main>
  );
}