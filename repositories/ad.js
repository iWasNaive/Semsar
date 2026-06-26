const db = require("./../db");

exports.create = async ({
  user_id,
  city_id,
  category_id,
  title,
  description,
  price,
  status,
  dynamicProperties,
}) => {
  const query = `
        INSERT INTO ads 
        (user_id, city_id, category_id, title, description, price, status, dynamic_properties) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const [result] = await db.execute(query, [
    user_id,
    city_id,
    category_id,
    title,
    description,
    price,
    status,
    dynamicProperties,
  ]);

  return result.insertId;
};
