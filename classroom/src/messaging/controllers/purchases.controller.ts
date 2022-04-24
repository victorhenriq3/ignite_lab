import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CourseService } from 'src/services/course.service';
import { EnrollmentService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';

export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CourseService,
    private enrollmentService: EnrollmentService,
  ) {}
  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.getStudenteByAuthUserId(
      payload.customer.authUserId,
    );

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserID: payload.customer.authUserId,
      });
    }

    let course = await this.coursesService.getCourseBySlug(
      payload.product.slug,
    );

    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title,
      });
    }

    await this.enrollmentService.createEnrollment({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
