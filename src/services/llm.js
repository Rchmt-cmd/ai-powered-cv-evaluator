import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// TODO add condition to determine is it cv or project report evaluation
export const evaluate = async (prompt) => {
  try {
    const result = await groq.chat.completions.create({
      model: "groq/compound",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    return result.choices[0]?.message?.content || "";
  } catch (error) {
    throw new Error(error);
  }
};
