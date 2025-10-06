import pool from "../configs/db.config.js";
import { executeQuery } from "../utils/helper.js";

export function getAllDocument() {
  const query = "select * from `cv-evaluator`.document";
  return executeQuery(pool, query, []);
}

export function getOneDocument(id) {
  const query = "select * from `cv-evaluator`.document where id = ?";
  return executeQuery(pool, query, [id]);
}

export function storeDocument(data) {
  const query = "insert into `cv-evaluator`.document set ?";
  return executeQuery(pool, query, [data]);
}

export function updateDocument(data, id) {
  const query = "update `cv-evaluator`.document set ? where id = ?";
  return executeQuery(pool, query, [data, id]);
}
