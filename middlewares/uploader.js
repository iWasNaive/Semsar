const multer = require("multer");
const fs = require("fs");
const path = require("path");

// ۱. تنظیمات محل ذخیره و نام‌گذاری
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./public/uploads/receipts";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("فقط فرمت‌های عکس (JPG, PNG, WEBP) مجاز است!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // محدودیت حجم: ۵ مگابایت
  fileFilter: fileFilter,
});

module.exports = upload;
