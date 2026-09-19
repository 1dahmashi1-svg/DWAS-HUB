const express = require('express');
const app = express();
app.use(express.json());

// قاعدة بيانات مؤقتة للمفاتيح (تخزن المفاتيح الفعالة)
const activeKeys = new Set();

// 1. مسار لتوليد مفتاح جديد (هذا الرابط اللي يوجه له Work.ink / LootLabs)
app.get('/api/get-key', (req, res) => {
    // توليد مفتاح عشوائي فريد
    const generatedKey = 'DWAS_' + Math.random().toString(36).substring(2, 10).toUpperCase();
    activeKeys.add(generatedKey);
    
    // يرجع المفتاح للعميل بعد تجاوز الرابط
    res.send(`مفتاحك الخاص بـ DWAS HUB هو: <b>${generatedKey}</b><br>انسخه وارجع للعبة.`);
});

// 2. مسار التحقق من المفتاح (اللي يستخدمه اللودر داخل اللعبة)
app.post('/api/verify', (req, res) => {
    const { key } = req.body;
    
    if (activeKeys.has(key)) {
        // إذا تبي المفتاح يشتغل مرة وحدة ويحترق، فعّل السطر اللي تحت:
        // activeKeys.delete(key); 
        
        res.json({
            status: "success",
            message: "Key is valid!"
        });
    } else {
        res.json({
            status: "error",
            message: "المفتاح غير صحيح أو منتهي!"
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Key Server is running on port ${PORT}`));
