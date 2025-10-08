import { Ragie } from "ragie";

const ragie = new Ragie({
  auth: process.env.RAGIE_KEY,
});

const ingestDocs = async (path, docname) => {
  try {
    await ragie.documents.create({
      name: docname,
      file: path,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const getRelevantContext = async (query, title) => {
  try {
    return await ragie.retrievals.retrieve({
      query: query,
      // rerank: true,
      filter: {
        title: title,
      },
      // topK: 1,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export { ingestDocs, getRelevantContext };
