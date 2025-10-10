import Image from "next/image";
import ChatBot from "./components/ChatBot";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <Image
            className="dark:invert mx-auto mb-8"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Continuity GDG
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Chat with our AI assistant
          </p>
        </header>

        <main className="flex flex-col lg:flex-row gap-8">
          {/* Chat Section */}
          <div className="flex-1">
            <ChatBot />
          </div>

          {/* Info Section */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                About This Chat
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                This is an AI-powered chatbot built with OpenAI's gpt-4o-mini. 
                You can ask questions, get help, or just have a conversation!
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a
                  className="block text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Next.js Documentation
                </a>
                <a
                  className="block text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  href="https://openai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenAI
                </a>
                <a
                  className="block text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  href="https://fastapi.tiangolo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FastAPI Documentation
                </a>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-16 text-center">
          <div className="flex gap-6 items-center justify-center flex-wrap">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm text-gray-600 dark:text-gray-400"
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
              />
              Learn
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm text-gray-600 dark:text-gray-400"
              href="https://vercel.com/templates"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
              />
              Examples
            </a>
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-sm text-gray-600 dark:text-gray-400"
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Next.js →
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
