const express = require('express');
const app = express();
app.use(express.json());

// مسار التحقق من المفتاح
app.post('/api/verify', (req, res) => {
    const { key, hwid } = req.body;
    
    // هنا تقدر تحط المفتاح التجريبي أو تعدله لاحقاً
    if (key && key.length >= 6) {
        res.json({
            status: "success",
            message: "Key is valid!"
        });
    } else {
        res.json({
            status: "error",
            message: "المفتاح غير صحيح أو قصير!"
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Key Server is running on port ${PORT}`));
