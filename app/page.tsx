"use client";

import { useState } from "react";
import "./globals.css";

export default function Home() {
  const [theme, setTheme] = useState("");
  const [quantity, setQuantity] = useState(20);
  const [titles, setTitles] = useState("");
  const [title, setTitle] = useState("");
  const [words, setWords] = useState(1800);
  const [depth, setDepth] = useState("equilibrado");
  const [script, setScript] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState("");

  async function generate(type: string) {
    setLoading(type);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type,
        theme,
        quantity,
        title,
        words,
        depth
      })
    });

    const data = await res.json();

    if (type === "titles") setTitles(data.result || data.error);
    if (type === "script") setScript(data.result || data.error);
    if (type === "prompt") setPrompt(data.result || data.error);

    setLoading("");
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    alert("Copiado!");
  }

  return (
    <main className="page">
      <section className="hero">
        <h1>Vortex Studio</h1>
        <p>Crie ideias, títulos e roteiros para vídeos dark educativos virais.</p>
      </section>

      <section className="card">
        <h2>1. Gerar títulos</h2>

        <label>Tema do vídeo ou nicho</label>
        <input
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Ex: medo, ansiedade, solidão, animais, evolução humana..."
        />

        <label>Quantidade de títulos</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <button onClick={() => generate("titles")}>
          {loading === "titles" ? "Gerando..." : "Gerar títulos"}
        </button>

        <textarea value={titles} readOnly placeholder="Os títulos aparecerão aqui..." />

        <button className="secondary" onClick={() => copy(titles)}>
          Copiar títulos
        </button>
      </section>

      <section className="card">
        <h2>2. Gerar roteiro</h2>

        <label>Título escolhido</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Cole aqui o melhor título gerado"
        />

        <label>Quantidade aproximada de palavras</label>
        <input
          type="number"
          value={words}
          onChange={(e) => setWords(Number(e.target.value))}
        />

        <label>Estilo</label>
        <select value={depth} onChange={(e) => setDepth(e.target.value)}>
          <option value="equilibrado">Equilibrado</option>
          <option value="mais emocional">Mais emocional</option>
          <option value="mais científico">Mais científico</option>
          <option value="mais misterioso">Mais misterioso</option>
          <option value="mais cinematográfico">Mais cinematográfico</option>
        </select>

        <button onClick={() => generate("script")}>
          {loading === "script" ? "Gerando..." : "Gerar roteiro"}
        </button>

        <textarea value={script} readOnly placeholder="O roteiro aparecerá aqui..." />

        <button className="secondary" onClick={() => copy(script)}>
          Copiar roteiro
        </button>
      </section>

      <section className="card">
        <h2>3. Gerar prompt separado</h2>

        <button onClick={() => generate("prompt")}>
          {loading === "prompt" ? "Gerando..." : "Gerar prompt avançado"}
        </button>

        <textarea value={prompt} readOnly placeholder="O prompt aparecerá aqui..." />

        <button className="secondary" onClick={() => copy(prompt)}>
          Copiar prompt
        </button>
      </section>
    </main>
  );
}
