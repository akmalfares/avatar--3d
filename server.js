const express = require("express");
const path = require("path");

const app = express();

// ملفات الاستاتيك
app.use(express.static(path.join(__dirname, "public")));

// صفحة البداية
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
