import PDFDocument from "pdfkit";
import crypto from "crypto";
import fs from "fs";

export const convertUserProfileToPDF = async (userProfileData) => {
    const document = new PDFDocument();

    const output_path = `${crypto.randomBytes(32).toString("hex")}.pdf`;
    const stream = fs.createWriteStream("uploads/" + output_path);

    document.pipe(stream);
    document.image(`uploads/${userProfileData.userId.profilePicture}`, {align: "center", width: 100});
    document.fontSize(14).text(`Name: ${userProfileData.userId.name}`);
    document.fontSize(14).text(`Username: ${userProfileData.userId.username}`); 
    document.fontSize(14).text(`Email: ${userProfileData.userId.email}`);
    document.fontSize(14).text(`Bio: ${userProfileData.bio}`);
    document.fontSize(14).text(`Current Position: ${userProfileData.currentPost}`);

    document.fontSize(14).text("Past Work: ");
    userProfileData.pastWork.forEach((element, index) => {
        document.fontSize(14).text(`Company Name: ${element.company}`);
        document.fontSize(14).text(`Position: ${element.position}`);
        document.fontSize(14).text(`Years: ${element.years}`);
    });

    document.end();

    return output_path;
};