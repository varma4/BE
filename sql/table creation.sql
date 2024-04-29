-- Create Patient table
CREATE TABLE Patient (
    PatientID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Gender VARCHAR(10),
    DateOfBirth DATE,
    ContactNumber VARCHAR(20),
    Address VARCHAR(255),
    Email VARCHAR(100),
    InsuranceInformation VARCHAR(255)
);

-- Create Doctor table
CREATE TABLE Doctor (
    DoctorID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    ContactNumber VARCHAR(20),
    Email VARCHAR(100),
    Scheduling VARCHAR(255)
);

-- Create Nurse table
CREATE TABLE Nurse (
    NurseID INT PRIMARY KEY AUTO_INCREMENT,
    Department VARCHAR(100),
    Name VARCHAR(100),
    Email VARCHAR(100),
    Scheduling VARCHAR(255)
);

-- Create AdministrativeStaff table
CREATE TABLE AdministrativeStaff (
    StaffID INT PRIMARY KEY AUTO_INCREMENT,
    Role VARCHAR(100),
    Email VARCHAR(100),
    Department VARCHAR(100),
    Name VARCHAR(100)
);

-- Create Department table
CREATE TABLE Department (
    DepartmentID INT PRIMARY KEY AUTO_INCREMENT,
    HeadDoctorID INT,
    Description VARCHAR(255),
    Name VARCHAR(100),
    FOREIGN KEY (HeadDoctorID) REFERENCES Doctor(DoctorID)
);

-- Create Appointment table
CREATE TABLE Appointment (
    AppointmentID INT PRIMARY KEY AUTO_INCREMENT,
    PatientID INT,
    DoctorID INT,
    AppointmentDate DATE,
    AppointmentTime TIME,
    Status VARCHAR(20),
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID)
);

-- Create MedicalRecord table
CREATE TABLE MedicalRecord (
    RecordID INT PRIMARY KEY AUTO_INCREMENT,
    PatientID INT,
    DoctorID INT,
    TestResults TEXT,
    Medication TEXT,
    TreatmentPlan TEXT,
    Diagnosis TEXT,
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID)
);

-- Create Provider table
CREATE TABLE Provider (
    ProviderID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Phone VARCHAR(20),
    Email VARCHAR(100),
    Address VARCHAR(255)
);

-- Create InventoryItem table
CREATE TABLE InventoryItem (
    ItemID INT PRIMARY KEY AUTO_INCREMENT,
    SupplierID INT,
    Name VARCHAR(100),
    Description VARCHAR(255),
    Quantity INT,
    ExpirationDate DATE,
    FOREIGN KEY (SupplierID) REFERENCES Provider(ProviderID)
);

-- Create Billing table
CREATE TABLE Billing (
    BillID INT PRIMARY KEY AUTO_INCREMENT,
    PatientID INT,
    TotalAmount DECIMAL(10,2),
    PaymentStatus VARCHAR(20),
    BillDate DATE,
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID)
);

-- Create Payment table
CREATE TABLE Payment (
    PaymentID INT PRIMARY KEY AUTO_INCREMENT,
    BillID INT,
    PaymentCode VARCHAR(20),
    PaymentMethod VARCHAR(50),
    PaymentAmount DECIMAL(10,2),
    FOREIGN KEY (BillID) REFERENCES Billing(BillID)
);

-- Create Prescription table
CREATE TABLE Prescription (
    PrescriptionID INT PRIMARY KEY AUTO_INCREMENT,
    PatientID INT,
    DoctorID INT,
    Date DATE,
    Medication VARCHAR(255),
    Dosage VARCHAR(50),
    Frequency VARCHAR(50),
    Duration VARCHAR(50),
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID)
);

-- Create Test table
CREATE TABLE Test (
    TestID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Cost DECIMAL(10,2),
    Description TEXT
);

-- Create TestResult table
CREATE TABLE TestResult (
    ResultID INT PRIMARY KEY AUTO_INCREMENT,
    TestID INT,
    PatientID INT,
    DoctorID INT,
    ResultDetails TEXT,
    ResultDate DATE,
    FOREIGN KEY (TestID) REFERENCES Test(TestID),
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID),
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID)
);

-- Create Room table
CREATE TABLE Room (
    RoomID INT PRIMARY KEY AUTO_INCREMENT,
    RoomNumber VARCHAR(20),
    RoomType VARCHAR(50),
    Availability BOOLEAN
);

-- Create Admission table
CREATE TABLE Admission (
    AdmissionID INT PRIMARY KEY AUTO_INCREMENT,
    PatientID INT,
    RoomID INT,
    Status VARCHAR(20),
    Reason VARCHAR(255),
    DischargeDate DATE,
    AdmissionDate DATE,
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID),
    FOREIGN KEY (RoomID) REFERENCES Room(RoomID)
);

-- Create Surgery table
CREATE TABLE Surgery (
    SurgeryID INT PRIMARY KEY AUTO_INCREMENT,
    RoomID INT,
    DoctorID INT,
    Status VARCHAR(20),
    SurgeryDate DATE,
    SurgeryType VARCHAR(100),
    FOREIGN KEY (RoomID) REFERENCES Room(RoomID),
    FOREIGN KEY (DoctorID) REFERENCES Doctor(DoctorID)
);

-- Create AppointmentType table
CREATE TABLE AppointmentType (
    TypeID INT PRIMARY KEY AUTO_INCREMENT,
    TypeName VARCHAR(100),
    Dimensions VARCHAR(255)
);
