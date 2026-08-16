import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders every project card and stack card', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('.project-card').length).toBe(component.projects.length);
    expect(element.querySelectorAll('.rich-stack-card').length).toBe(component.skillGroups.length);
  });

  it('keeps repeated project and stack content visible', () => {
    const element = fixture.nativeElement as HTMLElement;
    const project = element.querySelector<HTMLElement>('.project-card');
    const stackCard = element.querySelector<HTMLElement>('.rich-stack-card');

    expect(project).not.toBeNull();
    expect(stackCard).not.toBeNull();
    expect(getComputedStyle(project!).opacity).not.toBe('0');
    expect(getComputedStyle(stackCard!).opacity).not.toBe('0');
  });
});
