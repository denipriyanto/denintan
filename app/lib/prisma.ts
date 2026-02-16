import { PrismaClient } from "@prisma/client";
// import { createClient } from "@libsql/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const connectionString = `${process.env.DATABASE_URL}`;
const authToken = `${process.env.DATABASE_AUTH_TOKEN}`;

const adapter = new PrismaLibSql({
    url: connectionString,
    authToken,
});

export const prisma = new PrismaClient({ adapter });
