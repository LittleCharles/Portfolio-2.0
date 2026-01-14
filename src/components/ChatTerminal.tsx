
import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal as TerminalIcon, X, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useLanguage } from '../App';

interface ChatTerminalProps {
  onClose: () => void;
}

export const ChatTerminal: React.FC<ChatTerminalProps> = ({ onClose }) => {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message based on language
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'init',
          role: 'model',
          text: t.terminal.welcome,
          timestamp: new Date()
        }
      ]);
    }
  }, [t.terminal.welcome, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Auto-response with contact information
    const contactMessage = lang === 'pt'
      ? `⚠️ Chat em Desenvolvimento\n\nObrigado pela mensagem! Este chat está sendo desenvolvido e ainda não está funcional.\n\nPara entrar em contato comigo:\n\n📧 Email: luis.carlos.vieira@live.com\n💼 LinkedIn: https://www.linkedin.com/in/luis-carlos-vieira/\n\nFicarei feliz em conversar com você!`
      : `⚠️ Chat Under Development\n\nThanks for your message! This chat is under development and not yet functional.\n\nTo get in touch with me:\n\n📧 Email: luis.carlos.vieira@live.com\n💼 LinkedIn: https://www.linkedin.com/in/luis-carlos-vieira/\n\nI'll be happy to talk with you!`;

    // Simulate thinking delay
    setTimeout(() => {
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: contactMessage,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMsg]);
      setIsLoading(false);
    }, 1000);

    // Original code commented out for future use
    // const apiHistory = messages.map(m => ({
    //   role: m.role,
    //   parts: [{ text: m.text }]
    // }));
    // const responseText = await sendMessageToGemini(apiHistory, userMsg.text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-black border-4 border-white shadow-[12px_12px_0_0_#CCFF00] flex flex-col h-[600px] max-h-[90vh]">
        {/* Header */}
        <div className="bg-white p-2 flex justify-between items-center border-b-4 border-white">
          <div className="flex items-center gap-2 px-2">
            <TerminalIcon className="w-5 h-5 text-black" />
            <span className="font-bold font-mono text-black uppercase">{t.terminal.header}</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-black hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Output */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm md:text-base"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] p-3 border-2 ${
                  msg.role === 'user' 
                    ? 'bg-brutal-green text-black border-brutal-green' 
                    : 'bg-transparent text-green-500 border-green-900'
                }`}
              >
                <div className="text-xs opacity-50 mb-1 font-bold uppercase">
                  {msg.role === 'user' ? `> ${t.terminal.visitor}` : `> ${t.terminal.bot}`}
                </div>
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-transparent text-green-500 border-green-900 border-2 p-3 flex items-center gap-2">
                 <Loader2 className="w-4 h-4 animate-spin" />
                 <span>{t.terminal.processing}</span>
               </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t-4 border-white bg-black">
          <div className="flex gap-2">
            <span className="text-brutal-green font-mono py-3 font-bold">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder={t.terminal.placeholder}
              className="flex-1 bg-transparent text-white font-mono placeholder-gray-600 focus:outline-none py-3"
            />
            <button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
              className="bg-white text-black px-4 py-2 font-bold hover:bg-brutal-green disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
