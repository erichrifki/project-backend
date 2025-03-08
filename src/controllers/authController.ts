import { Request, Response } from "express";
import { createUser, findUserByEmail } from "../models/user";
import { User } from "../Entity/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Cek apakah pengguna sudah ada
    const existingUser = (await findUserByEmail(email)) as User[];
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const newUser = await createUser(name, email, hashedPassword);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error during registration:", error); // Logging error
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = (await findUserByEmail(email)) as User[];
    if (existingUser.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser[0].password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Buat token JWT
    const token = jwt.sign({ id: existingUser[0].id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error); // Logging error
    res.status(500).json({ message: "Internal server error" });
  }
};
