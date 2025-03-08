import { Router, Request, Response } from "express";
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


export default router;
