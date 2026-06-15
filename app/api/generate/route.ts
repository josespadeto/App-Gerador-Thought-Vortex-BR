import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, theme, title, words, depth, quantity } = body;

    let prompt = "";

    if (type === "titles") {
      prompt = `
Aja como especialista em títulos virais para YouTube, no estilo Thought Vortex.

Tema: ${theme || "comportamento humano, evolução, psicologia e curiosidades ancestrais"}.

Crie ${quantity || 20} títulos em português brasileiro.

Cada título deve parecer simples, mas esconder uma descoberta profunda sobre humanos, evolução, cérebro, instintos, animais, sociedade ou sobrevivência.

Os títulos devem ter:
- curiosidade imediata;
- potencial de clique;
- linguagem simples;
- contraste entre passado e presente;
- potencial visual para thumbnail;
- ideia forte para vídeo de 8 a 12 minutos.

Evite temas copiados diretamente do Thought Vortex.

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

Aja como roteirista especialista em canais dark educativos animados semelhantes ao Thought Vortex.

Crie um roteiro completo em português brasileiro, pronto para narração.

Não use tópicos, títulos internos, capítulos, enumerações ou marcações de cena.

O roteiro deve parecer uma investigação fascinante sobre natureza humana, evolução, cérebro, instintos, animais, psicologia ou hábitos modernos.

Antes de escrever, identifique silenciosamente:
1. Qual comportamento moderno está sendo explicado.
2. Qual adaptação ancestral originou esse comportamento.
3. Qual vantagem ela ofereceu no passado.
4. Qual consequência ela produz hoje.
5. Qual verdade maior sobre a natureza humana será revelada no final.

Comece com uma frase forte, curiosa, provocativa ou contraintuitiva.

Não revele a resposta cedo demais.

Use mistério, passado ancestral, explicação científica simples, contraste com a vida moderna, consequência inesperada e virada emocional.

Inclua naturalmente frases de retenção como:
"Mas existe um detalhe que quase ninguém percebe..."
"Só que essa história começou muito antes..."
"Mas isso ainda não explica tudo..."
"E foi aí que algo inesperado aconteceu..."

Inclua uma CTA curta e natural na primeira metade do roteiro.

Inclua pelo menos uma evidência científica, arqueológica, antropológica, psicológica ou comportamental.

Finalize com uma cena cotidiana memorável e uma última frase curta, reflexiva e impactante.

Entregue apenas o roteiro final em texto corrido.
`;
    }

    if (type === "prompt") {
      prompt = `
Crie um prompt profissional para gerar vídeos no estilo Thought Vortex sobre o tema: ${theme || "comportamento humano"}.

O prompt deve servir para criar títulos, thumbnails e roteiro narrativo de alta retenção.
`;
    }

    const response = await client.responses.create({
      model: "gpt-5.5",
      input: prompt
    });

    return Response.json({ result: response.output_text });
  } catch (error) {
    return Response.json(
      { error: "Erro ao gerar conteúdo. Verifique sua chave da API." },
      { status: 500 }
    );
  }
}
