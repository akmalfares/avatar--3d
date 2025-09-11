const express = require("express");
const path = require("path");

const app = express();

// ملفات الاستاتيك (frontend)
app.use(express.static(path.join(__dirname, "public"))); 
// لاحظ: لو ملفات html/css/js عندك في نفس المسار، سيبها "public"
// أو غيّر "public" لأي فولدر انت حاطط فيه index.html

// صفحة البداية
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// تشغيل السيرفر على البورت اللي يحدده Render أو 3000 لو محلي
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
