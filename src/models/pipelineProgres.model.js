import pool from "../configs/db.config.js";
import { executeQuery } from "../utils/helper.js";

export function getOneProgres(id) {
  const query = "select * from `cv-evaluator`.`pipeline-progres` where id = ?";
  return executeQuery(pool, query, [id]);
}

export function storeProgres(data) {
  const query = "insert into `cv-evaluator`.`pipeline-progres` set ?";
  return executeQuery(pool, query, [data]);
}

export function updateProgres(data, id) {
  const query = "update `cv-evaluator`.`pipeline-progres` set ? where id = ?";
  return executeQuery(pool, query, [data, id]);
}
