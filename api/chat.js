import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a stock market analysis and investment advisor assistant." },
          { role: "user", content: message },
        ],
      });

      const reply = completion.choices[0]?.message.content || "No response from assistant.";
      res.status(200).json({ reply });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Error with OpenAI API request' });
    }
  } else {
    res.status(405).end();
  }
}
