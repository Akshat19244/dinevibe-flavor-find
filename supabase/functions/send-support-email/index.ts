
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SupportEmailRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message }: SupportEmailRequest = await req.json();

    // Here you would integrate with your email service
    // For now, we'll simulate the email sending
    console.log('Support email received:', { name, email, phone, subject, message });

    // Simulate email to admin
    const adminEmailContent = `
      New support message from DineVibe:
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Subject: ${subject}
      
      Message:
      ${message}
      
      Please respond to this customer promptly.
    `;

    // Simulate confirmation email to user
    const userEmailContent = `
      Dear ${name},
      
      Thank you for contacting DineVibe support. We have received your message regarding "${subject}".
      
      Our team will review your inquiry and respond within 24 hours. If this is urgent, please call us at +91 9904960670.
      
      Your message:
      ${message}
      
      Best regards,
      DineVibe Support Team
      Email: dinevibe29@gmail.com
      Phone: +91 9904960670
    `;

    console.log('Admin email content:', adminEmailContent);
    console.log('User confirmation email:', userEmailContent);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Support email sent successfully',
      adminNotified: true,
      userConfirmed: true
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-support-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
