const express = require('express');
const conn = require('./db/db')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
app.use(bodyParser.json())
app.use(cors());
let print = 1;

app.get('/products', async (req, res) => {
    const offset = parseInt(req.query.offset)
    const limit = parseInt(req.query.limit);
    var count;
    var jsonResult;
    console.log('endpoint hit', print);
    print ++

    var sql = `select count(*) as total_count from Product;
    select Product.p_id, Product.product, Category.c_id, Category.category 
    from Product inner join Category on Product.cf_id = Category.c_id limit ${offset}, ${limit};`;
    
    conn.query(sql, (err, resp) => {
        if (err) throw err;
        sendResponse(resp)
    });

    function sendResponse(val) {
        count = val[0].map(v=> Object.assign({}, v))
        jsonResult = val[1].map(v => Object.assign({}, v));
        result = {}
        
        result['total'] = count[0].total_count
        result['data'] = jsonResult || []

        res.json(result)
    }
});

app.get('/categories', (req, res) => {
    const sql = 'select * from Category;';

    conn.query(sql, (err, resp) => {
        if (err) throw err;

        res.json(resp.map(v => Object.assign({}, v)) || []);
    })
})

app.post('/add_category', (req, res) => {
    var sql = `insert into Category (category) values('${req.body.name}');`;
    
    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    })

    res.status(200).send(req.body);
})

app.post('/add_product', (req, res) => {
    var sql = `insert into Product (cf_id, p_id, product) values('${req.body.c_id}', ${155},'${req.body.name}');`

    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
    res.status(200).send(req.body);
})

app.post('/delete_product', (req, res) => {
    var sql = `delete from Product where p_id = ${req.body.pid};`;

    conn.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
    })
    res.status(200).send(req.body);
})

app.listen(4000, () => {
    console.log('🚀 Server listening on port 4000...');
})
