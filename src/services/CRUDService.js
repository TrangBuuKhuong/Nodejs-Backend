import bcrypt from "bcryptjs";
import db from "../models/index";
import { raw } from "body-parser";

const salt = bcrypt.genSaltSync(10);

let createUser = async (data) => {
    console.log(data);
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleid,
            });
            resolve("Ok create new user succeed");
        } catch (e) {
            reject(e);
        }
    });
};
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({ raw: true });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};
// Use promise help to avoid error
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (user) {
                resolve(user);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    });
};
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {

                user.firstName = data.firstname;
                user.lastName = data.lastname;
                user.address = data.address;
                await user.save();
                let alluser = await db.User.findAll();
                resolve(alluser);
            }
            else {
                resolve();
            }
        } catch (error) {
            console.log(e);
        }
    });
};
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            resolve(); //return;
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createUser: createUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
};
