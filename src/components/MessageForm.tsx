import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Smile, Sparkles, Star } from "lucide-react";
interface MessageFormProps {
  onSubmit: (data: {
    message: string;
    color: string;
    authorName: string;
    story: string;
    meetingDetails: string;
    location: string;
    songUrl?: string;
  }) => void;
  onClose: () => void;
}

export const EMOJIS = [
  "✨",
  "🎂",
  "🎉",
  "🎈",
  "🎁",
  "💝",
  "🌟",
  "🦋",
  "🌸",
  "🌺",
];
const DECORATIONS = ["stars", "sparkles", "hearts", "none"];
const colors = [
  "#ffd1dc", // Light Pink
  "#ffb3ba", // Salmon Pink
  "#bae1ff", // Light Blue
  "#baffc9", // Light Green
  "#ffffba", // Light Yellow
  "#ffdfba", // Light Orange
  "#dcd3ff", // Light Purple
];

const MessageForm = ({ onSubmit, onClose }: MessageFormProps) => {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("✨");
  const [decoration, setDecoration] = useState("none");
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    message: "",
    color: colors[0],
    authorName: "",
    story: "",
    meetingDetails: "",
    location: "",
    songUrl: "",
  });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!author.trim() || !message.trim()) {
  //     toast({
  //       title: "Please fill in all fields",
  //       description: "Both name and message are required",
  //       variant: "destructive",
  //     });
  //     return;
  //   }
  //   onSubmit({
  //     author,
  //     message,
  //     emoji: selectedEmoji,
  //     decoration,
  //   });
  //   setAuthor("");
  //   setMessage("");
  //   toast({
  //     title: "Message sent!",
  //     description: "Your birthday wish has been added to the wall",
  //   });
  // };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl backdrop-blur-sm bg-white/30 shadow-xl max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Leave a Birthday Wish
      </h2>
      <div className="space-y-4">
        <div>
          <Input
            placeholder="Your name"
            // value={author}
            // onChange={(e) => setAuthor(e.target.value)}
            className="bg-white/50"
            value={formData.authorName}
            onChange={(e) =>
              setFormData({ ...formData, authorName: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Textarea
            placeholder="Write your message..."
            // value={message}
            // onChange={(e) => setMessage(e.target.value)}

            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            className="bg-white/50 min-h-[100px] font-['Caveat',cursive] text-lg"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                formData.color === color ? "border-black" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setFormData({ ...formData, color })}
            />
          ))}
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
