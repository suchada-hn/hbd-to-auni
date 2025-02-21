
import { useState } from "react";
import PostIt from "@/components/PostIt";
import MessageForm from "@/components/MessageForm";
import { motion } from "framer-motion";

interface Message {
  id: number;
  author: string;
  message: string;
  color: string;
  createdAt: string;
  emoji: string;
  decoration: string;
}

const COLORS = [
  "bg-postit-peach",
  "bg-postit-mint",
  "bg-postit-lavender",
  "bg-postit-rose",
  "bg-postit-yellow",
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      author: "Sarah",
      message: "Happy birthday Auni! 🎉 Wishing you the most amazing day filled with joy and laughter!",
      color: "bg-postit-peach",
      createdAt: "Just now",
      emoji: "✨",
      decoration: "sparkles",
    },
  ]);

  const handleNewMessage = ({ 
    author, 
    message, 
    emoji, 
    decoration 
  }: { 
    author: string; 
    message: string;
    emoji: string;
    decoration: string;
  }) => {
    const newMessage = {
      id: Date.now(),
      author,
      message,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      createdAt: "Just now",
      emoji,
      decoration,
    };
    setMessages([newMessage, ...messages]);
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-indigo-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Happy Birthday, Auni! 🎂</h1>
        <p className="text-gray-600 text-lg">Share your birthday wishes on the wall below</p>
        <p className="text-rose-500 font-medium mt-2">{messages.length} messages received</p>
      </motion.div>

      <div className="max-w-4xl mx-auto mb-12">
        <MessageForm onSubmit={handleNewMessage} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="animate-float"
            >
              <PostIt {...message} onDelete={handleDeleteMessage} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
