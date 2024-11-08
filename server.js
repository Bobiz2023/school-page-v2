const express = require("express");
const app = express();
const path = require("path");

// إعداد CORS للسماح بالتفاعل بين الواجهة الأمامية والخلفية
app.use(require("cors")());

// استخدام JSON لتبادل البيانات
app.use(express.json());

// إعداد ملفات الثابتة مثل CSS و HTML
app.use(express.static(path.join(__dirname, "public")));

// بيانات المدرسة لتخزين المحتوى (يمكنك ربطها بقاعدة بيانات)
let schoolContent = {
  home: "مرحباً بكم في موقع مدرسة رحال بن أحمد!",
  about: "مدرستنا تقدم تعليمًا متميزًا وتوفر بيئة تعليمية محفزة.",
  news: "المدرسة تطلق برنامجًا جديدًا لتحفيز الإبداع.",
  contact: "للتواصل معنا، يرجى إرسال بريد إلكتروني إلى info@school.com.",
};

// مسار للحصول على المحتوى
app.get("/api/content", (req, res) => {
  res.json(schoolContent);
});

// مسار لتحديث محتوى صفحة معينة
app.post("/api/updateContent", (req, res) => {
  const { page, content } = req.body;

  if (schoolContent.hasOwnProperty(page)) {
    schoolContent[page] = content;
    res.send({ message: `تم تحديث محتوى صفحة ${page} بنجاح!` });
  } else {
    res.status(400).send({ error: "الصفحة غير موجودة" });
  }
});

// مسار لعرض صفحات الويب
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/news", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "news.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

// مسار للوصول إلى لوحة تحكم المسؤول
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// إعداد الخادم
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});
