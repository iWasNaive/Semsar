const Ad = require("./../repositories/ad");
const AdImage = require("./../repositories/ad_image");

exports.create = async (req, res, next) => {
  const { city_id, category_id, title, description, price, dynamicProperties } =
    req.body;
  const images = req.files;
  const user_id = req.user.id;

  const ad = await Ad.create({
    user_id,
    city_id,
    category_id,
    title,
    description,
    price,
    status: "pending",
    dynamicProperties,
  });

  const adId = ad;

  if (images && images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      let cleanPath = image.path.replace(/^public[\\/]/, "");
      cleanPath = cleanPath.replace(/\\/g, "/");

      const isMain = i === 0 ? 1 : 0;

      await AdImage.create({
        ad_id: adId,
        image_url: cleanPath,
        is_main: isMain,
      });
    }
  }

  return res.status(201).json({
    message: "آگهی و عکس‌ها با موفقیت ثبت شدند داداش!",
    adId: adId,
  });
};
