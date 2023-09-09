//import { Client } from "@planetscale/database";
//import { drizzle } from "drizzle-orm/planetscale-serverless";
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';

import * as auth from "./schema/auth";
import * as beasts from "./schema/beasts";

export const schema = { ...auth, ...beasts };

export { pgSqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

if (!process.env.VERCEL_ENV) {
  neonConfig.wsProxy = (host) => `127.0.0.1/v1`;
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DATABASE_URL! + '?ssl=require');
//const queryClient = postgres('postgres://postgres:postgres@localhost:5432');

export const db = drizzle(sql, { schema })
