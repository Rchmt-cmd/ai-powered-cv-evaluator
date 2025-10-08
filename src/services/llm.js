import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const evaluate = async (prompt) => {
  try {
    const result = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
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
