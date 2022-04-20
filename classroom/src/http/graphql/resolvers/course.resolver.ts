import { UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { CourseService } from 'src/services/course.service';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private courseService: CourseService) {}
  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.courseService.listAllCourses();
  }
}
