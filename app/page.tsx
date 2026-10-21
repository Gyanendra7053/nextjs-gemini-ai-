"use client";

import { useState } from "react";
import { genrateTextAction } from "./actions/aiActions";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendPrompt = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);

    try {
      const response = await genrateTextAction(prompt);
      setOutput(response ?? "");
      setPrompt("");
    } catch (error) {
      console.error(error);
      setOutput("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-6 py-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500 text-xl shadow-lg shadow-indigo-500/30">
            ✦
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              Gemini AI
            </h1>
            <p className="text-xs text-slate-400">
              Your intelligent AI assistant
            </p>
          </div>
          <span className="ml-auto rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            AI Assistant
          </span>
        </div>
      </header>

      {/* Chat Area */}
      <section className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 pb-40 pt-10 sm:px-6">
        {!output && (
          <div className="flex flex-1 flex-col items-center justify-center pb-12 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-indigo-400/20 bg-indigo-500/10 text-4xl shadow-2xl shadow-indigo-500/10">
              ✨
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              What can I help you
              <span className="mt-2 block bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                explore today?
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
              Ask a question, learn something new, or brainstorm your next
              big idea with AI.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {["Explain React JS", "Learn Java", "What is AI?"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setPrompt(suggestion)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {output && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-indigo-600 px-5 py-3 text-sm leading-7 shadow-lg shadow-indigo-950/30">
                {prompt || "Your question"}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-lg">
                ✦
              </div>

              <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.06] p-5 shadow-xl backdrop-blur-md sm:p-6">
                <h2 className="mb-3 text-sm font-semibold text-indigo-300">
                  Gemini AI
                </h2>
                <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-200 sm:text-base">
                  {output}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Fixed Input Area */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-slate-950/80 px-4 pb-5 pt-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-2 shadow-2xl shadow-black/20 transition focus-within:border-indigo-400/60 focus-within:ring-2 focus-within:ring-indigo-500/20">
            <input
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500 sm:text-base"
              placeholder="Message Gemini AI..."
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendPrompt();
              }}
              disabled={loading}
            />

            <button
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
              onClick={handleSendPrompt}
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span className="hidden sm:inline">Thinking</span>
                </>
              ) : (
                <>
                  Send
                  <span aria-hidden="true">↑</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-slate-500">
            AI can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </main>
  );
}