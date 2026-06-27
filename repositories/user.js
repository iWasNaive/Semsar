const db = require("./../db");

exports.create = async (user) => {
  const { name, phone, password } = user;
  const sql = "INSERT INTO users (name, phone, password) VALUES (?, ?, ?)";
  const [result] = await db.execute(sql, [name, phone, password]);
  return result.insertId;
};

exports.findByPhone = async (phone) => {
  const sql = "SELECT * FROM users WHERE phone = ?";
  const [rows] = await db.execute(sql, [phone]);
  return rows[0];
};

exports.findById = async (id) => {
  const query = "SELECT phone, name, city_id, role FROM users WHERE id = ?";
  const [rows] = await db.execute(query, [id]);

  return rows[0];
};
