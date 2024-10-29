import patientService from '../services/PatientService';
let postBookApointment = async (req, res) => {
    try {

        let info = await patientService.postBookApointment(req.body)
        return res.status(200).json(
            info
        )
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    postBookApointment: postBookApointment
}