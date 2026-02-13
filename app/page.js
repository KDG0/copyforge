"use client";

import { useState } from "react";

// Opciones que el usuario puede elegir en el formulario
const CONTENT_TYPES = [
  { value: "professional-email", label: "📧 Professional Email" },
  { value: "linkedin-post", label: "💼 LinkedIn Post" },
  { value: "product-description", label: "🛍️ Product Description" },
  { value: "cold-outreach", label: "🎯 Cold Outreach" },
  { value: "blog-intro", label: "✍️ Blog Introduction" },
];

const TONES = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual & Friendly" },
  { value: "persuasive", label: "Persuasive" },
  { value: "formal", label: "Formal" },
];

export default function Home() {
  // Estado del formulario
  const [contentType, setContentType] = useState("professional-email");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState("professional");

  // Estado de la app
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Función que llama a nuestra API route
  async function handleGenerate() {
    if (!context.trim()) {
      setError("Please describe what you need");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentType, context, tone }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.result);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Copiar resultado al clipboard
  async function handleCopy() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1A1A2E",
        color: "#FFFFFF",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "1.5rem 2rem",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "1.4rem",
            fontWeight: 700,
            margin: 0,
          }}
        >
          <span style={{ color: "#E94560" }}>Copy</span>Forge
        </h1>
        <span
          style={{
            fontSize: "0.75rem",
            color: "#666666",
            fontFamily: "monospace",
          }}
        >
          powered by Claude AI
        </span>
      </header>

      {/* Main Content */}
      <main
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
        }}
      >
        {/* Hero Text */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
              fontWeight: 700,
              margin: "0 0 0.75rem 0",
              lineHeight: 1.2,
            }}
          >
            Generate professional content
            <span style={{ color: "#E94560" }}> in seconds</span>
          </h2>
          <p style={{ color: "#666666", fontSize: "1.05rem", margin: 0 }}>
            Select a content type, describe what you need, and let AI do the
            writing.
          </p>
        </div>

        {/* Form */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {/* Content Type Selector */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                color: "#999",
                marginBottom: "0.5rem",
                fontFamily: "monospace",
              }}
            >
              content_type
            </label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {CONTENT_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setContentType(type.value)}
                  style={{
                    padding: "0.6rem 1rem",
                    borderRadius: "8px",
                    border:
                      contentType === type.value
                        ? "1px solid #E94560"
                        : "1px solid rgba(255,255,255,0.1)",
                    backgroundColor:
                      contentType === type.value
                        ? "rgba(233,69,96,0.15)"
                        : "rgba(255,255,255,0.03)",
                    color: contentType === type.value ? "#E94560" : "#999",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    transition: "all 0.2s",
                  }}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Context Textarea */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                color: "#999",
                marginBottom: "0.5rem",
                fontFamily: "monospace",
              }}
            >
              context
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Describe what you need... e.g., 'An email to a client explaining a project delay of 2 weeks due to API integration issues'"
              rows={4}
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.03)",
                color: "#FFFFFF",
                fontSize: "0.95rem",
                resize: "vertical",
                outline: "none",
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                lineHeight: 1.5,
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Tone Selector */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                color: "#999",
                marginBottom: "0.5rem",
                fontFamily: "monospace",
              }}
            >
              tone
            </label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {TONES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    border:
                      tone === t.value
                        ? "1px solid #0F3460"
                        : "1px solid rgba(255,255,255,0.1)",
                    backgroundColor:
                      tone === t.value
                        ? "rgba(15,52,96,0.3)"
                        : "rgba(255,255,255,0.03)",
                    color: tone === t.value ? "#7EB8E0" : "#666",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    transition: "all 0.2s",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              padding: "1rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: loading ? "#666" : "#E94560",
              color: "#FFFFFF",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            {loading ? "⏳ Generating..." : "✨ Generate Content"}
          </button>

          {/* Error */}
          {error && (
            <p style={{ color: "#E94560", fontSize: "0.9rem", margin: 0 }}>
              {error}
            </p>
          )}
        </div>

        {/* Result */}
        {result && (
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid rgba(233,69,96,0.2)",
              backgroundColor: "rgba(255,255,255,0.03)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "#E94560",
                  fontFamily: "monospace",
                }}
              >
                output
              </span>
              <button
                onClick={handleCopy}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: copied
                    ? "rgba(110,231,183,0.15)"
                    : "transparent",
                  color: copied ? "#6ee7b7" : "#999",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
              >
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <div
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.7,
                fontSize: "0.95rem",
                color: "#E0E0E0",
              }}
            >
              {result}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
