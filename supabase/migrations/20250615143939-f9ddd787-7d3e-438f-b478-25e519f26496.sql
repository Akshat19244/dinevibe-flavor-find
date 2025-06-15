
-- Create chat conversations table
CREATE TABLE public.chat_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id UUID REFERENCES auth.users NOT NULL,
  owner_id UUID NOT NULL,
  booking_id UUID REFERENCES reservations(id),
  venue_name TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat messages table
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('customer', 'owner', 'admin')),
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chat_conversations
CREATE POLICY "Users can view their own conversations"
  ON public.chat_conversations
  FOR SELECT
  USING (
    auth.uid() = customer_id OR 
    auth.uid() = owner_id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Users can create conversations"
  ON public.chat_conversations
  FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Users can update their conversations"
  ON public.chat_conversations
  FOR UPDATE
  USING (
    auth.uid() = customer_id OR 
    auth.uid() = owner_id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- RLS Policies for chat_messages
CREATE POLICY "Users can view messages in their conversations"
  ON public.chat_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chat_conversations 
      WHERE id = conversation_id 
      AND (
        customer_id = auth.uid() OR 
        owner_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
      )
    )
  );

CREATE POLICY "Users can send messages in their conversations"
  ON public.chat_messages
  FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM chat_conversations 
      WHERE id = conversation_id 
      AND (customer_id = auth.uid() OR owner_id = auth.uid())
    )
  );

CREATE POLICY "Admins can send messages in any conversation"
  ON public.chat_messages
  FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Users can update message read status"
  ON public.chat_messages
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM chat_conversations 
      WHERE id = conversation_id 
      AND (
        customer_id = auth.uid() OR 
        owner_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
      )
    )
  );

-- Enable realtime for chat tables
ALTER PUBLICATION supabase_realtime ADD TABLE chat_conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;

-- Set replica identity for realtime updates
ALTER TABLE chat_conversations REPLICA IDENTITY FULL;
ALTER TABLE chat_messages REPLICA IDENTITY FULL;

-- Create function to get unread message count
CREATE OR REPLACE FUNCTION get_unread_message_count(user_uuid UUID)
RETURNS INTEGER
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT COUNT(*)::INTEGER
  FROM chat_messages cm
  JOIN chat_conversations cc ON cm.conversation_id = cc.id
  WHERE cm.is_read = false 
    AND cm.sender_id != user_uuid
    AND (cc.customer_id = user_uuid OR cc.owner_id = user_uuid);
$$;
