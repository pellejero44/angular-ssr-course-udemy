import { Component, OnInit, inject } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { map, tap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { CoursesCardListComponent } from '../courses-card-list/courses-card-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Title } from '@angular/platform-browser';
import { AppShellNoRenderDirective } from '../directis/app-shel-no-render.directive';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CoursesCardListComponent,
    AsyncPipe,
    AppShellNoRenderDirective,
  ],
})
export class HomeComponent implements OnInit {
  private readonly title = inject(Title);

  courses$: Observable<Course[]>;

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.title.setTitle('Angular Universal - All Courses');
    this.courses$ = this.coursesService
      .findAllCourses()
      .pipe(map(Object.values));
  }
}
