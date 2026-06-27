const db = require("./../db");

exports.create = async (user_id, ad_id) => {
  try {
    const query = "INSERT INTO `bookmarks`(`user_id`, `ad_id`) VALUES (?, ?)";

    await db.execute(query, [user_id, ad_id]);

    return true;
  } catch (err) {
    throw err;
  }
};
