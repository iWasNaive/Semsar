const Bookmark = require("./../repositories/bookmark");

exports.create = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { ad_id } = req.body;
    const ok = await Bookmark.create(user_id, ad_id);

    if (ok) {
      return res.status(201).json({ message: "bookmark added" });
    }
  } catch (error) {
    next(error);
  }
};
