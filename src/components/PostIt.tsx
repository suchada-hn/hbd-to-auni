import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EMOJIS } from "./MessageForm";

interface PostItProps {
  message: string;
  author_name: string;
  color: string;
  createdAt: string;
  id: number;
  emoji: string;
  songUrl?: string;
  decoration: string;
  onDelete: () => void;
}

const PostIt = ({
  message,
  author_name,
  color,
  createdAt,
  id,
  emoji,
  songUrl,
  decoration,
  onDelete,
}: PostItProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleDelete = async () => {
    setIsVisible(false);
    await new Promise((resolve) => setTimeout(resolve, 300));
    onDelete();
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (songUrl && audioRef.current) {
      if (isExpanded) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const renderDecorations = () => {
    switch (Math.floor(Math.random() * 3) + 1) {
      case 0:
        // case "stars":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-500 opacity-30"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: isHovered ? [0.5, 1.2, 1] : 0.5,
                  opacity: isHovered ? [0, 1, 0.3] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              >
                ⭐
              </motion.div>
            ))}
          </div>
        );
      case 1:
        // case "sparkles":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-purple-500 opacity-30"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: isHovered ? [0.5, 1.2, 1] : 0.5,
                  opacity: isHovered ? [0, 1, 0.3] : 0,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        );
      case 2:
        // case "hearts":
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-rose-500 opacity-30"
                initial={{ scale: 0.5, opacity: 0, y: 0 }}
                animate={{
                  scale: isHovered ? [0.5, 1.2, 1] : 0.5,
                  opacity: isHovered ? [0, 1, 0.3] : 0,
                  y: isHovered ? -20 : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              >
                💖
              </motion.div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-lg bg-opacity-50 shadow-lg backdrop-blur-sm hover:scale-105 transform transition-all duration-300 relative group cursor-pointer`}
            style={{ maxWidth: "300px", backgroundColor: color }}
            onClick={() => setShowOverlay(true)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {renderDecorations()}
            <div className="absolute -rotate-6 top-0 right-0 text-3xl">
              {EMOJIS[Math.floor(Math.random() * 10) + 1]}
            </div>
            <motion.p className="text-gray-800 mb-4 font-['Caveat',cursive] text-xl leading-relaxed relative z-10">
              {message.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.03,
                    duration: 0.5,
                  }}
                  whileHover={{
                    y: -2,
                    transition: { duration: 0.2 },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 font-['Caveat',cursive] text-lg">
                ~ {author_name}
              </p>
            </div>
            <div className="text-xs text-gray-400 mt-2">{createdAt}</div>
            <div className="flex gap-2">
              {/* <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLiked(!isLiked);
                  }}
                  className="text-rose-500 hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                  />
                </button> */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="m-1 text-gray-500 hover:text-red-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showOverlay} onOpenChange={setShowOverlay}>
        <DialogContent className="sm:max-w-[800px] bg-transparent border-none shadow-none">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative p-12 rounded-xl bg-black/20 backdrop-blur-lg"
          >
            <button
              onClick={() => setShowOverlay(false)}
              className="absolute right-4 top-4 text-white/80 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-4 text-4xl absolute top-3 left-3">
              {EMOJIS[Math.floor(Math.random() * 10) + 1]}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl text-center font-['Caveat',cursive] text-white leading-relaxed"
            >
              {message.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.04,
                    type: "spring",
                    damping: 10,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: message.length * 0.04 }}
              className="text-2xl text-white/80 text-right mt-6 font-['Caveat',cursive]"
            >
              ~ {author_name}
            </motion.p>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostIt;
