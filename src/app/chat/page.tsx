"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  IconSend,
  IconPaperclip,
  IconMoodSmile,
  IconPhone,
  IconVideo,
  IconDots,
  IconSearch,
  IconBubble,
  IconCheck,
  IconChecks,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
  avatar?: string;
  senderName: string;
  status?: "sent" | "delivered" | "read";
  isAnimating?: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
}

const mockContacts: ChatContact[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "/avatars/alice.jpg",
    lastMessage: "Hey! How are you doing?",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "/avatars/bob.jpg",
    lastMessage: "Let's schedule a meeting for tomorrow",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "3",
    name: "Carol Davis",
    avatar: "/avatars/carol.jpg",
    lastMessage: "Thanks for the help!",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 1,
    isOnline: true,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hey! How are you doing?",
    sender: "other",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    senderName: "Alice Johnson",
    avatar: "/avatars/alice.jpg",
  },
  {
    id: "2",
    content: "I'm doing great! Just working on some new features for our app.",
    sender: "user",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    senderName: "You",
    status: "read",
  },
  {
    id: "3",
    content: "That sounds exciting! What kind of features are you working on?",
    sender: "other",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    senderName: "Alice Johnson",
    avatar: "/avatars/alice.jpg",
  },
  {
    id: "4",
    content:
      "We're implementing a new chat system with real-time messaging and file sharing capabilities. It's going to be amazing!",
    sender: "user",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    senderName: "You",
    status: "delivered",
  },
];

export default function ChatPage() {
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(
    mockContacts[0],
  );
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    let typingTimer: NodeJS.Timeout;
    if (isTyping) {
      setShowTypingIndicator(true);
      typingTimer = setTimeout(() => {
        setShowTypingIndicator(false);
        setIsTyping(false);
      }, 3000);
    }
    return () => clearTimeout(typingTimer);
  }, [isTyping]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
      senderName: "You",
      status: "sent",
      isAnimating: true,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Focus back to input
    inputRef.current?.focus();

    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id
            ? { ...msg, status: "delivered", isAnimating: false }
            : msg,
        ),
      );
    }, 1000);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, status: "read" } : msg,
        ),
      );
    }, 2000);

    // Simulate typing response
    setTimeout(() => {
      setIsTyping(true);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatLastMessageTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Typing indicator component
  const TypingIndicator = () => (
    <div className="flex gap-3 animate-in slide-in-from-left-2 duration-300">
      <Avatar className="h-8 w-8 mt-1">
        <AvatarImage
          src={selectedContact?.avatar}
          alt={selectedContact?.name}
        />
        <AvatarFallback>
          {selectedContact?.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="bg-muted rounded-lg px-4 py-3 max-w-[70%]">
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce
              [animation-delay:-0.3s]"
          ></div>
          <div
            className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce
              [animation-delay:-0.15s]"
          ></div>
          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );

  // Message status icon component
  const MessageStatus = ({ status }: { status?: string }) => {
    if (!status) return null;

    switch (status) {
      case "sent":
        return <IconCheck className="h-4 w-4 text-muted-foreground" />;
      case "delivered":
        return <IconChecks className="h-4 w-4 text-muted-foreground" />;
      case "read":
        return <IconChecks className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full gap-4">
      {/* Contacts Sidebar */}
      <Card className="w-80 flex flex-col bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-xl rounded-2xl py-4 md:py-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Messages</CardTitle>
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <div className="space-y-1">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={cn(
                  `flex items-center gap-3 p-3 cursor-pointer transition-all duration-200
                  ease-in-out`,
                  "hover:bg-muted/50 hover:scale-[1.02] active:scale-[0.98]",
                  "border-l-2 border-transparent hover:border-primary/20",
                  selectedContact?.id === contact.id &&
                    "bg-muted border-l-primary",
                )}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {contact.isOnline && (
                    <div
                      className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background
                        rounded-full"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm truncate">
                      {contact.name}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatLastMessageTime(contact.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.lastMessage}
                    </p>
                    {contact.unreadCount > 0 && (
                      <Badge
                        variant="destructive"
                        className="h-5 w-5 p-0 flex items-center justify-center text-xs"
                      >
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-xl rounded-2xl py-4 md:py-6">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={selectedContact.avatar}
                        alt={selectedContact.name}
                      />
                      <AvatarFallback>
                        {selectedContact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {selectedContact.isOnline && (
                      <div
                        className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background
                          rounded-full"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedContact.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedContact.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <IconPhone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <IconVideo className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <IconDots className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <Separator />
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-auto p-4 space-y-3 scroll-smooth">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 animate-in slide-in-from-bottom-2 duration-300",
                    message.sender === "user" && "flex-row-reverse",
                    message.isAnimating && "animate-pulse",
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {message.sender === "other" && (
                    <Avatar className="h-8 w-8 mt-1 ring-2 ring-background shadow-sm">
                      <AvatarImage
                        src={message.avatar}
                        alt={message.senderName}
                      />
                      <AvatarFallback>
                        {message.senderName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col max-w-[70%]">
                    <div
                      className={cn(
                        `rounded-full px-4 py-3 shadow-sm transition-all duration-200 backdrop-blur-lg
                          border`,
                        "hover:shadow-md transform hover:scale-[1.02]",
                        message.sender === "user"
                          ? `bg-gradient-to-r from-primary to-black/30 dark:to-white/70
                            text-primary-foreground rounded-br-md `
                          : "bg-muted/70 rounded-bl-md border-border/50",
                      )}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-1 mt-1 px-1",
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start",
                      )}
                    >
                      <span
                        className={cn(
                          "text-xs",
                          message.sender === "user"
                            ? "text-muted-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {formatTime(message.timestamp)}
                      </span>
                      {message.sender === "user" && (
                        <MessageStatus status={message.status} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {showTypingIndicator && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Message Input */}
            <div className="p-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-muted/80 transition-colors duration-200"
                >
                  <IconPaperclip className="h-6 w-6" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={cn(
                      "resize-none rounded-full border-2 transition-all duration-200",
                      "focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                      "bg-black/10 hover:bg-muted/80 px-4 py-6",
                    )}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-muted/80 transition-colors duration-200"
                >
                  <IconMoodSmile className="h-6 w-6" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={cn(
                    "rounded-full transition-all duration-200",
                    "hover:scale-105 active:scale-95",
                    !newMessage.trim()
                      ? "opacity-50 cursor-not-allowed"
                      : "shadow-lg hover:shadow-xl",
                  )}
                >
                  <IconSend className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <IconBubble className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a contact to start messaging
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
