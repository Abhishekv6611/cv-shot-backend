import nodemailer from 'nodemailer'
import dotenv from "dotenv";
import { verificationTokenEmailTemplate } from './email-template.js'
dotenv.config();

const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASS
    }
})
export const ForgetPass=async(email,resetUrl)=>{
    const mailOption={
        from:`CV-shot ${process.env.GMAIL_USER}`,
        to:email,
        subject:"Want to reset your password",
        html:verificationTokenEmailTemplate(resetUrl)
    }
    try {
        await transport.sendMail(mailOption)
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error sending email",error);
    }
}

export const sendResetPasswordEmail=async(email)=>{
    const mailOptions = {
        from:`CV-shot ${process.env.GMAIL_USER}`,        to: email,
        subject: "Password reset successful",
        html: `Your password has been reset successfully.`,
      };
    
      try {
        await transport.sendMail(mailOptions);
        console.log("Password reset successfully!");
      } catch (error) {
        console.error("Error sending Password reset:", error);
      }
}
