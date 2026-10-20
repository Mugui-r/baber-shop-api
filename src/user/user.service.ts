import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto ";
import { Prismaservice } from "src/prisma/prisma.service";
import { notDeepEqual } from "node:assert";

@Injectable()
export class UserService {

    constructor(private readonly prisma: Prismaservice) {}

   async create({email, name, password}: CreateUserDTO){

       return this.prisma.users.create({
            data: {
                email,
                name,
                password
            },
        });
        
        

    }

    async list() {

            return this.prisma.users.findMany()
        };

    async show(id: number) {
        return this.prisma.users.findUnique({
            where: {
                id,
            }
        })
    }

    async update(id: number, {email, name, password, birthAt}: UpdatePutUserDTO) {

        await this.exists(id);
        return this.prisma.users.update({
            data: {email, name, password, birthAt: birthAt ? new Date(birthAt) : null},
            where: {
                id

            },
        });
    }

     async updatePartial(id: number, {email, name, password, birthAt}: UpdatePatchUserDTO) {

        await this.exists(id);
        
        const data: any = {};

        if (birthAt) {
            data.birthAt = new Date(birthAt);
        }

        if (email) {
            data.email = email;
        }

        if (name) {
            data.name = name;
        }

        if (password) {
            data.password = password;
        }

        return this.prisma.users.update({
            data,
            where: {
                id

            },
        });
    }

    async delete(id: number) {

        await this.exists(id);

        return this.prisma.users.delete({
            where: {
                id,
            },
        });
    }

    async exists(id: number) {
        if (!(await this.show(id))) {
            throw new NotFoundException(`O usuário ${id} não existe.`)
        }
    }
}

