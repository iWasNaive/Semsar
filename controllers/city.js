const Cities = require("../repositories/city");

exports.create = async (req, res, next) => {
  try {
    const { name, parent_id } = req.body;

    const result = await Cities.create(name, parent_id);
    return res
      .status(201)
      .json({ message: "City created successfully", cityId: result.insertId });
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const cities = await Cities.getAll();
    return res.status(200).json({ cities });
  } catch (error) {
    next(error);
  }
};
