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

exports.showAds = async (req, res, next) => {
  try {
    const city_id = req.query.city_id;
    const status = "approved";

    const ads = await Ad.findAds(city_id, status);
    if (ads.length === 0) {
      return res.status(400).json({ message: "no ads for show" });
    }
    return res.status(200).json({ ads });
  } catch (error) {
    next(error);
  }
};

exports.getad = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ad = await Ad.findAdById(id);

    let images = ad.all_images ? ad.all_images.split(",") : [];

    const adData = {
      ...ad,
      images,
    };

    delete adData.all_images;

    return res.json({ adData });
  } catch (error) {
    next(error);
  }
};

exports.showPendingAds = async (req, res, next) => {
  try {
    const ads = await Ad.findPendingAds();
    if (ads.length === 0) {
      return res.status(200).json({ message: "no pending ads" });
    }
    return res.status(200).json({ ads });
  } catch (error) {
    next(error);
  }
};

exports.changeStatus = async (req, res, next) => {
  try {
    const adId = req.params.id;
    const { status } = req.body;

    if (!["rejected", "approved"].includes(status)) {
      return res.status(400).json({ message: "bad status" });
    }

    const change = await Ad.changestatus(adId, status);
    if (change.affectedRows === 0) {
      return res.status(401).json({ message: "ad not fount" });
    }

    return res.status(200).json({ message: "status change" });
  } catch (error) {
    next(error);
  }
};
