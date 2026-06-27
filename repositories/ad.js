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

exports.findPendingAds = async () => {
  const [ads] = await db.execute(
    "SELECT * FROM `ads` WHERE status = 'pending'",
  );

  return ads;
};

exports.changestatus = async (ad_id, status) => {
  const query = "UPDATE `ads` SET `status`= ? WHERE id = ?";

  const [row] = await db.execute(query, [status, ad_id]);

  return row;
};

exports.findAds = async (city_id, status) => {
  const query = `
  SELECT 
    ads.id,
    cities.name AS city,
    categories.name,
    ads.title,
    ads.price,
    ads.created_at,
    ad_images.image_url AS cover_image
FROM ads
JOIN cities ON ads.city_id = cities.id
JOIN categories ON ads.category_id = categories.id
JOIN ad_images ON ad_images.ad_id = ads.id
WHERE ads.city_id = ?
  AND ads.status = ? 
  AND ad_images.is_main = 1
ORDER BY ads.created_at DESC`;

  const [ads] = await db.execute(query, [city_id, status]);

  return ads;
};

exports.findAdById = async (ad_id) => {
  const query = `SELECT 
    ads.id,
    ads.title,
    ads.description,
    ads.price,
    users.phone AS user_phone,
    cities.name AS city,
    GROUP_CONCAT(ad_images.image_url) AS all_images 
    FROM ads
    JOIN cities ON cities.id = ads.city_id
    JOIN users ON users.id = ads.user_id
    LEFT JOIN ad_images ON ad_images.ad_id = ads.id
    WHERE ads.id = ?
    GROUP BY ads.id;`;

  const [ad] = await db.execute(query, [ad_id]);

  return ad[0];
};
