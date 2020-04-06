import express from "express";
import moment from "moment";
const request = require("request")

const app = express();
const port = 3000;
const envBack = "http://localhost:8080";



app.get("/", (req, res) => {
    res.send('OK')

});

function doQuery(queryList: any) {
    let rep = ""
    let separator = "?"

    for (let i in queryList) {
        rep += separator + i + '=' + queryList[i]
        separator = "&"
    }
    console.log(rep)
    return rep

}


function isOpen(req:any){
    return new Promise((resolve, reject) => {
        let url = envBack+"/timetables"+doQuery(req.query)
        console.log(url)
        request.get(url, {method:'GET'},(err:any, response:any, body:any) => {
            if (err) {
                console.log('err')
                reject()
                return
            }
            console.log('body',body)
            if(body.open){
                let rep = false;
                let time = moment(req.query.date).format('X')
                body.timetables.map((timeZone:any)=>{
                    if(time> moment(timeZone.opening).format('X') && time< moment(timeZone.closing).format('X')){
                        rep=true
                    }
                })
                if (rep){
                    resolve()
                } else {
                    reject()
                }
            } else {
                reject()
            }
            
        });
    })

}

function isFree(req:any){
    return new Promise((resolve, reject) => {
        let url = envBack+"/reservations"+doQuery(req.query)
        console.log(url)
        request.get(url,  (err:any, response:any, body:any) => {
            if (err) {
                console.log('err')
                reject()
                return
            }
            console.log("body",response.body)
        });
    })

}



app.get("/isDispo", async (req, res) => {
    var date = req.query.date;
    var resourceId = req.query.resourceId;
    

    
    if (!moment(date, moment.ISO_8601, true).isValid()) {
        res.status(400).json({ "error": "wrong format for param startDatetime" });
        return;
    } else {
        isOpen(req).then(()=>{

        })

    }

});

app.get("**", (req, res) => {
    res.status(404).send('Erreur 404')

});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});