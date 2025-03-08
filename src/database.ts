import { DataSource } from "typeorm";
import { User } from "./Entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "project_random",
  entities: [User],
  synchronize: true, // Hanya untuk pengembangan, jangan gunakan di produksi
});

// Fungsi untuk menghubungkan ke database
export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error during database connection:", error);
  }
};
