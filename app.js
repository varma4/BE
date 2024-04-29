const express = require("express");
const app = express();
const cors = require('cors')
const patientRouter = require("./routes/patientRouter");
const doctorRouter =require("./routes/doctorRouter")
const nurseRouter =require("./routes/nurseRouter")
const adminRouter =require("./routes/adminRouter")
const departmentRouter =require("./routes/departmentRouter")
const appointmentRouter =require("./routes/appointmentRouter")
const medicalRecordRouter =require("./routes/medicalRecordRouter")
const providerRouter =require("./routes/providerRouter")
const InventoryItemRouter =require("./routes/InventoryItemRouter")
const billingRouter =require("./routes/billingRouter")
const paymentRouter =require("./routes/paymentRouter")
const prescriptionRouter =require("./routes/prescriptionRouter")
const testRouter =require("./routes/testRouter")
const testResultRouter =require("./routes/testResultRouter")
const roomRouter =require("./routes/roomRouter")
const admissionRouter =require("./routes/admissionRouter")
const surgeryRouter =require("./routes/surgeryRouter")
const appointmentTypeRouter =require("./routes/appointmentTypeRouter")
const inventoryItemPrescriptionRouter =require("./routes/inventoryItemPrescriptionRouter")
app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
  res.send("working");
});

app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/nurse", nurseRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/department", departmentRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/medicalRecord", medicalRecordRouter);
app.use("/api/v1/provider", providerRouter);
app.use("/api/v1/InventoryItem", InventoryItemRouter);
app.use("/api/v1/billing", billingRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/prescription", prescriptionRouter);
app.use("/api/v1/test", testRouter);
app.use("/api/v1/testResult", testResultRouter);
app.use("/api/v1/room", roomRouter);
app.use("/api/v1/admission", admissionRouter);
app.use("/api/v1/surgery", surgeryRouter);
app.use("/api/v1/appointmentType", appointmentTypeRouter);
app.use("/api/v1/inventoryItemPrescription", inventoryItemPrescriptionRouter);


module.exports = app;