/*

import { Request, Response } from "express";
import { User } from "../Entity/User";
import { AppDataSource } from "../database";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const userRepository = AppDataSource.getRepository(User);

// 1️⃣ Kirim email dengan token reset password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Buat token reset password
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "15m" });

    // Kirim email (Gunakan Nodemailer)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password",
      html: `<p>Klik link ini untuk reset password: <a href="${process.env.CLIENT_URL}/reset-password?token=${resetToken}">Reset Password</a></p>`,
    });

    res.json({ message: "Reset password email sent" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// 2️⃣ Reset password dengan token
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    // Verifikasi token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await userRepository.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(400).json({ message: "Invalid token or user not found" });
    }

    // Hash password baru dan update ke database
    user.password = await bcrypt.hash(newPassword, 10);
    await userRepository.save(user);

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
};


*/