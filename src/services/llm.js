import Groq from "groq-sdk";
import { systemPrompt, userPrompt } from "../utils/prompts.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const evaluateCv = async (cvText, context1, context2) => {
  try {
    const result = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: systemPrompt(context1, context2),
        },
        {
          role: "user",
          content: userPrompt(cvText),
        },
      ],
    });
    return result.choices[0]?.message?.content || "";
  } catch (error) {
    throw new Error(error);
  }
};
