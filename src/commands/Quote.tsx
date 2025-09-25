import React, { useState, useEffect } from 'react';

// Define a type for quotes
interface Quote {
  content: string;
  author: string;
}

// Fallback local quotes (tech/motivational theme) in case API fails
const fallbackQuotes: Quote[] = [
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    content: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    content: "It is better to fail in originality than to succeed in imitation.",
    author: "Herman Melville"
  },
  {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    content: "Code is like humor. When you have to explain it, it’s bad.",
    author: "Cory House"
  },
  {
    content: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  },
  {
    content: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler"
  },
  {
    content: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman"
  }
];

const Quote: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuoteFromAPI = async (): Promise<Quote | null> => {
    try {
      const response = await fetch('https://api.quotable.io/random?tags=technology');
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      const data: Quote = await response.json();
      return data;
    } catch (err) {
      console.error('API fetch failed:', err);
      return null;
    }
  };

  const getRandomFallbackQuote = (): Quote => {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
  };

  const fetchQuote = async () => {
    setLoading(true);

    // Try API first
    const apiQuote = await fetchQuoteFromAPI();
    if (apiQuote) {
      setCurrentQuote(apiQuote);
    } else {
      // Fallback to local quote
      const fallbackQuote = getRandomFallbackQuote();
      setCurrentQuote(fallbackQuote);
      console.warn('Using fallback quote due to API failure');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (loading) {
    return (
      <div className="quote-container">
        <pre className="cmd-output">
          <code>&gt; generating quote...</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="quote-container">
      <pre className="cmd-output">
        <code>&gt; "{currentQuote?.content}"</code>
        <br />
        <code>&gt; - {currentQuote?.author}</code>
      </pre>
    </div>
  );
};

export default Quote;