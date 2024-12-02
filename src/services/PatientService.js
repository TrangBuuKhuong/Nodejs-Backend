import db from "../models/index";
require('dotenv').config();
import emailService from './EmailService'
let postBookApointment = (data) => {
    console.log(data)
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }

            else {
                //upsert
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: "Khangmapmapmummim",
                    time: '8:00-9:00 3/12/2024',
                    redirectLink: `https://gemini.google.com`
                })

                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    },
                });
                // create a booking record
                if (user && user[0]) {
                    await db.Bookings.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }

                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save for patient succeed',
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    postBookApointment: postBookApointment
}