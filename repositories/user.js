const db = require("./../db");

exports.create = async (user) => {
  const { name, phone, password } = user;
  let role = phone === "09339566060" ? "admin" : "user";

  const sql =
    "INSERT INTO users (name, phone, password, role) VALUES (?, ?, ?, ?)";
  const [result] = await db.execute(sql, [name, phone, password, role]);
  return result.insertId;
};

exports.findByPhone = async (phone) => {
  const sql = "SELECT * FROM users WHERE phone = ?";
  const [rows] = await db.execute(sql, [phone]);
  return rows[0];
};

exports.findById = async (id) => {
  const query = "SELECT id, phone, name, city_id, role FROM users WHERE id = ?";
  const [rows] = await db.execute(query, [id]);

  return rows[0];
};
