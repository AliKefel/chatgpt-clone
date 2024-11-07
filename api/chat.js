import OpenAI from 'openai';

// Initialize OpenAI with the API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      // Send the request to OpenAI's chat completion API
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", 
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      });

      // Extract and send back the assistant's reply
      const reply = completion.choices[0].message.content;
      res.status(200).json({ reply });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Error with OpenAI API request' });
    }
  } else {
    res.status(405).end();  // Method Not Allowed
  }
}
