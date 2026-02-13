import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request) {
  try {
    // 1. Recibimos lo que el usuario pidió desde el frontend
    const { contentType, context, tone } = await request.json();

    // 2. Construimos el system prompt 
    const systemPrompt = `You are an expert professional copywriter.
Your job is to generate high-quality content.
Always respond in the same language the user writes in.
The user will request a specific type of content and you 
generate it with the indicated tone. Be direct, don't add 
unnecessary explanations — just deliver the content ready to use.`;

    // 3. Construimos el mensaje del usuario con los datos del form
    const userMessage = `Generá el siguiente contenido:
- Tipo: ${contentType}
- Contexto/Detalles: ${context}
- Tono: ${tone}

Entregá solo el contenido final, listo para copiar y usar.`;

    // 4. Llamamos a la API de Claude 
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001', 
      max_tokens: 1024,
      system: systemPrompt,  
      messages: [
        { role: 'user', content: userMessage }
      ],
    });

    // 5. Extraemos el texto de la respuesta y lo devolvemos
    const generatedText = message.content[0].text;

    return Response.json({ result: generatedText });

  } catch (error) {
    console.error('Error llamando a Claude:', error);
    return Response.json(
      { error: 'Error generando contenido' },
      { status: 500 }
    );
  }
}