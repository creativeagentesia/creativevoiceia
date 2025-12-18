import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  whatsapp: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, whatsapp, message }: ContactFormData = await req.json();

    console.log("Received contact form submission:", { name, email, whatsapp });

    // Format date and time in Brazilian format
    const now = new Date();
    const dateTime = now.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8b5cf6, #6366f1); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #6366f1; }
          .value { margin-top: 5px; padding: 10px; background: white; border-radius: 5px; border: 1px solid #e5e7eb; }
          .footer { margin-top: 20px; font-size: 12px; color: #6b7280; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Novo Contato do Site</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">CreativeVoiceIA</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">📅 Data e Hora:</div>
              <div class="value">${dateTime}</div>
            </div>
            <div class="field">
              <div class="label">👤 Nome:</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">📧 E-mail:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">📱 WhatsApp:</div>
              <div class="value">${whatsapp}</div>
            </div>
            <div class="field">
              <div class="label">💬 Mensagem:</div>
              <div class="value">${message}</div>
            </div>
          </div>
          <div class="footer">
            Este email foi enviado automaticamente pelo formulário de contato do site CreativeVoiceIA.
          </div>
        </div>
      </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "CreativeVoiceIA <onboarding@resend.dev>",
        to: ["tonyfontes@gmail.com"],
        subject: "Contact from CreativeVoiceIA Website Form",
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailResponse = await res.json();
    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
