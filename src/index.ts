import express from "express";
import moment from "moment";
const request = require("request");
const app = express();
const port = 3000;
const envBack = "http://127.0.0.1:8083";


/**
 * Fonction qui écris la query en string
 * @param queryList res.query
 */
function doQuery(queryList: any) {
    let rep = "";
    let separator = "?";
    for (let i in queryList) {
        rep += separator + i + '=' + queryList[i];
        separator = "&";
    }
    return rep;
}

/**
 * Promise qui renvoi true ou false en fonction des horaires d'ouverture
 */
function isOpen(query: any) {
    return new Promise(async (resolve, reject) => {
        let url = envBack + "/timetables" + doQuery(query);
        console.log(url);

        request.get({
            url: url,
            json: true
        }, (err: any, response: any, body: any) => {
            if (err) {
                reject();
                return;
            }
            if (body && body.open) {
                let rep = false;
                let time = moment(query.date).format('X');
                body.timetables.map((timeZone: any) => {
                    if (time >= moment(timeZone.opening).format('X') && time < moment(timeZone.closing).format('X')) {
                        rep = true;
                    }
                })
                resolve(rep);

            } else {
                resolve(false);
            }

        });
    })

}


/**
 * Promise qui renvoi true ou false en fonctions des autres rdv
 */
function isFree(query: any) {
    return new Promise((resolve, reject) => {
        let url = envBack + "/reservations" + doQuery(query);
        console.log(url);
        request.get({
            url: url,
            json: true
        }, (err: any, response: any, body: any) => {
            if (err) {
                console.log('err')
                reject();
                return;
            }
            if (body && body.reservations) {
                let rep = true;
                //Si pas de réservations
                if (!body.reservations.length) {
                    resolve(true);
                    return;
                }
                let time = moment(query.date).format('X')
                body.reservations.map((reservation: any) => {

                    if (time >= moment(reservation.reservationStart).format('X') && time < moment(reservation.reservationEnd).format('X')) {
                        rep = false;
                    }
                })
                resolve(rep);

            } else {
                resolve(false);
            }

        });
    })

}


app.get("/", (req, res) => {
    res.send('API ok');
});


/**
 * EndPoint du test
 */
app.get("/isDispo", async (req, res) => {
    var date = req.query.date;
    var resourceId = req.query.resourceId;

    if (!resourceId) {
        res.status(400).json({ "error": "no resourceId" });
        return
    }
    else if (!moment(date, moment.ISO_8601, true).isValid()) {
        res.status(400).json({ "error": "wrong format for param startDatetime" });
        return;
    }
    else {
        isOpen(req.query).then((rep) => {
            if (rep) {
                isFree(req.query).then((re) => {
                    res.json({ "available": re });
                }, () => res.status(400).json({ "error": "error api" }));
            } else {
                res.json({ "available": false });
            }
        }, () => res.status(400).json({ "error": "error api" }));
    }
    return;
});


/**
 * Mauvais endpoint
 */
app.get("**", (req, res) => {
    res.status(404).send('Erreur 404, endpoint introuvable');
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});