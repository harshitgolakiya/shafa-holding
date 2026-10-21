import "server-only";
import mysql, { type Pool, type ResultSetHeader, type RowDataPacket } from "mysql2/promise";

// One pool per server process. The globalThis slot keeps dev hot-reloads from opening new pools.
const globalForDb = globalThis as unknown as { shafaPool?: Pool; shafaSchema?: Promise<void> };

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL || process.env.MYSQL_HOST);
}

function createPool() {
  const options = {
    waitForConnections: true,
    connectionLimit: Number(process.env.MYSQL_POOL_SIZE ?? 5),
    charset: "utf8mb4",
    timezone: "Z",
    dateStrings: false,
  } as const;

  if (process.env.DATABASE_URL) return mysql.createPool({ uri: process.env.DATABASE_URL, ...options });

  return mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT ?? 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    ...options,
  });
}

function getPool() {
  if (!isDatabaseConfigured()) throw new Error("Database is not configured. Set DATABASE_URL or MYSQL_* variables.");
  if (!globalForDb.shafaPool) {
    const pool = createPool();
    // Store and compare all DATETIME values in UTC, whatever the server's default zone is.
    pool.pool.on("connection", (connection) => connection.query("SET time_zone = '+00:00'"));
    globalForDb.shafaPool = pool;
  }
  return globalForDb.shafaPool;
}

const schema = [
  `CREATE TABLE IF NOT EXISTS cms_users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(254) NOT NULL UNIQUE,
    name VARCHAR(120) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login_at DATETIME NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS cms_sessions (
    token_hash CHAR(64) PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (user_id),
    FOREIGN KEY (user_id) REFERENCES cms_users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS cms_content (
    content_key VARCHAR(64) PRIMARY KEY,
    data JSON NOT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by INT UNSIGNED NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS cms_media (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size INT UNSIGNED NOT NULL,
    data LONGBLOB NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INT UNSIGNED NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    company VARCHAR(160) NULL,
    email VARCHAR(254) NOT NULL,
    phone VARCHAR(40) NULL,
    inquiry_type VARCHAR(80) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new','read','archived') NOT NULL DEFAULT 'new',
    ip_address VARCHAR(64) NULL,
    user_agent VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX (status, created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

// Tables are created on first use, so a fresh cPanel database needs no separate migration step.
async function ensureSchema() {
  const pool = getPool();
  for (const statement of schema) await pool.query(statement);
}

async function ready() {
  globalForDb.shafaSchema ??= ensureSchema().catch((error) => {
    globalForDb.shafaSchema = undefined;
    throw error;
  });
  await globalForDb.shafaSchema;
  return getPool();
}

export async function query<T extends RowDataPacket>(sql: string, params: unknown[] = []) {
  const pool = await ready();
  const [rows] = await pool.query<T[]>(sql, params);
  return rows;
}

export async function execute(sql: string, params: unknown[] = []) {
  const pool = await ready();
  const [result] = await pool.query<ResultSetHeader>(sql, params);
  return result;
}

export type { RowDataPacket };
