import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "OPENAI_API_KEY não encontrada na Vercel." },
        { status: 500 }
      );
    }

    const client = new OpenAI({ apiKey });

    const body = await req.json();
    const { type, theme, title, words, depth, quantity } = body;

    let prompt = "";

    if (type === "titles") {
      prompt = `
Aja como especialista em títulos virais para YouTube, no estilo Thought Vortex.

Tema: ${theme || "comportamento humano, evolução, psicologia e curiosidades ancestrais"}.

Crie ${quantity || 20} títulos em português brasileiro.

Entregue em lista numerada.
Para cada título, inclua:
Título:
Potencial viral:
Mistério central:
`;
    }

    if (type === "script") {
      prompt = `
TÍTULO DO VÍDEO:
${title}

QUANTIDADE APROXIMADA DE PALAVRAS:
${words || 1800}

ESTILO:
${depth || "equilibrado"}

Crie um roteiro completo em português brasileiro, pronto para narração, no estilo de canais dark educativos animados.

Não use tópicos, capítulos, títulos internos ou marcações de cena.

Use mistério, passado ancestral, explicação científica simples, contraste moderno, consequência inesperada e final emocional.
`;
    }

    if (type === "prompt") {
      prompt = `
Crie um prompt profissional para gerar vídeos no estilo Thought Vortex sobre o tema: ${theme || "comportamento humano"}.
`;
    }

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: prompt
    });

    return Response.json({ result: response.output_text });
  } catch (error: any) {
    return Response.json(
      {
        error:
          error?.message ||
          "Erro ao gerar conteúdo. Verifique sua chave da API."
      },
      { status: 500 }
    );
  }
}
