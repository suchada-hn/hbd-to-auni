import { useState, useEffect } from "react";
import PostIt from "@/components/PostIt";
import MessageForm from "@/components/MessageForm";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Typewriter } from "@/components/ui/typewriter";
// import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { supabase } from "@/integrations/supabase/client";
import { TextEffect } from "@/components/ui/text-effect";
import { useToast } from "@/components/ui/use-toast";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

interface Message {
  id: number;
  author_name: string;
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

const getRandomPosition = () => ({
  top: `${Math.random() * 70 + 15}%`,
  left: `${Math.random() * 70 + 15}%`,
});

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "birthday_messages",
        },
        () => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [showForm]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("birthday_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load messages. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: {
    message: string;
    color?: string;
    authorName: string;
    story?: string;
    meetingDetails?: string;
    location?: string;
    songUrl?: string;
  }) => {
    try {
      const { error } = await supabase.from("birthday_messages").insert([
        {
          message: formData.message,
          color: formData?.color,
          author_name: formData.authorName,
          story: formData?.story,
          meeting_details: formData.meetingDetails,
          location: formData.location,
          song_url: formData.songUrl,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your message has been posted.",
      });

      setShowForm(false);
      fetchMessages();
    } catch (error) {
      console.error("Error adding message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post your message. Please try again.",
      });
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const { error } = await supabase
        .from("birthday_messages")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Message deleted successfully.",
      });
    } catch (error) {
      console.error("Error removing message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the message. Please try again.",
      });
    }
  };
  return (
    <BackgroundBeamsWithCollision className="min-h-screen bg-gradient-to-br from-rose-50 to-indigo-50 py-12 px-4 flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.p className="text-gray-800 mb-4 font-['Caveat',cursive] text-6xl leading-relaxed relative z-10">
          🎂{" "}
          {/* {"Happy Birthday, Auni!".split("").map((char, index) => (
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
          ))} */}
          <TextEffect
            per="char"
            preset="scale"
            className="text-4xl md:text-6xl font-bold mb-4 text-slate-800"
          >
            Happy Birthday, Auni!
          </TextEffect>
        </motion.p>
        <h1 className="text-5xl font-bold text-gray-800 mb-4"></h1>
        <div className="flex items-center justify-center gap-2 text-lg text-gray-600">
          <span>Share your</span>
          <Typewriter
            text={[
              "birthday wishes",
              "heartfelt messages",
              "loving thoughts",
              "sweet memories",
            ]}
            speed={70}
            className="text-rose-500 font-semibold inline-block"
            waitTime={2000}
            deleteSpeed={40}
            cursorChar="_"
          />
        </div>
        {/* <p className="text-rose-500 font-medium mt-2">{messages.length} messages received</p> */}
      </motion.div>
      <AnimatePresence>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="sm:max-w-[500px]">
            <MessageForm
              onSubmit={handleSubmit}
              onClose={() => setShowForm(false)}
            />
          </DialogContent>
        </Dialog>

        {/* {showForm && (
          <MessageForm
            onSubmit={handleSubmit}
            onClose={() => setShowForm(false)}
          />
        )} */}
      </AnimatePresence>
      <motion.button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 bg-rose-500 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:bg-rose-600 transition-colors z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-5 h-5 font-['Caveat',cursive]" />
        Happy Birthday to Auni
      </motion.button>
      {/* {loading ? (
        <div className="text-center text-slate-600">Loading messages...</div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          <AnimatePresence>
            {messages.map((message) => (
              // <PostItNote
              //   key={message.id}
              //   message={message.message}
              //   color={message.color}
              //   authorName={message.author_name}
              //   story={message.story}
              //   meetingDetails={message.meeting_details}
              //   location={message.location}
              //   songUrl={message.song_url}
              //   onRemove={() => handleRemove(message.id)}
              // />
              <PostIt
                {...message}
                onDelete={() => handleRemove(message.id.toString())}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )} */}
      {/* <div className="max-w-7xl mx-auto overflow-auto"> */}
      {/* <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4"> */}
      {loading ? (
        <div className="text-center text-slate-600">Loading messages...</div>
      ) : (
        <Floating sensitivity={0.5} className="overflow-hidden">
          {messages.map((message, index) => {
            const position = getRandomPosition();
            return (
              <FloatingElement
                key={message.id}
                depth={Math.random() * 2 + 0.5}
                className={`z-10`}
                style={{ top: position.top, left: position.left }}
              >
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="animate-float"
                >
                  <PostIt
                    {...message}
                    onDelete={() => handleRemove(message.id.toString())}
                  />
                </motion.div>
              </FloatingElement>
            );
          })}
        </Floating>
      )}
      {/* </div> */}
      {/* </div> */}
    </BackgroundBeamsWithCollision>
  );
};

export default Index;
