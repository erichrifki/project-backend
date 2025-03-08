import { Router, Request, Response } from "express";
import { register, login } from "../controllers/authController";
import passport from "../config/passport";

const router = Router();

// Endpoint untuk Google Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback setelah login dengan Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req: Request, res: Response): void => {
    // Pastikan TypeScript mengenali `req.user` sebagai objek yang memiliki `user` dan `token`
    const userData = req.user as { user: any; token: string } | undefined;

    if (!userData) {
      res.status(401).json({ message: "Login gagal" });
      return;
    }

    // Kirim user dan token ke frontend
    res.json({ message: "Google login successful", user: userData.user, token: userData.token });
  }
);


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
