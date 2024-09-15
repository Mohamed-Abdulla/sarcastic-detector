import { useState } from "react";
import Confetti from "react-confetti";

export default function Home() {
  const [sentence, setSentence] = useState("");
  const [result, setResult] = useState<{ label: number; sentence: string; sarcasm: string } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!sentence) {
      return alert("Please enter a sentence");
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/detect-sarcasm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence }),
      });
      const data = await res.json();
      setResult(data);
      if (data.label == 1) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-yellow-200 text-sky-900 flex flex-col items-center justify-center">
      {showConfetti && <Confetti />}
      <section className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Sarcasm Detection</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="text"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            placeholder="Enter a sentence"
            className="border border-sky-300 bg-sky-200 text-black rounded-lg p-2 mb-4 w-full max-w-xs"
          />
          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-sky-600 transition"
          >
            Analyze
          </button>
        </form>
        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Results</h2>
            <p className="text-lg mt-2">Sarcasm: {result.label === 1 ? "Yes" : "No"}</p>
          </div>
        )}
      </section>
    </main>
  );
}
