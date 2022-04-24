import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface getByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

interface createEnrollmentParams {
  courseId: string;
  studentId: string;
}
@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  getByCourseAndStudentId({
    courseId,
    studentId,
  }: getByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listEnrollmentsByStudentId(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  createEnrollment({ courseId, studentId }: createEnrollmentParams) {
    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      },
    });
  }
}
