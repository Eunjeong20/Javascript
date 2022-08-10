// console.log("Hello World");

const http = require('http');
const {GetCoronaData} = require("./Corona.js");
const express = require('express');
const path = require('path');
const { xml } = require('cheerio');

const app = express();
const server = http.createServer(app);  // app은 라우터 역할

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); // ejs, mustache, pug, handlebars

const dataTemplate = [
    {id:1, title:'일일 사망', count:0},
{id:2, title:'10만당 사망', count:0},
{id:3, title:'일일 위중증', count:0},
{id:4, title:'10만당 위중증', count:0},
{id:5, title:'일일 신규입원', count:0},
{id:6, title:'10만당 신규입원', count:0},
{id:7, title:'일일 확진', count:0},
{id:8, title:'10만당 확진', count:0}];

app.get("/corona", (request, response)=> {

    response.render("corona", {data:dataTemplate});
});

app.get("/data", (request, response)=> {
    GetCoronaData((data)=>{
        data.forEach(x=>{
            x.count = x.count.replace(",","") *1;
        })
        response.json(data);
    });
});



// app.get("/corona", (request, response)=> {

    // GetCoronaData((data)=>{
    //     response.render("corona", {data});
    // });
    
    // GetCoronaData((data) => {
    //     let view = `
    //         <html>
    //             <head>
    //                 <meta charset="utf-8"/>
    //             </head>
    //             <body>`;

    //     for(let i = 0; i < data.length; i++){
    //         view += `<h1>${data[i].title}</h1>
    //                 <p>${data[i].count}</p>`;
    //     }
    //     view += `</body></html>`;
    //     response.end(view);
    // })
    
// });

server.listen(52000, ()=>{
    console.log("서버가 52000번 포트에서 실행중입니다");
});


// const server = http.createServer((request, response) => {
//     console.log(request.url);
//     let data = {msg:'hello node.js', school:'km highschool'};
//     // response.json(JSON.stringify(data));
//     response.end("<h1>hello world</h1>");
// });
