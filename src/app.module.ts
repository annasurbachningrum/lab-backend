import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import {ServerStaticModule} from './nestjs/server-static';
// import PrismaService from './prisma';
import { join} from 'path';
import { JwtModule } from '@nestjs/jwt';

@Module({
  
  imports: [
    JwtModule.register({
      secret:"hsjdshds"
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
