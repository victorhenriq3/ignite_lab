import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { CourseService } from 'src/services/course.service';
import { CreateCouseInput } from '../inputs/create-course-input';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CourseResolver {
  constructor(private courseService: CourseService) {}
  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.courseService.listAllCourses();
  }

  @Mutation(() => Course)
  createCourse(@Args('data') data: CreateCouseInput) {
    return this.courseService.createCourse(data);
  }
}
