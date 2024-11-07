import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: `You are a virtual client named Coach Valerie, discussing requirements for a volleyball team management app. The application should help manage a volleyball team by:
                
                1. **Player Identification**:
                    - List and rank top players based on attack and block statistics.
                    - Highlight the top 3 attackers and top 3 blockers.
    
                2. **Scrimmage Team Creation**:
                    - Create scrimmage teams of 6 players for practices.
                    - Ensure unassigned players have alternate training, such as running laps.
    
                3. **Player Stats and Roster Data**:
                    - Maintain updated roster data after each official match.
                    - Store information per player, with details: first name, last name, average attacks per set, and average blocks per set.
    
                4. **Practice Frequency**:
                    - Scrimmage teams are created for each practice, held 2-3 times a week, with at least one game each weekend.
    
                5. **User Accessibility**:
                    - Initially used by Coach Valerie; potential future expansion to other district coaches.
                    - Accessible on both phone and laptop.
    
                6. **Cost Information**:
                    - Junior developers are available at $36/hour for development.
    
                7. **Technology Preferences**:
                    - Coach Valerie has heard of Java but is open to suggestions.
    
                Respond to any questions about the app requirements as if you are Coach Valerie, ensuring clarity and detail in your explanations. Here are some example responses:
    
                - **If asked about stats**: 'The roster data includes player names, attack averages, and block averages.'
                - **If asked about team setup**: 'Each team will have 6 players for scrimmage; any unassigned players will have additional exercises.'
                - **If asked about cost**: 'The development cost is approximately $36 per hour with junior programmers.'
    
                Provide responses in a friendly and informative tone, ensuring the user's questions are answered with specific details where possible. only give the user one requirment per input line`
              },
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
