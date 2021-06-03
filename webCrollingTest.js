const request = require('request'),
    cheerio = require('cheerio'),
    jschardet = require('jschardet'),
    iconv = require('iconv-lite');


const getNotice = () => {
    request( {
        url: "https://maplestory.nexon.com/News/Notice",
        method: "GET"
    },
        (error, response, body) => {
        if(error) {
            console.error(error);
            return;
        }
        else {
            (response.statusCode === 200)
        }
        console.log("Ready");

        //console.log(body);

            const $ = cheerio.load(body);
            const taglist = $("#container > div > div > div.news_board > ul > li").toArray(); //.news_board
            const tagArr = [];
            taglist.forEach((li) => {
                const TagF = $(li).find("a").first();
                const path = TagF.attr("href");
                const url = `https://maplestory.nexon.com${path}`;
                const title = TagF.text().trim();

                //console.log(url, title);

                const TagL = $(li).find("dd").last();
                let date = TagL.text().trim();

                if(date === '') {
                    date = "Null";
                }

                //console.log(date);

                tagArr.push({
                    url,
                    title,
                    date,
                });
            });
            console.log(tagArr);
    });
}

getNotice();

/*
const url = "https://maplestory.nexon.com/News/Notice";
request(url, function (err, res, body) {
    try {
        const WTFtext = jschardet.detect(body);
        const $ = cheerio.load(body);
        //console.log(body);
        let classTag = $('#container > div > div > div > ul > li');

        console.log(WTFtext);
        console.log("해치웠나? "+classTag.length);
        //console.log(classTag);

        for(let i = 0; i < classTag.length; i++) {
            tagArr.push(classTag.eq[i].getText());
        }
        console.log(tagArr);
        console.log(JSON.stringify(tagArr));
    }
        catch (err) {
            console.log(err);
        }
    });
 */