import { defineConfig } from "drizzle-kit";

const url = process.env.POSTGRES_URL;
if (!url) throw Error("db url not set")

export default defineConfig({
  dialect: "postgresql",
  schema: "./database/schema.ts",
  dbCredentials: {
    url: url,
  },
});