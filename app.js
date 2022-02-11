const express = require('express');
const app = express();
const fs = require('fs');
const axios = require('axios')
const cheerio = require('cheerio')
const info = []
const port = process.env.PORT || 3000
app.get('/info',function(req,res){

app.get('/Statistics',function(req,res){
    axios.get('https://elaph.com/coronavirus-statistics-in-iraq.html')
        .then((response)=>{
            const html = response.data
            const $ = cheerio.load(html)
            $('div:contains("حالات مستقرة")',html).each(function (){
                const title = $(this).text()
                info.push(title)
                console.log(title)
            })
            res.json(info)

        }).catch((err)=> console.log(err))
})





app.get('/', function(req, res){
    
        res.end('diooo!!!');
})

app.get('/getAllHealthCenters', function(req, res){
    fs.readFile(__dirname + "/" + "centers.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data);
    });
});

var server = app.listen(port, function(){
    var host = server.address().address
    console.log("REST API demo app listening at http://%s:%s", host, )
})
