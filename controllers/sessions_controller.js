const db = require("../models/db.js");
const Session = require("../models/SessionModel");
const Attendance = require("../models/AttendanceModel.js");

const sessions_controller = {
    addSession: function(req,res) {
        var temptoday = new Date();
        var month = temptoday.getMonth();
        var day = temptoday.getDate();
        var year = temptoday.getFullYear();
        var session = req.query.session;
        var today = new Date(year, month, day, +8, 0, 0);
        db.findOne(Session, {date: today, session: session}, null, (data) => {
            if (data){
                console.log("Session Exists");
                console.log(data);
            }
            else{
                db.insertOne(Session, {date: today, session: session}, (data2) => {
                    console.log("Session Added");
                    console.log(data2);
                });
            }
            
        });
    },

    deleteSession: function (req, res) {
        var session = req.query.session;
        var date = new Date(req.query.date);
        db.deleteOne (Session, {date: date, session: session}, result => {
            if (result)
                console.log("deleted");
            else
                console.log("fail");
        });
        db.deleteMany (Attendance, {date: date, session: session}, result =>{
            console.log("deleted");
        });
        res.redirect("/sessions");
    },

    generateReport: function(req, res) {
        db.findMany(Session, {}, null, (data) => {
            // TODO: NOT DONE HERE, DATE FORMATTING
            res.send(data);
        });
    },

    searchInfo: function(req, res) {
        db.findOne(Session, {date: req.query.date, session: req.query.session}, null, (data) => {
            res.send(data);
        });
    },
};

module.exports = sessions_controller;
