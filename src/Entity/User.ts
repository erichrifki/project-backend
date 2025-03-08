import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  constructor() {
    this.id = 0; // Inisialisasi default
    this.name = ""; // Inisialisasi default
    this.email = ""; // Inisialisasi default
    this.password = ""; // Inisialisasi default
  }
}
