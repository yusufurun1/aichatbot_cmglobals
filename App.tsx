import React, { useState, useEffect, useRef } from 'react';
import { SendIcon, LoadingDots, BotIcon, ComoLogo, MicIcon, StopIcon } from './components/Icons';
import { ChatBubble } from './components/ChatBubble';
import { Message, Language } from './types';
import { sendMessage, initializeChat } from './services/geminiService';
import { UI_TEXT, SUGGESTIONS } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [language] = useState<Language>('en'); // Hardcoded to English

  // Voice Input State
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Chat
  const startNewSession = async () => {
    setIsLoading(true);
    setMessages([]);
    try {
      await initializeChat();
      setMessages([
        {
          id: 'init-1',
          role: 'model',
          text: UI_TEXT[language].welcome,
          timestamp: new Date(),
        },
      ]);
      setIsInitialized(true);
    } catch (e) {
      console.error("Initialization failed", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    startNewSession();
  }, []);

  // Initialize Speech Recognition logic
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
      }
    }
  }, []);

  // When language changes, update the welcome message if it's the only message, 
  // otherwise just change UI text. The AI adapts to the *User's* input language automatically.


  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    // Set language to English for speech recognition
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        // @ts-ignore
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');

      setInputValue(prev => {
        // Append with a space if there is existing text
        const spacing = prev.length > 0 && !prev.endsWith(' ') ? ' ' : '';
        return prev + spacing + transcript;
      });
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech Recognition Error", event.error);
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading || !isInitialized) return;

    const userMsgText = text.trim();
    setInputValue('');

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userMsgText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Pass the current history (excluding the new user message we just added visually, 
      // or include it? The API usually expects history *before* the new prompt, 
      // OR we can send all including the new one if the API handles it.
      // My backend logic takes 'message' (new) and 'history' (context).
      // So let's pass 'messages' (which is the state BEFORE this new one is added to state? 
      // No, setMessages is async. 'messages' variable here is still the old state).

      const response = await sendMessage(userMsgText, messages);

      // Get response text and check for live agent routing
      let responseText = response.text;

      // If API indicates routing to live agent, just show the button - don't auto-redirect
      // User must click the button to connect (rate limit is the only auto-redirect case)
      if (response.routeToLiveAgent) {
        // Append button marker if not already present
        if (!responseText.includes('[LIVE_AGENT_BUTTON]')) {
          responseText += '\n\n[LIVE_AGENT_BUTTON]';
        }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error: any) {
      // Check if it's a rate limit error
      const isRateLimit = error.message?.includes('RATE_LIMIT') ||
        error.message?.includes('429') ||
        error.message?.includes('Rate Limit') ||
        error.message?.includes('rate limit');

      if (isRateLimit) {
        // Set localStorage flag for live agent redirect
        localStorage.setItem('routeToLiveAgent', '1');

        // Send message to parent window immediately
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({
            type: 'routeToLiveAgent',
            value: '1'
          }, '*');
        }

        const rateLimitMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: "The AI assistant is currently unavailable. Connecting you to live support...",
          timestamp: new Date(),
          isError: false,
        };
        setMessages((prev) => [...prev, rateLimitMsg]);
      } else {
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: error.message || "Sorry, a connection error occurred. Please try again in a moment.",
          timestamp: new Date(),
          isError: true,
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };



  return (
    <div className="flex flex-col h-screen w-full bg-brand-bg relative overflow-hidden font-sans selection:bg-brand-primary/30">

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#0f4c3a]/20 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-brand-primary/5 to-transparent pointer-events-none" />

      {/* Header Bar */}
      <header className="flex-none w-full glass-card z-30 px-4 md:px-6 py-3 flex items-center justify-between shadow-lg shadow-black/20">
        <div className="flex items-center gap-3 md:gap-4">
          <ComoLogo />
          <div className="hidden sm:flex flex-col">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-glow"></span>
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">{UI_TEXT[language].online}</span>
            </div>
            <span className="text-[9px] text-brand-muted">{UI_TEXT[language].context_badge}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">


          <button
            onClick={startNewSession}
            title={UI_TEXT[language].clear}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-brand-muted hover:text-white transition-colors border border-white/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full relative z-10 overflow-hidden">
        <div className="w-full max-w-4xl h-full flex flex-col">

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 pb-2">
            <div className="flex flex-col space-y-5">
              {messages.map((msg) => (
                <ChatBubble key={msg.id} message={msg} />
              ))}

              {isLoading && (
                <div className="flex w-full justify-start animate-pulse pl-1 pt-2">
                  <div className="flex flex-row gap-3 items-center">
                    <div className="w-8 h-8 rounded-full bg-brand-secondary border border-white/10 flex items-center justify-center">
                      <BotIcon />
                    </div>
                    <div className="bg-brand-secondary/50 border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none flex items-center h-10">
                      <LoadingDots />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </div>

          {/* Input & Suggestions Area */}
          <div className="flex-none p-4 md:p-6 pt-2 w-full">
            <div className="relative group w-full">

              {/* Suggestions Chips (Only show if not loading and messages < 10 to keep it clean) */}
              {messages.length < 10 && !isLoading && (
                <div className="mb-3 overflow-x-auto no-scrollbar flex items-center gap-2 pb-1 fade-in">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mr-1 whitespace-nowrap">
                    {UI_TEXT[language].chips_title}
                  </span>
                  {SUGGESTIONS[language].map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => handleSendMessage(chip.query)}
                      className="
                        flex-shrink-0 px-3 py-1.5 rounded-full 
                        bg-brand-secondary border border-brand-primary/20 
                        text-xs font-medium text-gray-300 hover:text-white hover:bg-brand-primary/20 hover:border-brand-primary/50
                        transition-all duration-200 cursor-pointer whitespace-nowrap
                      "
                    >
                      {chip.text}
                    </button>
                  ))}
                </div>
              )}

              <form
                onSubmit={onFormSubmit}
                className="relative flex items-center w-full"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isListening ? 'Listening...' : (isInitialized ? UI_TEXT[language].placeholder : "Initializing...")}
                  disabled={!isInitialized || isLoading}
                  className={`
                    w-full glass-input text-white 
                    text-[15px]
                    py-4 pl-6 pr-24 rounded-xl
                    border border-white/10
                    shadow-xl shadow-black/20
                    focus:outline-none focus:border-brand-primary/60 focus:bg-brand-secondary/80
                    focus:ring-1 focus:ring-brand-primary/30
                    transition-all duration-300
                    ${isListening
                      ? 'ring-1 ring-red-500/50 border-red-500/50 bg-red-950/20 placeholder-red-400/80'
                      : 'placeholder-gray-400/70'
                    }
                  `}
                />

                {/* Input Actions Container */}
                <div className="absolute right-2 flex items-center gap-1">

                  {/* Voice Input Button */}
                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    disabled={!isInitialized || isLoading}
                    className={`
                      relative p-2.5 rounded-lg
                      transition-all duration-200 ease-out
                      ${isListening
                        ? 'bg-red-500/10 text-red-500'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }
                    `}
                    title="Voice Input"
                  >
                    {isListening && (
                      <>
                        <span className="absolute inset-0 rounded-lg bg-red-500/20 animate-ping"></span>
                        <span className="absolute inset-0 rounded-lg ring-1 ring-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]"></span>
                      </>
                    )}
                    {isListening ? <StopIcon /> : <MicIcon />}
                  </button>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="
                      p-2.5 rounded-lg
                      bg-brand-primary text-white 
                      hover:bg-blue-600 hover:shadow-lg hover:shadow-brand-primary/20
                      disabled:opacity-0 disabled:scale-90
                      transition-all duration-200 ease-out
                    "
                  >
                    <SendIcon />
                  </button>
                </div>

              </form>

              {/* Compliance / Disclaimer Footer */}
              <div className="mt-3 text-center">
                <p className="text-[10px] text-gray-500 max-w-2xl mx-auto leading-relaxed opacity-70">
                  {UI_TEXT[language].disclaimer}
                </p>
                <div className="flex justify-center items-center gap-2 mt-1 opacity-40">
                  <svg className="w-2.5 h-2.5 text-brand-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                  <span className="text-[9px] font-medium tracking-wide">ComoFX Intelligence v2.3</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;