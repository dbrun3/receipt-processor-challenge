import { text, jsonb, pgTable, timestamp, uuid, real } from "drizzle-orm/pg-core";

export const receipts = pgTable('receipts', {
    id: uuid().defaultRandom(),
    retailer: text(),
    purchaseDatetime: timestamp({ mode: "date"}),
    total: real(),
    items: jsonb()
})