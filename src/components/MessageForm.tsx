
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Smile, Sparkles, Star } from "lucide-react";

interface MessageFormProps {
  onSubmit: (message: { 
    author: string; 
    message: string; 
    emoji: string;
    decoration: string;
  }) => void;
}

const EMOJIS = ["✨", "🎂", "🎉", "🎈", "🎁", "💝", "🌟", "🦋", "🌸", "🌺"];
const DECORATIONS = ["stars", "sparkles", "hearts", "none"];

const MessageForm = ({ onSubmit }: MessageFormProps) => {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("✨");
  const [decoration, setDecoration] = useState("none");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both name and message are required",
        variant: "destructive",
      });
      return;
    }
    onSubmit({ 
      author, 
      message, 
      emoji: selectedEmoji,
      decoration,
    });
    setAuthor("");
    setMessage("");
    toast({
      title: "Message sent!",
      description: "Your birthday wish has been added to the wall",
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl backdrop-blur-sm bg-white/30 shadow-xl max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Leave a Birthday Wish</h2>
      <div className="space-y-4">
        <div>
          <Input
            placeholder="Your name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="bg-white/50"
          />
        </div>
        <div>
          <Textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-white/50 min-h-[100px] font-['Caveat',cursive] text-lg"
          />
        </div>
        <div className="flex flex-wrap gap-2 p-2 bg-white/50 rounded-lg">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setSelectedEmoji(emoji)}
              className={`p-2 rounded-full hover:bg-white/50 transition-all ${
                selectedEmoji === emoji ? "bg-white shadow-md scale-110" : ""
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {DECORATIONS.map((dec) => (
            <button
              key={dec}
              type="button"
              onClick={() => setDecoration(dec)}
              className={`p-2 rounded-lg flex items-center gap-1 ${
                decoration === dec ? "bg-white shadow-md" : "bg-white/50"
              }`}
            >
              {dec === "stars" && <Star className="w-4 h-4" />}
              {dec === "sparkles" && <Sparkles className="w-4 h-4" />}
              {dec === "hearts" && <Smile className="w-4 h-4" />}
              {dec === "none" && "None"}
            </button>
          ))}
        </div>
        <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600">
          Send Wish ✨
        </Button>
      </div>
    </motion.form>
  );
};

export default MessageForm;
