import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CourseService } from 'src/services/course.service';
import { EnrollmentService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { PurchaseController } from './controllers/purchases.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PurchaseController],
  providers: [StudentsService, CourseService, EnrollmentService],
})
export class MessagingModule {}
