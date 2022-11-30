const express = require('express');
const controller = require('../controllers/controller.js');
const login_controller = require('../controllers/login_controller.js');
const logout_controller = require('../controllers/logout_controller.js');
const memberlist_controller = require('../controllers/memberlist_controller.js');
const attendance_controller = require('../controllers/attendance_controller.js');
const register_churchgoer_controller = require('../controllers/register_churchgoer_controller.js');
const sessions_controller = require('../controllers/sessions_controller.js');
const register_admin_controller = require('../controllers/register_admin_controller.js')
const app = express.Router();

//-------- Webpages ----------//
app.get('/', controller.getIndex);
app.get('/getIndex', controller.getIndex);
app.get('/login', controller.loadLogin);
app.get('/register-churchgoer', controller.loadRegisterChurchgoer);
app.get('/register-moderator', controller.loadRegisterModerator);
app.get('/loadMembers', controller.loadMembers);
app.get('/load_moderators', controller.loadModerators);
app.get('/profile', controller.loadProfile);
app.get('/admin_homepage', controller.loadAdminHP);
app.get('/attendance', controller.loadAttendance);
app.get('/sessions', controller.loadSessions);
app.get('/deleteMember', memberlist_controller.deleteMember);
app.get('/addSession', sessions_controller.addSession);
app.get('/deleteSession', sessions_controller.deleteSession);
app.get('/sessionAttendance', controller.loadSessionAttendance);
app.get('/deleteAttendance', attendance_controller.deleteAttendance);

//-------- Members Info ---------//
app.get('/addMembers', register_churchgoer_controller.addMembers);
app.get('/addAttendance', attendance_controller.addAttendance);

//-------- Register Actions ---------//
app.get('/addUser', register_churchgoer_controller.getAdd);
app.post('/addMultipleCG', register_churchgoer_controller.addMultiple);
app.get('/getCheckPhone', register_churchgoer_controller.getCheckPhone);
app.get('/addMod', register_admin_controller.getAdd);
app.post('/addMultipleMod', register_admin_controller.addMultiple);
app.get('/getCheckPhoneMod', register_admin_controller.getCheckPhone);

//-------- Login Checking ----------//
app.post('/CheckLogin', login_controller.CheckLogin);

//-------- Logout Checking ----------//
app.get('/logout', logout_controller.getLogout);

//-------- Attendance Checking ----------//
app.get('/getCheckAttendance', attendance_controller.getCheckAttendance);

module.exports = app;
