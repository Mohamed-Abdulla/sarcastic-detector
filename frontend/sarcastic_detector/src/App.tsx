import { useState } from "react";

export default function Home() {
  const [sentence, setSentence] = useState("");
  const [result, setResult] = useState<{ label: number; sentence: string; sarcasm: string } | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/detect-sarcasm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Sarcasm Detection</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          placeholder="Enter a sentence"
        />
        <button type="submit">Analyze</button>
      </form>
      {result && (
        <div>
          <h2>Results</h2>
          {/* <p>Sentiment: {result?.sentiment}</p> */}
          <p>Sarcasm: {result?.label == 1 ? "Yes" : "No"}</p>
          {/* <p>Meaning: {result.meaning}</p> */}
        </div>
      )}
    </div>
  );
}
