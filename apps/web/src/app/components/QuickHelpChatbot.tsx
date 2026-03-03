import { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '@/i18n/useTranslation';
import { LocalizedLink } from './LocalizedLink';
import {
  QUICK_HELP_ITEMS,
  QUICK_HELP_GREETING,
  QUICK_HELP_CONTACT_EMAIL,
  type QuickHelpItem,
} from '@/content/quickHelp';

const SU_LOGO = '/brand/stellenbosch/su-logo-primary.jpeg';
const SESSION_KEY_OPEN = 'quickhelp-open';
const SESSION_KEY_MESSAGES = 'quickhelp-messages';

type MessageRole = 'user' | 'bot';

interface ChatMessage {
  role: MessageRole;
  text: string;
  links?: { label: string; path: string }[];
}

function getStoredOpen(): boolean {
  try {
    const v = sessionStorage.getItem(SESSION_KEY_OPEN);
    return v === '1';
  } catch {
    return false;
  }
}

function setStoredOpen(open: boolean): void {
  try {
    sessionStorage.setItem(SESSION_KEY_OPEN, open ? '1' : '0');
  } catch {}
}

function getStoredMessages(): ChatMessage[] | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY_MESSAGES);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ChatMessage[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function setStoredMessages(messages: ChatMessage[]): void {
  try {
    sessionStorage.setItem(SESSION_KEY_MESSAGES, JSON.stringify(messages));
  } catch {}
}

export function QuickHelpChatbot() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(getStoredOpen);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const stored = getStoredMessages();
    if (stored && stored.length > 0) return stored;
    return [{ role: 'bot', text: QUICK_HELP_GREETING }];
  });
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const showMenu = messages.length === 1 && messages[0].role === 'bot';

  useEffect(() => {
    setStoredOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setStoredMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    closeButtonRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const panel = panelRef.current;
    const focusables = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    panel.addEventListener('keydown', handleKeyDown);
    return () => panel.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, messages]);

  const handleChip = (item: QuickHelpItem) => {
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: item.question },
      {
        role: 'bot',
        text: item.answer,
        links: item.links.length > 0 ? item.links : undefined,
      },
    ]);
  };

  const backToMenu = () => {
    setMessages([{ role: 'bot', text: QUICK_HELP_GREETING }]);
  };

  const clearChat = () => {
    setMessages([{ role: 'bot', text: QUICK_HELP_GREETING }]);
  };

  const contactUs = () => {
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: 'Contact us' },
      {
        role: 'bot',
        text: 'Get in touch via our Contact page for enquiries, office hours, and forms.',
        links: [{ label: 'Contact', path: '/contact' }],
      },
    ]);
  };

  const renderAnswerLinks = (links: { label: string; path: string }[]) => {
    return (
      <div className="mt-2 flex flex-wrap gap-2">
        {links.map((link, i) => {
          const isExternal = link.path.startsWith('mailto:') || link.path.startsWith('http');
          if (isExternal) {
            return (
              <a
                key={i}
                href={link.path}
                className="text-[#C8A951] hover:text-[#C8A951]/90 underline underline-offset-2 text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            );
          }
          return (
            <LocalizedLink
              key={i}
              to={link.path}
              className="text-[#C8A951] hover:text-[#C8A951]/90 underline underline-offset-2 text-sm font-medium"
              onClick={close}
            >
              {link.label}
            </LocalizedLink>
          );
        })}
      </div>
    );
  };

  const replyWithEmail = (answer: string) => {
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+)/g;
    const parts = answer.split(emailRegex);
    const isEmail = (s: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(s);
    return (
      <>
        {parts.map((part, i) =>
          isEmail(part) ? (
            <a
              key={i}
              href={`mailto:${part}`}
              className="text-[#C8A951] hover:text-[#C8A951]/90 underline underline-offset-2"
            >
              {part}
            </a>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <>
      {/* Launcher button */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="fixed z-[100] rounded-full bg-[#7B1E3A] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#C8A951] focus:ring-offset-2 right-4 bottom-4 w-[52px] h-[52px] md:right-6 md:bottom-6 md:w-14 md:h-14"
        aria-label={t('quickHelp.openLabel')}
      >
        <img
          src={SU_LOGO}
          alt=""
          className="w-7 h-7 md:w-8 md:h-8 object-contain pointer-events-none"
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-labelledby="quickhelp-title"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed z-[101] right-4 bottom-[72px] md:right-6 md:bottom-20 w-[calc(100vw-24px)] max-w-[400px] h-[520px] max-h-[70vh] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex-shrink-0 bg-[#7B1E3A] text-white px-4 py-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h2 id="quickhelp-title" className="font-['Spectral'] font-bold text-lg truncate">
                  {t('quickHelp.title')}
                </h2>
                <p className="text-white/80 text-xs truncate">
                  {t('quickHelp.subtitle')}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={clearChat}
                  className="text-white/80 hover:text-white text-xs px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label={t('quickHelp.clearChat')}
                >
                  {t('quickHelp.clearChat')}
                </button>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  className="p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label={t('common.close')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-[#7B1E3A] text-white'
                        : 'bg-card border border-border text-foreground'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">
                      {msg.role === 'bot' && msg.text.includes(QUICK_HELP_CONTACT_EMAIL)
                        ? replyWithEmail(msg.text)
                        : msg.text}
                    </p>
                    {msg.role === 'bot' && msg.links && msg.links.length > 0 && (
                      <>{renderAnswerLinks(msg.links)}</>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Chips footer */}
            <div className="flex-shrink-0 p-4 pt-0 border-t border-border bg-card">
              {showMenu ? (
                <div className="flex flex-wrap gap-2">
                  {QUICK_HELP_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleChip(item)}
                      className="px-3 py-1.5 rounded-xl bg-muted hover:bg-[#7B1E3A] hover:text-white text-foreground text-xs font-medium border border-border transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-1"
                    >
                      {item.question}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={contactUs}
                    className="px-3 py-1.5 rounded-xl bg-muted hover:bg-[#7B1E3A] hover:text-white text-foreground text-xs font-medium border border-border transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-1"
                  >
                    {t('quickHelp.contactUs')}
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={backToMenu}
                    className="px-3 py-1.5 rounded-xl bg-[#7B1E3A] text-white text-xs font-medium hover:bg-[#7B1E3A]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-1"
                  >
                    {t('quickHelp.backToMenu')}
                  </button>
                  <button
                    type="button"
                    onClick={contactUs}
                    className="px-3 py-1.5 rounded-xl bg-muted hover:bg-[#7B1E3A] hover:text-white text-foreground text-xs font-medium border border-border transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-1"
                  >
                    {t('quickHelp.contactUs')}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
