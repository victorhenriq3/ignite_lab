import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { DatabaseModule } from 'src/database/database.module';
import { CourseService } from 'src/services/course.service';
import { EnrollmentService } from 'src/services/enrollments.service';
import { StudentsService } from 'src/services/students.service';
import { CourseResolver } from './graphql/resolvers/course.resolver';
import { EnrollmentResolver } from './graphql/resolvers/enrollment.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Resolvers
    CourseResolver,
    EnrollmentResolver,
    StudentsResolver,

    // Services
    CourseService,
    EnrollmentService,
    StudentsService,
  ],
})
export class HttpModule {}
