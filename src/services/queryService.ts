import { supabase } from "@/integrations/supabase/client";

export type QueryRequest = {
  id: string;
  query_token: string;
  customer_id: string;
  venue_id?: string;
  event_type: string;
  location: string;
  guest_count: number;
  budget_min?: number;
  budget_max?: number;
  event_date: string;
  event_time?: string;
  special_requirements?: string;
  status: 'pending' | 'responded' | 'accepted' | 'declined' | 'expired';
  created_at: string;
  updated_at: string;
  response_deadline?: string;
  vendor_response?: string;
  vendor_response_at?: string;
};

export type QueryResponse = {
  id: string;
  query_id: string;
  vendor_id: string;
  response_type: 'accept' | 'reject' | 'counter';
  message?: string;
  quoted_price?: number;
  terms_conditions?: string;
  availability_confirmed: boolean;
  created_at: string;
};

export type CreateQueryRequest = {
  event_type: string;
  location: string;
  guest_count: number;
  budget_min?: number;
  budget_max?: number;
  event_date: string;
  event_time?: string;
  special_requirements?: string;
  venue_id?: string;
};

export type CreateQueryResponse = {
  query_id: string;
  response_type: 'accept' | 'reject' | 'counter';
  message?: string;
  quoted_price?: number;
  terms_conditions?: string;
  availability_confirmed?: boolean;
};

// Generate a query token
export async function generateQueryToken(): Promise<string> {
  const { data, error } = await supabase.rpc('generate_query_token');
  if (error) throw error;
  return data;
}

// Create a new query request
export async function createQueryRequest(queryData: CreateQueryRequest): Promise<QueryRequest> {
  const token = await generateQueryToken();
  
  const { data, error } = await supabase
    .from('query_requests')
    .insert([
      {
        query_token: token,
        customer_id: (await supabase.auth.getUser()).data.user?.id,
        ...queryData,
        response_deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data as QueryRequest;
}

// Get customer's query requests
export async function getCustomerQueries(): Promise<QueryRequest[]> {
  const { data, error } = await supabase
    .from('query_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as QueryRequest[];
}

// Get vendor's received queries
export async function getVendorQueries(): Promise<QueryRequest[]> {
  const { data, error } = await supabase
    .from('query_requests')
    .select(`
      *,
      venues!inner(owner_id)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as QueryRequest[];
}

// Get query by token
export async function getQueryByToken(token: string): Promise<QueryRequest | null> {
  const { data, error } = await supabase
    .from('query_requests')
    .select('*')
    .eq('query_token', token)
    .maybeSingle();

  if (error) throw error;
  return data as QueryRequest | null;
}

// Create vendor response to query
export async function createQueryResponse(responseData: CreateQueryResponse): Promise<QueryResponse> {
  const { data, error } = await supabase
    .from('query_responses')
    .insert([
      {
        ...responseData,
        vendor_id: (await supabase.auth.getUser()).data.user?.id,
      }
    ])
    .select()
    .single();

  if (error) throw error;

  // Update query status
  await supabase
    .from('query_requests')
    .update({ 
      status: responseData.response_type === 'accept' ? 'accepted' : 'responded',
      vendor_response: responseData.message,
      vendor_response_at: new Date().toISOString()
    })
    .eq('id', responseData.query_id);

  return data as QueryResponse;
}

// Get responses for a query
export async function getQueryResponses(queryId: string): Promise<QueryResponse[]> {
  const { data, error } = await supabase
    .from('query_responses')
    .select('*')
    .eq('query_id', queryId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as QueryResponse[];
}

// Update query status
export async function updateQueryStatus(queryId: string, status: QueryRequest['status']): Promise<void> {
  const { error } = await supabase
    .from('query_requests')
    .update({ status })
    .eq('id', queryId);

  if (error) throw error;
}