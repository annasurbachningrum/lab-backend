// import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
// import { Response } from 'express';
// import { AppService } from './app.service';
// import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
// import { CreateMahasiswaDTO } from './dto/create-mahasiswa.dto';
// import { RegisterUserDTO } from './dto/register-user.dto';
// import { LoginDTO } from './dto/login.dto';
// import { plainToClass, plainToInstance } from 'class-transformer';
// import { User } from './entity/user.entity';
// import { UserDecorator } from './user.decorator';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Post("login") 
//   @ApiBody({
//     type : LoginDTO
//   })
//   async login(@Body() data : LoginDTO,
//   @Res({ passthrough: true }) res: Response) {
//     const result = await this.appService.login(data);
//     res.cookie("token", result.token);

//     result.user = plainToInstance(User, result.user);
//     return result;
//   }
  
//   @Post("register")
//   @ApiBody({type : RegisterUserDTO})
//   register(@Body() user : RegisterUserDTO) {
//     return this.appService.register(user)
//   }

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }

//   @Get("mahasiswa")
//   getMahasiswa() {
//     return this.appService.getMahasiswa();
//   }

//   @Get("mahasiswa/:nim")
//   getMahasiswaByNim(@Param("nim") nim : string) {
//     return this.appService.getMahasiswByNim(nim)
//   }

//   @Post("mahasiswa")
//   @ApiBody({type : CreateMahasiswaDTO})
//   createMahasiswa( @Body() data : CreateMahasiswaDTO ) {
//     return this.appService.addMahasiswa(data)
//   }

//   @Delete("mahasiswa/:nim")
//   deleteMahasiswa( @Param("nim") nim : string ) {
//     return this.appService.menghapusMahasiswa(nim)
//   }

//   @Put("mahasiswa/:nim")
//   @ApiBody({type : CreateMahasiswaDTO})
//   updateMahasiswa( @Param("nim") nim : string, @Body() data : CreateMahasiswaDTO ) {
//     return this.appService.updateMahasiswa(nim, data)
//   }

//   @Get("/auth")
//   @UseGuards(AuthGuard)
//   @ApiBearerAuth()
//   auth(@UserDecorator() user : User) {
//     return user
//   }

// }
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateMahasiswaDTO } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDTO } from './dto/update.mahasiswa.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { PassThrough } from 'stream';
import { Response } from 'express';
import { type } from 'os';
import { AuthGuard } from './auth.guard';
import { UserDecorator } from './user.decorator';
import { User } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('Mahasiswa')
  @ApiBody({ type: CreateMahasiswaDTO })
  createMahasiswa(@Body() data: CreateMahasiswaDTO) {
    return this.appService.addMahasiswa(data);
  }

  @Post('register')
  @ApiBody({ type: RegisterUserDTO })
  register(@Body() data: RegisterUserDTO) {
    return this.appService.register(data);
  }

  @Delete('Mahasiswa/:nim')
  deleteMahasiswa(@Param('nim') nim: string) {
    return this.appService.deleteMahasiswa(nim);
  }

  @Post('login')
  @ApiBody({ type: LoginUserDTO })
  async login(@Body() data: LoginUserDTO,
  @Res({passthrough: true}) res : Response) {
    const result = await this.appService.login(data);
    res.cookie('token',result.token);
    return this.appService.login(data);
  }
    
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Put('Mahasiswa/:nim')
  @ApiBody({ type: UpdateMahasiswaDTO })
  editMahasiswa(@Param('nim') nim: string, @Body() data: UpdateMahasiswaDTO) {
    return this.appService.updateMahasiswa(nim, data);
  }

  @Get("/auth")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  auth(@UserDecorator() user : User) {
  return user
 }


  


  // @Get('Mahasiswa')
  // getMahasiswa() {
  //   return this.appService.getMahasiswa();
  // }

  // @Get('Mahasiswa/:nim')
  // getMahasiswaByNim(@Param('nim') nim: string) {
  //   return this.appService.getMahasiswaByNIM(nim);
  // }
}