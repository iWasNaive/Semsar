const db = require("../db");

exports.create = async (name, parent_id = null) => {
  const query = `INSERT INTO cities VALUES (NULL, ?, ?)`;
  const [row] = await db.execute(query, [name, parent_id]);

  return row;
};

exports.getAll = async () => {
  const query = `SELECT * FROM cities`;
  const [rows] = await db.execute(query);

  return rows;
};
