const request = require('request'),
    cheerio = require('cheerio'),
    js3chardet = require('jschardet'),
    iconv = require('iconv-lite');

const main = () => {

let tagArr = [];

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
                dataJson(url, title, date);
                
            });
            console.log(typeof tagArr);
            console.log(tagArr[0].title);
            const tagStr = JSON.stringify(tagArr);
            console.log(tagStr[0].title);
            //json이 문자열이면 정보를 읽을 수 없음.
            dataTitle();
    });
}

//getNotice();
const dataJson = (url, title, date) => {
	tagArr.push({"url" : url, "title" : title, "date" : date});
	}

const dataTitle = () => {
	let count = 0;
	console.log("공지사항");
	for(let i = 0; i < tagArr.length; i++) {
		count++;
		console.log(`${count}. ${tagArr[i].title}\n   ${tagArr[i].url}\n   작성일: ${tagArr[i].date}`);
		}
		}

const newTest = () => {
	getNotice();
	console.log(`"시험"+${tagArr}`);
	//함수공간을 떠나면 변수정보 초기화
	}
	newTest();
	}

main();
//함수로 묶어봤지만 역시 초기화됨
