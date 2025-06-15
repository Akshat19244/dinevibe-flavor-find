
import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import { getConversationByBooking, createConversation } from "@/services/chatService";
import { useAuth } from "@/contexts/AuthContext";

type UserChatPanelProps = {
  booking: {
    id: string;
    token: string;
    venue: string;
    venue_id?: string;
    owner_id?: string;
  };
  onClose?: () => void;
};

const UserChatPanel: React.FC<UserChatPanelProps> = ({ booking, onClose }) => {
  const { user } = useAuth();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    let cancelled = false;
    async function loadConversation() {
      setLoading(true);
      try {
        // Try to fetch or create the conversation
        let convo = await getConversationByBooking(booking.id);
        if (!convo && user && booking.owner_id) {
          convo = await createConversation(
            booking.id,
            user.id,
            booking.owner_id,
            booking.venue
          );
        }
        if (!cancelled) setConversationId(convo?.id || null);
      } catch (e) {
        // Optionally add error toast here
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadConversation();
    return () => { cancelled = true; };
    // only run when booking/user change
    // eslint-disable-next-line
  }, [booking.id, booking.owner_id, user]);

  if (loading || !conversationId || !user) return null;

  return (
    <ChatWindow
      conversationId={conversationId}
      currentUserId={user.id}
      userRole="customer"
      onClose={onClose || (() => {})}
    />
  );
};

export default UserChatPanel;
