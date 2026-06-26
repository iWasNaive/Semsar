const db = require("./../db");

exports.create = async ({ ad_id, image_url, is_main }) => {
  const query = `
        INSERT INTO ad_images (ad_id, image_url, is_main) 
        VALUES (?, ?, ?)
    `;

  await db.execute(query, [ad_id, image_url, is_main]);
};
