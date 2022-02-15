const express = require('express');
const app = express();
const fs = require('fs');
const axios = require('axios')
const cheerio = require('cheerio')
const puppeteer = require('puppeteer')
const csv = require('csvtojson')
const csvPath = "vacc.csv"
const info = []
const port = process.env.PORT || 3000
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

app.get('/vaccineStatistics',function(req,res){

    csv()
        .fromFile(csvPath)
        .then((json)=>{
            var len = json.length
            len = len - 1
            console.log(json[len])
            res.send(json[len])
        })
})

/*
app.get('/vaccineStatistics',function(req,res){
var url = "https://arabgt.com/wp-content/uploads/2017/12/nysn-skylyn-r34-1998_014.jpg"
    axios.get(url)
        .then((response)=>{
            const filestream = fs.createWriteStream("vacc.jpg")
            res.pipe(filestream)
            filestream.on("finish",()=>{
                filestream.close()
                console.log("done")
            })
        })

        })
*/


app.get('/', function(req, res){
    
        res.end('diooo!!!');
})

app.get('/getAllHealthCenters', function(req, res){
    fs.readFile(__dirname + "/" + "centers.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data);
    });
});

app.listen(port, ()=> {

    console.log(' app is wokring on port 3000')
})