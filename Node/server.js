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
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1386.10, date: '2024-04-15' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1389.38, date: '2024-04-16' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1379.45, date: '2024-04-17' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1375.19, date: '2024-04-29' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1383.89, date: '2024-04-30' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1374.07, date: '2024-05-30' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1383.09, date: '2024-05-31' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1384.01, date: '2024-07-30' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1368.59, date: '2024-07-31' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1331.59, date: '2024-08-29' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1337.57, date: '2024-08-30' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1311.60, date: '2024-09-26' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1310.30, date: '2024-09-27' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1316.51, date: '2024-09-30' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1384.38, date: '2024-10-29' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1378.20, date: '2024-10-30' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1372.48, date: '2024-10-31' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1391.94, date: '2024-11-27' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1394.30, date: '2024-11-28' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1395.52, date: '2024-11-29' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1466.25, date: '2024-12-26' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1473.80, date: '2024-12-27' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1472.04, date: '2024-12-30' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1478.33, date: '2024-12-31' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1473.00, date: '2025-01-02' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1465.00, date: '2025-01-03' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1458.00, date: '2025-01-06' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1452.00, date: '2025-01-07' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1447.00, date: '2025-01-08' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1442.00, date: '2025-01-09' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1438.00, date: '2025-01-10' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1435.00, date: '2025-01-13' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1432.00, date: '2025-01-14' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1430.00, date: '2025-01-15' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1428.00, date: '2025-01-16' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1426.00, date: '2025-01-17' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1424.00, date: '2025-01-20' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1422.00, date: '2025-01-21' },
    { source_currency_code: 'USD', target_currency_code: 'KRW', fx_rate: 1420.00, date: '2025-01-22' },
    ]
   
  
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(cors());

app.get('/get-items', (req, res) => {
    const { start, end } = req.query;

    const userItems = data.slice(start,end);
    const exD = exchangeData.slice(start,end);

    // res.json(userItems);
    res.json({
        items: userItems,
        exchangeData: exD});
});

app.listen(port, () => {
    console.log('서버 레디');
});
