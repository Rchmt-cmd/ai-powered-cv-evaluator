import { getOneDocument } from "../models/document.model.js";
import { evaluatorPipeline, summaryPipeline } from "../services/pipeline.js";
import {
  getOneProgres,
  storeProgres,
} from "../models/pipelineProgres.model.js";

const evaluator = async (req, res) => {
  try {
    const { jobTitle, cvId, projectReportId } = req.body;
    const cvData = await getOneDocument(cvId);
    const projectReportData = await getOneDocument(projectReportId);

    const insertProgres = await storeProgres({
      job_title: jobTitle,
      cv_id: cvId,
      project_report_id: projectReportId,
      progres: 1,
    });

    res.status(200).json({ id: insertProgres.insertId, status: "queued" });

    Promise.all([
      evaluatorPipeline(insertProgres.insertId, cvData[0].path, "cv"),
      evaluatorPipeline(
        insertProgres.insertId,
        projectReportData[0].path,
        "projectReport"
      ),
    ])
      .then(([cvResult, projectResult]) =>
        summaryPipeline(
          cvResult.cv_match_rate,
          cvResult.cv_feedback,
          projectResult.project_score,
          projectResult.project_feedback,
          insertProgres.insertId
        )
      )
      .catch((err) => {
        console.log(`❌ ${err}`);
        // throw new Error(`pipeline failed: ${err}`);
      });
    // evaluatorPipeline(projectReportData[0].path, "project"); // TODO add evaluatorPipeline for projectReport
    // summaryPipeline() // TODO add summaryPipeline for summary
  } catch (error) {
    return res.status(500).json({
      message: `failed: ${error}`,
    });
  }
};

const progresChecker = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getOneProgres(id);

    if (result[0].progres === 3) {
      return res.status(200).json({
        id: result[0].id,
        status: "completed",
        result: {
          cv_match_rate: result[0].cv_match_rate,
          cv_feedback: result[0].cv_feedback,
          project_score: result[0].project_score,
          project_feedback: result[0].project_feedback,
          overall_summary: result[0].overall_summary,
        },
      });
    } else if (result[0].progres === 0) {
      return res.status(200).json({
        id: result[0].id,
        status: "failed",
        error_message: result[0].error_message,
      });
    } else {
      return res.status(200).json({
        id: result[0].id,
        status:
          result[0].progres === 1
            ? "queued"
            : result[0].progres === 2
            ? "queued | processing"
            : result[0].progres === 3
            ? "completed"
            : "failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: `failed: ${error}`,
    });
  }
};

export { evaluator, progresChecker };
