const db = require("./../db");

exports.create = async ({
  name,
  slug,
  parent_id = null,
  form_schema = null,
}) => {
  const [category] = await db.execute(
    "INSERT INTO categories (name, slug, parent_id, form_schema) VALUES (?, ?, ?, ?)",
    [name, slug, parent_id, form_schema],
  );

  return category;
};

exports.getAll = async () => {
  const [categories] = await db.execute("SELECT * FROM categories");
  return categories;
};
