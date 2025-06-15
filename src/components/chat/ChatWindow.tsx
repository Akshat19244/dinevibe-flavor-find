
import React, { useEffect, useRef, useState } from "react";
import { ChatMessage, getMessages, sendMessage, subscribeToMessages, markMessagesRead } from "@/services/chatService";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

interface ChatWindowProps {
  conversationId: string;
  currentUserId: string;
  userRole: "customer" | "owner" | "admin";
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  conversationId,
  currentUserId,
  userRole,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let unsub: (() => void) | undefined;

    async function load() {
      setLoading(true);
      const msgs = await getMessages(conversationId);
      setMessages(msgs);
      setLoading(false);
      unsub = subscribeToMessages(conversationId, (msg: ChatMessage) => {
        setMessages((curr) => [...curr, msg]);
      });
      await markMessagesRead(conversationId, currentUserId);
    }
    load();

    return () => {
      unsub?.();
    };
  }, [conversationId, currentUserId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;
    await sendMessage(conversationId, currentUserId, userRole, input.trim());
    setInput("");
  };

  return (
    <Card className="fixed right-4 bottom-4 z-50 max-w-lg w-full max-h-[70vh] shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Chat</CardTitle>
        <Button size="sm" variant="ghost" onClick={onClose}>
          Close
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div
          className="flex-1 overflow-y-auto border rounded bg-muted p-2 h-72 mb-2"
          ref={scrollRef}
          style={{ minHeight: 240, maxHeight: 320 }}
        >
          {loading ? (
            <div>Loading messages...</div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col mb-2 ${
                  msg.sender_id === currentUserId
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <div
                  className={`rounded px-3 py-2 text-sm ${
                    msg.sender_id === currentUserId
                      ? "bg-green-100 text-right"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.message}
                </div>
                <span className="text-xs text-gray-500 mt-0.5">
                  {msg.sender_type}
                  {" · "}
                  {new Date(msg.created_at).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading || input.trim() === ""}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatWindow;
