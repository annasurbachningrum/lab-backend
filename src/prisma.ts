// import { PrismaClient } from '@prisma/client';
// import { Injectable, OnModuleInit } from '@nestjs/common';

// @Injectable()
// export default class PrismaService extends PrismaClient implements OnModuleInit {
//     async onModuleInit() {
//         await this.$connect();
//     }
// }

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;