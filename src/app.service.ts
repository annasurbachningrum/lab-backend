import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMahasiswaDTO } from './dto/create-mahasiswa.dto';
import prisma from './prisma';
import { UpdateMahasiswaDTO } from './dto/update.mahasiswa.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { hashSync, compareSync } from 'bcrypt';
import {LoginUserDTO } from './dto/login-user.dto';
import { JwtService ,JwtModule} from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private readonly jwtService : JwtService) {}

  async login(data: LoginUserDTO) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: data.username,
        },
      });
      if (user === null) {
        throw new NotFoundException("userName yang anda masukkan salah");
      }
  
      // const isPasswordValid = hashSync(data.password, user.password);
      if (compareSync(data.password, user.password) === false) {
        throw new BadRequestException("Password salah");
      }
      const payload = {
        id : user.id,
        username: user.username,
        role: user.role,
      }
      
      const token = await this.jwtService.signAsync(payload);
      return { 
        token : token, 
      };
     
      
  
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException("Ada masalah pada server");
    }
  }
  // }

  async register(data: RegisterUserDTO) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: data.username,
        },
      });
      if (user != null)
        throw new BadRequestException('Username ini Sudah Digunakan');
      const newUser = await prisma.user.create({
        data: {
          username: data.username,
          password: hashSync(data.password, 10),
          role: 'USER',
        },
      });
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException('ada masalah pada server');
    }
  }

  async auth(user_id : number) {
    try {
      const user = await prisma.user.findFirst({
       where : {
         id : user_id
      }
    })
    if(user == null) throw new NotFoundException("User Tidak Ditemukan")
      return user
    }catch(err) {
      if(err instanceof HttpException) throw err
      throw new InternalServerErrorException("Terdapat Masalah Dari Server Harap Coba Lagi dalam beberapa menit")
    }
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getMahasiswa() {
    return await prisma.mahasiswa.findMany();
  }

  async getMahasiswaByNIM(nim: string) {
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where: {
        nim,
      },
    });

    if (mahasiswa == null) throw new NotFoundException('Tidak Menemukan NIM');

    return mahasiswa;
  }

  async addMahasiswa(data: CreateMahasiswaDTO) {
    await prisma.mahasiswa.create({
      data,
    });

    return await prisma.mahasiswa.findMany();
  }

  async deleteMahasiswa(nim: string) {
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where: {
        nim,
      },
    });

    if (mahasiswa == null) {
      throw new NotFoundException('Tidak Menemukan NIM');
    }

    await prisma.mahasiswa.delete({
      where: {
        nim,
      },
    });

    return await prisma.mahasiswa.findMany();
  }

  async updateMahasiswa(nim: string, data: UpdateMahasiswaDTO) {
    const mahasiswa = await prisma.mahasiswa.findFirst({
      where: {
        nim,
      },
    });

    if (mahasiswa == null) {
      throw new NotFoundException('Tidak Menemukan NIM');
    }

    await prisma.mahasiswa.update({
      where: {
        nim,
      },
      data: data,
    });

    return await prisma.mahasiswa.findMany();
  }
}