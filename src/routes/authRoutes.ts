import { Router, Request, Response } from "express";
import { register, login } from "../controllers/authController";

const router = Router();


// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
});


// Rute untuk mendaftar pengguna
router.post("/signup", async (req: Request, res: Response) => {
  try {
    await register(req, res);
  } catch (error) {
    console.error(error); // Log error untuk debugging
    res.status(500).json({ message: "Internal server error" });
  }
});

// Rute untuk masuk pengguna
router.post("/login", async (req: Request, res: Response) => {
  try {
    await login(req, res);
  } catch (error) {
    console.error(error); // Log error untuk debugging
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router; // Pastikan Anda mengekspor router
