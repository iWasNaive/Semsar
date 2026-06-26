const Category = require("./../repositories/category");

exports.create = async (req, res, next) => {
  try {
    const { name, slug, parent_id, form_schema } = req.body;

    const convertedFromSchema = form_schema
      ? JSON.stringify(form_schema)
      : null;

    const category = await Category.create({
      name,
      slug,
      parent_id,
      form_schema: convertedFromSchema,
    });

    res.status(201).json({
      message: "Category created successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.getAll();

    res.status(200).json({
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};
