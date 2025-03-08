import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../Entity/User";
import { AppDataSource } from "../database";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const userRepository = AppDataSource.getRepository(User);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Cek apakah pengguna sudah ada di database
        let user = await userRepository.findOne({ where: { email: profile.emails?.[0].value } });

        if (!user) {
          // Buat pengguna baru jika belum terdaftar
          user = userRepository.create({
            name: profile.displayName,
            email: profile.emails?.[0].value,
            password: "", // Kosongkan karena login dengan Google
          });

          await userRepository.save(user);
        }

        // Buat JWT token
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_SECRET!,
          { expiresIn: "1h" }
        );

        const userWithoutPassword = { ...user, password: undefined };

        return done(null, { user: userWithoutPassword, token });
      } catch (error: unknown) {
        return done(error instanceof Error ? error : new Error(String(error)), false);

      }
    }
  )
);


export default passport;
