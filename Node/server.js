const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;


// 보내줄 데이터 정의
// function myData(_, i) {
//     return `Item ${i + 1}`
// }
// const data = Array.from({ length: 200 }, myData);
const data = Array.from({ length: 200 }, (_, i) => `Item ${i + 1}`);
const exchangeData = [
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,386.10', date: '2024-04-15' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,389.38', date: '2024-04-16' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,379.45', date: '2024-04-17' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,375.19', date: '2024-04-29' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,383.89', date: '2024-04-30' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,374.07', date: '2024-05-30' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,383.09', date: '2024-05-31' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,384.01', date: '2024-07-30' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,368.59', date: '2024-07-31' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,331.59', date: '2024-08-29' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,337.57', date: '2024-08-30' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,311.60', date: '2024-09-26' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,310.30', date: '2024-09-27' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,316.51', date: '2024-09-30' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,384.38', date: '2024-10-29' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,378.20', date: '2024-10-30' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,372.48', date: '2024-10-31' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,391.94', date: '2024-11-27' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,394.30', date: '2024-11-28' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,395.52', date: '2024-11-29' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,466.25', date: '2024-12-26' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,473.80', date: '2024-12-27' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,472.04', date: '2024-12-30' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,478.33', date: '2024-12-31' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,473.00', date: '2025-01-02' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,465.00', date: '2025-01-03' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,458.00', date: '2025-01-06' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,452.00', date: '2025-01-07' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,447.00', date: '2025-01-08' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,442.00', date: '2025-01-09' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,438.00', date: '2025-01-10' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,435.00', date: '2025-01-13' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,432.00', date: '2025-01-14' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,430.00', date: '2025-01-15' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,428.00', date: '2025-01-16' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,426.00', date: '2025-01-17' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,424.00', date: '2025-01-20' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,422.00', date: '2025-01-21' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: '1,420.00', date: '2025-01-22' },
    ]
   
  
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(cors());

app.get('/get-items', (req, res) => {
    const { start, end } = req.query;

    const userItems = data.slice(start,end);
    const exD = exchangeData.slice(start,end);

    res.json(userItems);
});

app.listen(port, () => {
    console.log('서버 레디');
});
