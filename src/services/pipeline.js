import fs from "fs";
import { pdf } from "pdf-parse";
import { getRelevantContext } from "./ragie.js";
import { evaluateCv } from "./llm.js";
import { updateProgres } from "../models/pipelineProgres.model.js";

async function evaluatorPipeline(jobId, docPath, type) {
  const docContextQuery =
    type === "cv"
      ? "Retrieve detailed job description for a Full Stack Developer role, focusing on required technical skills, responsibilities, and preferred qualifications."
      : "Retrieve detailed case study brief for a Full Stack Developer role";
  const scoringContextQuery =
    type === "cv"
      ? "Retrieve CV Match Evaluation (1–5 scale per parameter) scoring rubric."
      : "Project Deliverable Evaluation (1–5 scale per parameter) scoring rubric.";
  const contextDocument =
    type === "cv" ? "Job Description.pdf" : "Case Study Brief.pdf";

  try {
    const docBuffer = fs.readFileSync(docPath);
    const docRaw = await pdf(docBuffer);

    if (!docRaw) throw new Error("failed to parse document");

    await updateProgres(
      {
        progres: 2,
      },
      jobId
    );

    const [docContext, scoringContext] = await Promise.all([
      getRelevantContext(docContextQuery, contextDocument),
      getRelevantContext(
        scoringContextQuery,
        "Scoring Rubric for Case Study Evaluation.pdf"
      ),
    ]);

    if (
      !docContext?.scoredChunks?.length ||
      !scoringContext?.scoredChunks?.length
    )
      throw new Error("context returned empty");

    const docChunks = docContext.scoredChunks.map((chunk) => chunk.text);
    const scoringChunk = scoringContext.scoredChunks.map((chunk) => chunk.text);

    const generate = await evaluateCv(
      docRaw.text,
      docChunks,
      scoringChunk
    ).then((res) => res.replace(/```json|```/g, "").trim());

    const { result } = JSON.parse(generate);

    await updateProgres(
      {
        progres: 3,
        cv_match_rate: result.cv_match_rate,
        cv_feedback: result.cv_feedback,
      },
      jobId
    );

    return result;
  } catch (error) {
    await updateProgres(
      {
        progres: 0,
      },
      jobId
    );
    console.log(error);
  }
}

export default evaluatorPipeline;
