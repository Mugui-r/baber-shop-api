import { Module } from "@nestjs/common";
import { Prismaservice } from "./prisma.service";

@Module({
    providers: [Prismaservice],
    exports: [Prismaservice]
})
export class PrismaModule {}