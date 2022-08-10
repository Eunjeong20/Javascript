// function Test()
// {  console.log("test");
// }

// function Test2() 
// {
  
//     console.log("test2");
// }

// module.exports = {Test, Test2};

const request = require('request');
const cheerio = require('cheerio');

const url = "http://ncov.mohw.go.kr/bdBoardList_Real.do";

function GetCoronaData( Callback ) {
    request.get(url, (err, response, body) => {
        let data = [
            {id:1, title:'일일 사망', count:0},
        {id:2, title:'10만당 사망', count:0},
        {id:3, title:'일일 위중증', count:0},
        {id:4, title:'10만당 위중증', count:0},
        {id:5, title:'일일 신규입원', count:0},
        {id:6, title:'10만당 신규입원', count:0},
        {id:7, title:'일일 확진', count:0},
        {id:8, title:'10만당 확진', count:0}];

        // console.log(body);
        const $ = cheerio.load(body);
        let text = $(".st_title > .fl_l > h3").text();
        let list = $(".ca_value");
        console.log(text);
        for(let i=0; i<list.length; i++) {
            let text = list.eq(i).text();
            data[i].count = text;     
        }
        // console.log(data);
        Callback(data);
    });
}

module.exports = {GetCoronaData};
