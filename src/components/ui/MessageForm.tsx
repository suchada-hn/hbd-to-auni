import React from "react";
import { motion } from "framer-motion";
import { TextShimmer } from "./text-shimmer";
import { Button } from "@/components/ui/button";

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

const colors = [
  "#ffd1dc", // Light Pink
  "#ffb3ba", // Salmon Pink
  "#bae1ff", // Light Blue
  "#baffc9", // Light Green
  "#ffffba", // Light Yellow
  "#ffdfba", // Light Orange
  "#dcd3ff", // Light Purple
];

const EMOJIS = ["✨", "🎂", "🎉", "🎈", "🎁", "💝", "🌟", "🦋", "🌸", "🌺"];
const DECORATIONS = ["stars", "sparkles", "hearts", "none"];

export const MessageForm = ({ onSubmit, onClose }: MessageFormProps) => {
  const [formData, setFormData] = React.useState({
    message: "",
    color: colors[0],
    authorName: "",
    story: "",
    meetingDetails: "",
    location: "",
    songUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <TextShimmer className="text-2xl font-semibold mb-6">
          Leave a Birthday Message
        </TextShimmer>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Choose a color:
            </label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    formData.color === color
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData({ ...formData, color })}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full p-2 border rounded"
              value={formData.authorName}
              onChange={(e) =>
                setFormData({ ...formData, authorName: e.target.value })
              }
              required
            />

            <textarea
              placeholder="Your message for Auni"
              className="w-full p-2 border rounded h-24"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />

            <textarea
              placeholder="Share your favorite story about Auni"
              className="w-full p-2 border rounded h-24"
              value={formData.story}
              onChange={(e) =>
                setFormData({ ...formData, story: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="How/when/where did you meet Auni?"
              className="w-full p-2 border rounded"
              value={formData.meetingDetails}
              onChange={(e) =>
                setFormData({ ...formData, meetingDetails: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Your location"
              className="w-full p-2 border rounded"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />

            <input
              type="url"
              placeholder="Link to your favorite song (optional)"
              className="w-full p-2 border rounded"
              value={formData.songUrl}
              onChange={(e) =>
                setFormData({ ...formData, songUrl: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Post Message</Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
