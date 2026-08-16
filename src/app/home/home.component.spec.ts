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

  it('renders one top-layer project context popover per project', () => {
    const element = fixture.nativeElement as HTMLElement;
    const triggers = Array.from(element.querySelectorAll<HTMLButtonElement>('.case-study-trigger'));
    const popovers = Array.from(element.querySelectorAll<HTMLElement>('.case-study-popover'));

    expect(triggers.length).toBe(component.projects.length);
    expect(popovers.length).toBe(component.projects.length);
    expect(element.querySelectorAll('.case-study-details').length).toBe(0);

    const ids = popovers.map((popover) => popover.id);
    expect(new Set(ids).size).toBe(component.projects.length);
    triggers.forEach((trigger) => {
      expect(ids).toContain(trigger.getAttribute('popovertarget') || '');
    });
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

  it('keeps primary portfolio links and resume actions present', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('a[href="./assets/Samuel_Sudeep_Ayyala_Resume.pdf"]')).not.toBeNull();
    expect(element.querySelector('a[href="https://github.com/SamuelSudeepAyyala"]')).not.toBeNull();
    expect(element.querySelector('a[href="https://www.linkedin.com/in/samuelsudeepayyala/"]')).not.toBeNull();
    expect(element.querySelector('a[href="mailto:ayyalasamuelsudeep@gmail.com"]')).not.toBeNull();
  });
});
