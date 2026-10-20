import * as dotenv from 'dotenv';
dotenv.config();

import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { createPool } from "mariadb";

@Injectable()
export class Prismaservice extends PrismaClient implements OnModuleInit {
    constructor() {
        // Não esquecer 'mysql://' para 'mariadb://' em tempo de execução para satisfazer o driver
        const connectionString = (process.env.DATABASE_URL as string).replace('mysql://', 'mariadb://');
        
        const pool = createPool(connectionString);
        
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const adapter = new PrismaMariaDb(pool as any);
        
        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }
}