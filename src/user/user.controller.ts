import { Controller, Post, Body, Get, Param, Patch, Put, Delete, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto ";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService){}

  @Post()
  async create(@Body() data: CreateUserDTO) {
     return this.userService.create(data);
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return this.userService.show(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
    return this.userService.updatePartial(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() {email, name, password}: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
    return {
      method: 'patch',
      email, name, password,
      id,
    };
  }

  @Delete (':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
    
  }
}
  