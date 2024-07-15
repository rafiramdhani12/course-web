import { serial, text, pgTable, varchar } from "drizzle-orm/pg-core";
export const List = pgTable("List", {
  id: serial("id").primaryKey(),
  title: varchar("title"),
  content: text("content"),
  description: text("description"),
  detail: text("detail"),
  price: varchar("price"),
  img: varchar("img"),
});

export const User = pgTable("User", {
  id: serial("id").primaryKey(),
  username: varchar("username"),
  password: varchar("password"),
  role: varchar("role").$default("customer"),
});
