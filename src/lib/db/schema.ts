import { pgTable, text, timestamp, boolean, json } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").default(false).notNull(),
  name: text("name").notNull(),
  image: text("image"),
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
  userId: text("userId").notNull(),
  expiresAt: timestamp("expiresAt", { withTimezone: true }).notNull(),
  token: text("token").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
});

export const accounts = pgTable("account", {
  id: text("id").primaryKey(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
  providerId: text("providerId").notNull(),
  accountId: text("accountId").notNull(),
  userId: text("userId").notNull(),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt", { withTimezone: true }),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt", { withTimezone: true }),
  scope: text("scope"),
  password: text("password"),
});

export const verifications = pgTable("verification", {
  id: text("id").primaryKey(),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt", { withTimezone: true }).notNull(),
  identifier: text("identifier").notNull(),
});

export const meetings = pgTable("meeting", {
    id: text("id").primaryKey(),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
    userId: text("userId").notNull().references(() => users.id),
    title: text("title").notNull(),
    audioFilePath: text("audioFilePath"),
});

export const transcripts = pgTable("transcript", {
    id: text("id").primaryKey(),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
    meetingId: text("meetingId").notNull().references(() => meetings.id),
    content: json("content"),
});

export const summaries = pgTable("summary", {
    id: text("id").primaryKey(),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
    meetingId: text("meetingId").notNull().references(() => meetings.id),
    content: text("content"),
    actionItems: json("actionItems"),
});

export const payments = pgTable("payment", {
    id: text("id").primaryKey(),
    createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
    userId: text("userId").notNull().references(() => users.id),
    subscriptionId: text("subscriptionId"),
    status: text("status"),
});
