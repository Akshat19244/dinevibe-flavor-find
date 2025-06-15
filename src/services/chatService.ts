
import { supabase } from "@/integrations/supabase/client";

export type ChatConversation = {
  id: string;
  customer_id: string;
  owner_id: string;
  booking_id: string | null;
  venue_name: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

export type ChatMessage = {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_type: "customer" | "owner" | "admin";
  message: string;
  is_read: boolean;
  created_at: string;
};

export async function getUserConversations(userId: string) {
  const { data, error } = await supabase
    .from("chat_conversations")
    .select("*")
    .or(`customer_id.eq.${userId},owner_id.eq.${userId}`)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data as ChatConversation[];
}

export async function getConversationByBooking(bookingId: string) {
  const { data, error } = await supabase
    .from("chat_conversations")
    .select("*")
    .eq("booking_id", bookingId)
    .maybeSingle();
  if (error) throw error;
  return data as ChatConversation | null;
}

export async function createConversation(
  bookingId: string,
  customer_id: string,
  owner_id: string,
  venue_name: string
) {
  const { data, error } = await supabase
    .from("chat_conversations")
    .insert([
      {
        booking_id: bookingId,
        customer_id,
        owner_id,
        venue_name,
      },
    ])
    .select()
    .single();
  if (error) throw error;
  return data as ChatConversation;
}

export async function getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at");
  if (error) throw error;
  return data as ChatMessage[];
}

export async function sendMessage(
  conversationId: string,
  sender_id: string,
  sender_type: "customer" | "owner" | "admin",
  message: string
) {
  const { data, error } = await supabase
    .from("chat_messages")
    .insert([
      {
        conversation_id: conversationId,
        sender_id,
        sender_type,
        message,
      },
    ])
    .select()
    .single();
  if (error) throw error;
  return data as ChatMessage;
}

export function subscribeToMessages(
  conversationId: string,
  cb: (msg: ChatMessage) => void
) {
  const channel = supabase.channel(`chat-${conversationId}`);
  channel
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "chat_messages", filter: `conversation_id=eq.${conversationId}` },
      (payload) => {
        if (payload.new) {
          cb(payload.new as ChatMessage);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export async function markMessagesRead(conversationId: string, userId: string) {
  // Mark all messages not by this user as read
  await supabase
    .from("chat_messages")
    .update({ is_read: true })
    .eq("conversation_id", conversationId)
    .neq("sender_id", userId);
}
