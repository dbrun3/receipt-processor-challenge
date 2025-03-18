import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.POSTGRES_URL;
if (!url) throw Error("db url not set")

export const db = drizzle(url);

