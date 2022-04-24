import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateStudentParams {
  authUserID: string;
}
@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}
  listAllStudents() {
    return this.prisma.student.findMany();
  }

  getStudenteByAuthUserId(authUserID: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserID,
      },
    });
  }

  getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  createStudent({ authUserID }: CreateStudentParams) {
    return this.prisma.student.create({
      data: {
        authUserID,
      },
    });
  }
}
