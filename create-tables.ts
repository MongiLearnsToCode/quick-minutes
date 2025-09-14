import { Pool } from "pg";

async function createTables() {
  // Get the database URL from environment variables
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error("DATABASE_URL environment variable is not set");
    process.exit(1);
  }
  
  console.log("Database URL is set");
  
  // Create PostgreSQL connection pool
  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });
  
  try {
    console.log("Creating database tables...");
    
    // Create user table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        id TEXT PRIMARY KEY,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        email TEXT UNIQUE NOT NULL,
        "emailVerified" BOOLEAN DEFAULT false NOT NULL,
        name TEXT NOT NULL,
        image TEXT
      )
    `);
    
    // Create session table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "session" (
        id TEXT PRIMARY KEY,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        "userId" TEXT NOT NULL,
        "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
        token TEXT NOT NULL,
        "ipAddress" TEXT,
        "userAgent" TEXT
      )
    `);
    
    // Create account table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "account" (
        id TEXT PRIMARY KEY,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        "providerId" TEXT NOT NULL,
        "accountId" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        "accessToken" TEXT,
        "refreshToken" TEXT,
        "idToken" TEXT,
        "accessTokenExpiresAt" TIMESTAMP WITH TIME ZONE,
        "refreshTokenExpiresAt" TIMESTAMP WITH TIME ZONE,
        scope TEXT,
        password TEXT
      )
    `);
    
    // Create verification table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "verification" (
        id TEXT PRIMARY KEY,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        value TEXT NOT NULL,
        "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL,
        identifier TEXT NOT NULL
      )
    `);
    
    console.log("Database tables created successfully!");
  } catch (error) {
    console.error("Error creating database tables:", error);
  } finally {
    // Close the pool
    await pool.end();
  }
}

createTables();