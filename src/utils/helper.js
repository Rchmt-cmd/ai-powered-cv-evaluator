export const executeQuery = (conn, query, params) =>
  new Promise((resolve, reject) => {
    conn.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
