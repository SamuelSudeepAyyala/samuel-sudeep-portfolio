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

  it('renders recruiter quick facts without adding sensitive employer detail', () => {
    const element = fixture.nativeElement as HTMLElement;
    const cards = element.querySelectorAll('.recruiter-grid article');
    expect(cards.length).toBe(4);
    expect(element.textContent).toContain('M.S. Computer Science');
    expect(element.textContent).toContain('Software + Platform');
  });

  it('includes keyboard and long-page navigation helpers', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.skip-link')).not.toBeNull();
    expect(element.querySelector('.scroll-progress')).not.toBeNull();
    expect(element.querySelector('.back-to-top')).not.toBeNull();
    expect(element.querySelector('a[href*="samuel-sudeep-portfolio"]')).not.toBeNull();
  });
});
