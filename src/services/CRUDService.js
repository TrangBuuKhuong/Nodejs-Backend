import bcrypt from 'bcryptjs';
import db from "../models/index";

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
                gender: data.gender ==='1'? true :false,
                roleId: data.roleid
            });
            resolve("Ok create new user succeed");
        }
        catch (e) {
            reject(e)
        }
    })

}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createUser: createUser
}