/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const NodeEnvironment = require('jest-environment-node');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const { exec } = require('child_process');
const util = require('util');

const prismaBinary = './node_modules/.bin/prisma';

const execSync = util.promisify(exec);

class PrismaCustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    const dbUser = process.env.POSTGRES_USER;
    const dbPass = process.env.POSTGRES_PASSWORD;
    const dbHost = process.env.POSTGRES_HOST;
    const dbPort = process.env.POSTGRES_PORT;
    const dbName = process.env.POSTGRES_DB;

    this.schema = `test_${crypto.randomUUID()}`;
    this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;
    await execSync(`${prismaBinary} migrate deploy`);
    return super.setup();
  }

  async teardown() {
    const client = new PrismaClient({
      datasources: { db: { url: this.connectionString } },
    });
    await client.$connect();
    await client.$queryRawUnsafe(
      `DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`,
    );
    await client.$disconnect();
  }
}

module.exports = PrismaCustomEnvironment;
