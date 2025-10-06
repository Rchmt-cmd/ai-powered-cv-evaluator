import { storeDocument } from "../models/document.model.js";

async function postDocumentController(req, res) {
  try {
    const { cv, projectReport } = req.files;
    const storeCv = await storeDocument({
      name: cv[0].originalname,
      path: cv[0].path,
      type: 1,
    });
    const storeProjectReport = await storeDocument({
      name: projectReport[0].originalname,
      path: projectReport[0].path,
      type: 2,
    });

    return res.status(201).json({
      message: "success to store file",
      detail: {
        cvId: storeCv.insertId,
        projectReportId: storeProjectReport.insertId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to upload file",
      detail: error,
    });
  }
}

export { postDocumentController };
