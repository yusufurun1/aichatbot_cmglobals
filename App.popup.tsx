import React, { useState, useEffect, useRef } from 'react';
import { SendIcon, LoadingDots, CMGlobalsLogoSmall } from './components/IconsPopup';
import { ChatBubblePopup } from './components/ChatBubblePopup';
import { Message, Language } from './types';
import { sendMessage, initializeChat } from './services/geminiService';
import { SUGGESTIONS } from './constants';

// Popup UI Texts (English)
const POPUP_UI_TEXT = {
    title: "CM Globals Assistant",
    placeholder: "Type your message...",
    sending: "Sending...",
    online: "Online",
    chips_title: "Suggestions:",
};

// Welcome messages sequence (short, clean)
const WELCOME_SEQUENCE = [
    "Hello! 👋",
    "I'm the **CM Globals Assistant**.",
    "How can I help you today?"
];

// After-hours welcome message
const AFTER_HOURS_MESSAGE = "🌙 We are currently outside of business hours (09:00 AM - 06:00 PM South Africa Time).\n\nConnecting you to our live support team...";

// Business hours configuration (South Africa Time - SAST/UTC+2)
const BUSINESS_HOURS = {
    startHour: 9,   // 09:00 AM
    endHour: 18,    // 06:00 PM (18:00) - Live Agent hours
    timezone: 'Africa/Johannesburg' // SAST (UTC+2)
};

/**
 * Check if current time is outside business hours in South Africa timezone.
 * Business hours: 09:00 - 18:00 SAST (UTC+2)
 */
const isOutsideBusinessHours = (): boolean => {
    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: BUSINESS_HOURS.timezone,
            hour: 'numeric',
            hour12: false
        });
        const hourString = formatter.format(now);
        const currentHour = parseInt(hourString, 10);

        return currentHour < BUSINESS_HOURS.startHour || currentHour >= BUSINESS_HOURS.endHour;
    } catch (error) {
        console.warn('Error checking business hours:', error);
        return false;
    }
};

const AppPopup: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const [language] = useState<Language>('en');

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Prevent double initialization in React Strict Mode
    const hasInitialized = useRef(false);

    // Animated welcome message sequence
    const showWelcomeMessages = async () => {
        for (let i = 0; i < WELCOME_SEQUENCE.length; i++) {
            await new Promise(resolve => setTimeout(resolve, i === 0 ? 0 : 400));
            setMessages(prev => [
                ...prev,
                {
                    id: `welcome-${i}`,
                    role: 'model',
                    text: WELCOME_SEQUENCE[i],
                    timestamp: new Date(),
                }
            ]);
        }
    };

    // Initialize Chat
    const startNewSession = async () => {
        setIsLoading(true);
        setMessages([]);
        hasInitialized.current = true;

        try {
            await initializeChat();
            await showWelcomeMessages();
            setIsInitialized(true);
        } catch (e) {
            console.error("Initialization failed", e);
        } finally {
            setIsLoading(false);
        }
    };

    // Initialize Check
    useEffect(() => {
        if (!hasInitialized.current) {
            startNewSession();
        }
    }, []);

    // Reliable mobile height fix
    useEffect(() => {
        const setAppHeight = () => {
            const doc = document.documentElement;
            doc.style.setProperty('--app-height', `${window.innerHeight}px`);
        };

        window.addEventListener('resize', setAppHeight);
        setAppHeight(); // Initial call

        return () => window.removeEventListener('resize', setAppHeight);
    }, []);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto', block: 'end' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim() || isLoading || !isInitialized) return;

        const userMsgText = text.trim();
        setInputValue('');

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: userMsgText,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setIsLoading(true);

        try {
            const response = await sendMessage(userMsgText, messages);

            // Get response text and check for live agent routing
            let responseText = response.text;

            // If API indicates routing to live agent, just show the button - don't auto-redirect
            // User must click the button to connect (rate limit is the only auto-redirect case)
            if (response.routeToLiveAgent === true) {
                // Append button marker if not already present
                if (!responseText.includes('[LIVE_AGENT_BUTTON]')) {
                    responseText += '\n\n[LIVE_AGENT_BUTTON]';
                }
            }

            // Handle [SPLIT] delimiter for multi-part messages
            const messageParts = responseText.split('[SPLIT]').filter(p => p.trim().length > 0);

            for (let i = 0; i < messageParts.length; i++) {
                if (i > 0) {
                    // Small delay between parts for natural feel
                    await new Promise(resolve => setTimeout(resolve, 500));
                }

                const botMsg: Message = {
                    id: (Date.now() + i).toString(),
                    role: 'model',
                    text: messageParts[i].trim(),
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, botMsg]);
            }
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
                    text: error.message || "Connection error occurred. Please try again.",
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

    // Check if this message should show avatar (first in group)
    const shouldShowAvatar = (index: number): boolean => {
        if (index === 0) return true;
        const currentRole = messages[index].role;
        const prevRole = messages[index - 1].role;
        return currentRole !== prevRole;
    };

    // Check if this is the last message in a group
    const isLastInGroup = (index: number): boolean => {
        if (index === messages.length - 1) return true;
        const currentRole = messages[index].role;
        const nextRole = messages[index + 1].role;
        return currentRole !== nextRole;
    };

    return (
        <div className="cmglobals-popup-widget">
            {/* Header Bar */}
            <header className="cmglobals-popup-header">
                <div className="cmglobals-popup-header-left">
                    <CMGlobalsLogoSmall />
                    <div className="cmglobals-popup-header-info">
                        <span className="cmglobals-popup-title">{POPUP_UI_TEXT.title}</span>
                        <div className="cmglobals-popup-status">
                            <span className="cmglobals-popup-status-dot"></span>
                            <span className="cmglobals-popup-status-text">{POPUP_UI_TEXT.online}</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={startNewSession}
                    title="Yeni Sohbet"
                    className="cmglobals-popup-reset-btn"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </button>
            </header>

            {/* Chat Area */}
            <main className="cmglobals-popup-body">
                <div className="cmglobals-popup-messages">
                    {messages.map((msg, index) => (
                        <ChatBubblePopup
                            key={msg.id}
                            message={msg}
                            showAvatar={shouldShowAvatar(index)}
                            isLastInGroup={isLastInGroup(index)}
                        />
                    ))}

                    {isLoading && (
                        <div className="cmglobals-popup-loading">
                            <div className="cmglobals-popup-loading-avatar">
                                <img src="logo-icon.svg" alt="CM Globals" className="cmglobals-avatar-img" />
                            </div>
                            <div className="cmglobals-popup-loading-bubble">
                                <LoadingDots />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="h-2" />
                </div>
            </main>

            {/* Input Area */}
            <div className="cmglobals-popup-input-area">
                {/* Quick Suggestions (only show first 4 for popup) */}
                {messages.length < 8 && !isLoading && (
                    <div className="cmglobals-popup-suggestions">
                        {SUGGESTIONS[language].slice(0, 8).map((chip) => (
                            <button
                                key={chip.id}
                                onClick={async () => {
                                    setInputValue(chip.query);
                                    setIsLoading(true);
                                    await new Promise(r => setTimeout(r, 600)); // Natural "thinking" delay
                                    handleSendMessage(chip.query);
                                }}
                                className="cmglobals-popup-suggestion-chip"
                            >
                                {chip.text}
                            </button>
                        ))}
                    </div>
                )}

                <form onSubmit={onFormSubmit} className="cmglobals-popup-form">
                    <textarea
                        ref={inputRef as any}
                        rows={1}
                        value={inputValue}
                        onFocus={() => {
                            // Aggressive scroll strategy: fire multiple times to catch keyboard animation
                            // This ensures we scroll AFTER the viewport height has actually changed
                            scrollToBottom(); // Instant
                            setTimeout(scrollToBottom, 200); // During animation
                            setTimeout(scrollToBottom, 400); // After animation likely finished
                        }}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                onFormSubmit(e as any);
                            }
                        }}
                        placeholder={isInitialized ? POPUP_UI_TEXT.placeholder : "Başlatılıyor..."}
                        disabled={!isInitialized || isLoading}
                        className="cmglobals-popup-input"
                    />

                    <div className="cmglobals-popup-input-actions">
                        {/* Send Button */}
                        <button
                            type="submit"
                            disabled={!inputValue.trim() || isLoading}
                            className="cmglobals-popup-send-btn"
                        >
                            <SendIcon />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AppPopup;
