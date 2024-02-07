const express = require("express");
const { getUserDB, postUserDB, deleteUserDB, putUserDB } = require("../model");
const router = express.Router();

const getUser = (req, res) => {
	const users = getUserDB();
	// []
	if (!users || users.length == 0) return res.status(404).json({message:"Пользователей нет", success: false});
	else return res.status(200).json(users);
};
const postUser = (req, res) => {
	const users = postUserDB(req.body, req.params.id);
	if (users && users.length != 0) 
		return res.status(404).json({error: users, message:"Пользователей нет", success: false});
	else return res.status(200).json({message:"Пользователей добавлен", success: true});
};

const deleteUser = (req, res) => {
	const users = deleteUserDB(req.params.id);
	if (users && users.length != 0) 
		return res.status(404).json({error: users, message:"Пользователей нет", success: false});
	else return res.status(200).json({message:"Пользователь удалён", success: true});
};
const putUser = (req, res) => {
	const users = putUserDB(req.body, req.params.id);
	if (users && users.length != 0) 
		return res.status(404).json({error: users, message:"Пользователей нет", success: false});
	else return res.status(200).json({message:"Пользователь изменен", success: true});

};

module.exports = { getUser, postUser, deleteUser, putUser};
