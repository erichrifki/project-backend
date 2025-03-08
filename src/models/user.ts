import { AppDataSource } from "../database"; // Pastikan path ini benar
import { User } from "../Entity/User"; // Pastikan path ini benar

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const userRepository = AppDataSource.getRepository(User); // Gunakan AppDataSource
  const user = userRepository.create({ name, email, password });
  return await userRepository.save(user);
};

export const findUserByEmail = async (email: string) => {
  const userRepository = AppDataSource.getRepository(User); // Gunakan AppDataSource
  return await userRepository.find({ where: { email } });
};
