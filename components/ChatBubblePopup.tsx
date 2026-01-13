import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';
import { ErrorIconPopup } from './IconsPopup';

interface ChatBubblePopupProps {
    message: Message;
    showAvatar?: boolean;
    isLastInGroup?: boolean;
}

export const ChatBubblePopup: React.FC<ChatBubblePopupProps> = ({
    message,
    showAvatar = true,
    isLastInGroup = true
}) => {
    const isBot = message.role === 'model';
    const isError = message.isError;

    return (
        <div className={`cmglobals-bubble-wrapper ${isBot ? 'bot' : 'user'} ${!isLastInGroup ? 'grouped' : ''}`}>
            <div className={`cmglobals-bubble-container ${isBot ? 'bot' : 'user'}`}>

                {/* Avatar - only show if first in group */}
                {isBot && (
                    <div className={`cmglobals-bubble-avatar ${isError ? 'error' : ''} ${!showAvatar ? 'invisible' : ''}`}>
                        {isError ? (
                            <ErrorIconPopup />
                        ) : (
                            <img src="logo-icon.svg" alt="CM Globals" className="cmglobals-avatar-img" />
                        )}
                    </div>
                )}

                {/* Message Content */}
                <div className={`cmglobals-bubble-content ${isBot ? (isError ? 'error' : 'bot') : 'user'}`}>
                    <div className="cmglobals-bubble-text">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                p: ({ node, ...props }) => <p className="cmglobals-md-p" {...props} />,
                                strong: ({ node, ...props }) => <strong className="cmglobals-md-strong" {...props} />,
                                ul: ({ node, ...props }) => <ul className="cmglobals-md-ul" {...props} />,
                                ol: ({ node, ...props }) => <ol className="cmglobals-md-ol" {...props} />,
                                li: ({ node, ...props }) => <li className="cmglobals-md-li" {...props} />,
                                table: ({ node, ...props }) => (
                                    <div className="cmglobals-md-table-wrapper">
                                        <table className="cmglobals-md-table" {...props} />
                                    </div>
                                ),
                                thead: ({ node, ...props }) => <thead className="cmglobals-md-thead" {...props} />,
                                tbody: ({ node, ...props }) => <tbody className="cmglobals-md-tbody" {...props} />,
                                tr: ({ node, ...props }) => <tr className="cmglobals-md-tr" {...props} />,
                                th: ({ node, ...props }) => (
                                    <th className="cmglobals-md-th" {...props} />
                                ),
                                td: ({ node, ...props }) => (
                                    <td className="cmglobals-md-td" {...props} />
                                ),
                                a: ({ node, ...props }) => <a className="cmglobals-md-link" target="_blank" rel="noopener noreferrer" {...props} />,
                            }}
                        >
                            {message.text
                                .replace('[LIVE_AGENT_BUTTON]', '')
                                .replace('[SPLIT]', '')
                                .replace(/\*\*\s*\(\)\s*\**/g, '')  // Clean empty bold markers like ** ()
                                .replace(/\*\*\*\s*Phone:\s*\**/g, '**Phone:**')  // Fix malformed phone marker
                                .trim()}
                        </ReactMarkdown>
                        {message.text.includes('[LIVE_AGENT_BUTTON]') && (
                            <div className="cmglobals-live-agent-container">
                                <button
                                    className="cmglobals-live-agent-btn"
                                    onClick={() => {
                                        localStorage.setItem('routeToLiveAgent', '1');
                                        localStorage.setItem('cmglobals_chat_open', 'true');
                                        // Send message to parent window
                                        if (window.parent && window.parent !== window) {
                                            window.parent.postMessage({
                                                type: 'routeToLiveAgent',
                                                value: '1'
                                            }, '*');
                                        }
                                    }}
                                >
                                    Connect to Live Support
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Timestamp - only show on last message of group */}
                    {isLastInGroup && (
                        <div className={`cmglobals-bubble-time ${isBot ? '' : 'user'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
