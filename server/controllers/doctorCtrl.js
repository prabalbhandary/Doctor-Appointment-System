import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModels.js";

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Doctor Details",
    });
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};

//get single docotor
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Sigle Doc Info Fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Erro in Single docot info",
    });
  }
};

const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });

    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: error.message || error,
      message: "Error in Doctor Appointments",
    });
  }
};


const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notifcation = user.notifcation;
    notifcation.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};

export {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
};
