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
/*My name is Yoshikage Kira. I'm 33 years old. My house is in the northeast section of Morioh,
 where all the villas are, and I am not married.
  I work as an employee for the Kame Yu department stores,
   and I get home every day by 8 PM at the latest.
    I don't smoke, but I occasionally drink. I'm in bed by 11 PM, and make sure I get eight hours of sleep, no matter what.
    After having a glass of warm milk and doing about twenty minutes of stretches before going to bed, I usually have no problems sleeping until morning.
    Just like a baby, I wake up without any fatigue or stress in the morning.
     I was told there were no issues at my last check-up.
      I'm trying to explain that I'm a person who wishes to live a very quiet life.
       I take care not to trouble myself with any enemies, like winning and losing, that would cause me to lose sleep at night.
       That is how I deal with society, and I know that is what brings me happiness.
        Although, if I were to fight I wouldn't lose to anyone.*/