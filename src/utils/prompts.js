export const cvPrompt = (data, context1, context2) => {
  return `
    Evaluate this candidate's cv below based on job description and scoring rubric available to you shown below. Give an evaluation result by returning a json format like below:
    {
      "result" : {
        "cv_match_rate": <match score>,
        "cv_feedback": <your short professional feedback about the candidate cv evaluation>
      }
    }
    Here is the candidate CV: ${data}
    ===
    Here is the job description information to evaluate the candidate cv: ${context1}
    ===
    And Here is the scoring rubric to evaluate the candidate cv: ${context2}
    ===
    If the user asked for a search and there are no results, make sure to let the user know that you couldn't find anything,
    and what they might be able to do to find the information they need.`;
};

export const projectReportPrompt = (data, context1, context2) => {
  return `
    Review the candidate's Project Deliverable Evaluation below based on the case study brief and scoring rubric that available to you shown below. Give an evaluation result by returning a json format like below:
    {
      "result" : {
        "project_score": <match score>,
        "project_feedback": <your short professional feedback about the candidate Project Deliverable Evaluation>
      }
    }
    Here is the candidate Project Deliverable Evaluation: ${data}
    ===
    Here is the case study brief information to evaluate the Project Deliverable Evaluation: ${context1}
    ===
    And Here is the scoring rubric to evaluate the Project Deliverable Evaluation: ${context2}
    ===
    If the user asked for a search and there are no results, make sure to let the user know that you couldn't find anything,
    and what they might be able to do to find the information they need.`;
};

export const summaryPrompt = (data) => {
  return `
    Create an overall summary from the cv evaluation result and Project Deliverable Evaluation result that the user given. Provide an answer of at least 3-5 sentences that emphasize the strengths and gaps of the candidate, then provide recommendations for the future. Give a json format response like below:
    {
      "result" : {
        "overall_summary": <your summary>
      }
    }

    And Here is the cv and Project Deliverable Evaluation result:
    ===
    ${data}
    ===

    If the user asked for a search and there are no results, make sure to let the user know that you couldn't find anything,
    and what they might be able to do to find the information they need.

    END SYSTEM INSTRUCTIONS`;
};
