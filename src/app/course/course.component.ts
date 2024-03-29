import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Lesson } from '../model/lesson';
import { Meta, Title } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule, MatTableModule],
})
export class CourseComponent implements OnInit {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  course: Course;

  dataSource: MatTableDataSource<Lesson>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.title.setTitle(this.course.description);
    this.meta.addTags([
      {
        name: 'description',
        content: this.course.longDescription,
      },
      {
        property: 'twitter:card',
        content: 'summary',
      },
      {
        property: 'twitter:site',
        content: '@AngularUniversal',
      },
      {
        property: 'twitter:title',
        content: this.course.description,
      },
      {
        property: 'twitter:description',
        content: this.course.description,
      },
      {
        property: 'twitter:text:description',
        content: this.course.description,
      },
      {
        property: 'twitter:image',
        content: 'https://avatars3.githubusercontent.com/u/16628445?v=3&s=200',
      },
    ]);
    this.dataSource = new MatTableDataSource([]);

    this.coursesService
      .findAllCourseLessons(this.course.id)
      .subscribe((lessons) => (this.dataSource.data = lessons));
  }
}
