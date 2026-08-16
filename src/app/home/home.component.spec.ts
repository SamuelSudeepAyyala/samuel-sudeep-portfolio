import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render every project with a complete visual treatment', () => {
    const visuals = fixture.nativeElement.querySelectorAll('.project-visual');
    expect(visuals.length).toBe(component.projects.length);
    expect(component.projects.every(project => Boolean(project.visual))).toBeTrue();
  });

  it('should keep technology marks local and independent of remote image CDNs', () => {
    expect(component.techLogos.length).toBeGreaterThan(12);
    expect(component.techLogos.every(tech => Boolean(tech.mark) && Boolean(tech.color))).toBeTrue();
    expect(fixture.nativeElement.querySelectorAll('.tech-marquee img').length).toBe(0);
  });

  it('should render the stack as complete cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.rich-stack-card');
    expect(cards.length).toBe(component.skillGroups.length);
    expect(component.skillGroups.every(group => group.items.length >= 6)).toBeTrue();
  });

  it('should expose projects in primary navigation', () => {
    const navText = fixture.nativeElement.querySelector('#primary-navigation')?.textContent ?? '';
    expect(navText).toContain('Projects');
  });
});
