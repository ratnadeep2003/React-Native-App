import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import { connectDB } from '../db/connect';
import { User } from '../models/User';

dotenv.config();

const seed = async () => {
  await connectDB();
  await User.deleteMany({});

  const users = Array.from({ length: 150 }, () => ({
    firstname: faker.person.firstName(),
    surname: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password({ length: 10 }),
  }));

  await User.insertMany(users);
  console.log('Seeded 150 users');
  process.exit(0);
};

seed();