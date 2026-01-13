import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';
import { BotIcon, UserIcon, ErrorIcon } from './Icons';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isBot = message.role === 'model';
  const isError = message.isError;
  const hasLiveAgentButton = message.text.includes('[LIVE_AGENT_BUTTON]');
  const displayText = hasLiveAgentButton
    ? message.text.replace('[LIVE_AGENT_BUTTON]', '').trim()
    : message.text;

  return (
    <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} group animate-slide-up`}>
      <div className={`flex max-w-[90%] md:max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'} gap-3`}>

        {/* Avatar */}
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border mt-1
          ${isBot
            ? (isError
              ? 'bg-red-500/10 border-red-500/30 text-red-500'
              : 'bg-brand-secondary border-white/10 text-brand-primary')
            : 'bg-brand-primary border-transparent text-white'
          }
        `}>
          {isBot ? (isError ? <ErrorIcon /> : <BotIcon />) : <UserIcon />}
        </div>

        {/* Message Content */}
        <div
          className={`
            relative px-5 py-3.5 text-[15px] leading-relaxed shadow-sm overflow-hidden
            ${isBot
              ? (isError
                ? 'bg-red-950/40 border border-red-500/20 text-red-200 rounded-2xl rounded-tl-none'
                : 'bg-brand-secondary/80 border border-white/5 text-gray-300 rounded-2xl rounded-tl-none')
              : 'bg-brand-primary text-white rounded-2xl rounded-tr-none shadow-md'
            }
          `}
        >
          <div className="font-sans font-normal tracking-wide markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-bold text-white/90" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                li: ({ node, ...props }) => <li className="ml-2" {...props} />,
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-3 rounded-lg border border-white/10 bg-brand-bg/50">
                    <table className="min-w-full divide-y divide-white/10 text-sm" {...props} />
                  </div>
                ),
                thead: ({ node, ...props }) => <thead className="bg-white/5" {...props} />,
                tbody: ({ node, ...props }) => <tbody className="divide-y divide-white/10" {...props} />,
                tr: ({ node, ...props }) => <tr className="hover:bg-white/5 transition-colors" {...props} />,
                th: ({ node, ...props }) => (
                  <th className="px-4 py-3 text-left text-xs font-semibold text-brand-primary uppercase tracking-wider" {...props} />
                ),
                td: ({ node, ...props }) => (
                  <td className="px-4 py-3 whitespace-nowrap text-gray-300" {...props} />
                ),
                a: ({ node, ...props }) => <a className="text-brand-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
              }}
            >
              {displayText}
            </ReactMarkdown>

            {/* Live Agent Button */}
            {hasLiveAgentButton && (
              <div className="mt-4">
                <button
                  onClick={() => {
                    localStorage.setItem('routeToLiveAgent', '1');
                    // Send message to parent window
                    if (window.parent && window.parent !== window) {
                      window.parent.postMessage({
                        type: 'routeToLiveAgent',
                        value: '1'
                      }, '*');
                    }
                  }}
                  className="w-full px-4 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30"
                >
                  Connect to Live Support
                </button>
              </div>
            )}
          </div>

          {/* Timestamp */}
          <div className={`
            text-[10px] tracking-wide font-medium opacity-40 mt-1
            ${isBot ? 'text-left' : 'text-right text-white/80'}
          `}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

      </div>
    </div>
  );
};