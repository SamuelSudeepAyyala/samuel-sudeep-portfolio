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

  it('renders one correctly labelled top-layer project popover per project', () => {
    const element = fixture.nativeElement as HTMLElement;
    const triggers = Array.from(element.querySelectorAll<HTMLButtonElement>('.case-study-trigger'));
    const popovers = Array.from(element.querySelectorAll<HTMLElement>('.case-study-popover'));
    const dialogs = Array.from(element.querySelectorAll<HTMLElement>('.case-study-modal'));

    expect(triggers.length).toBe(component.projects.length);
    expect(popovers.length).toBe(component.projects.length);
    expect(dialogs.length).toBe(component.projects.length);
    expect(element.querySelectorAll('.case-study-details').length).toBe(0);

    const ids = popovers.map((popover) => popover.id);
    expect(new Set(ids).size).toBe(component.projects.length);
    triggers.forEach((trigger) => {
      expect(ids).toContain(trigger.getAttribute('popovertarget') || '');
    });

    dialogs.forEach((dialog) => {
      expect(dialog.getAttribute('role')).toBe('dialog');
      expect(dialog.hasAttribute('aria-modal')).toBeFalse();
      const labelId = dialog.getAttribute('aria-labelledby');
      expect(labelId).toBeTruthy();
      expect(element.querySelector(`#${labelId}`)).not.toBeNull();
    });
  });

  it('keeps the current Incident IQ role current in source content', () => {
    const element = fixture.nativeElement as HTMLElement;
    const incidentHeading = Array.from(element.querySelectorAll('.timeline-title-row h3'))
      .find((heading) => heading.textContent?.trim() === 'Incident IQ');

    expect(incidentHeading).toBeDefined();
    const row = incidentHeading!.closest('.timeline-title-row');
    expect(row?.textContent).toContain('Jun 2026 — Present');
    expect(row?.textContent).not.toContain('Aug 2026');
  });

  it('renders complete education history without post-render replacement', () => {
    const element = fixture.nativeElement as HTMLElement;
    const entries = element.querySelectorAll('.education-entry');

    expect(entries.length).toBe(2);
    expect(element.textContent).toContain('New Jersey Institute of Technology');
    expect(element.textContent).toContain('Master of Science in Computer Science');
    expect(element.textContent).toContain('Karunya Institute of Technology and Sciences');
    expect(element.textContent).toContain('Bachelor of Technology in Computer Science & Engineering');
  });

  it('renders the theme control as part of the Angular header', () => {
    const element = fixture.nativeElement as HTMLElement;
    const actions = element.querySelector('.site-header .header-actions');
    const toggle = actions?.querySelector<HTMLButtonElement>('.theme-toggle');
    const cta = actions?.querySelector<HTMLAnchorElement>('.header-cta');

    expect(actions).not.toBeNull();
    expect(toggle).not.toBeNull();
    expect(toggle?.type).toBe('button');
    expect(cta).not.toBeNull();
  });

  it('renders a stable ten-technology marquee keyed by technology name', () => {
    const element = fixture.nativeElement as HTMLElement;
    const pills = Array.from(element.querySelectorAll<HTMLElement>('.tech-logo-pill'));
    const visible = pills.filter((pill) => pill.getAttribute('aria-hidden') !== 'true');
    const duplicate = pills.filter((pill) => pill.getAttribute('aria-hidden') === 'true');

    expect(visible.length).toBe(10);
    expect(duplicate.length).toBe(10);
    const names = visible.map((pill) => pill.dataset['tech'] || '');
    expect(names.every(Boolean)).toBeTrue();
    expect(new Set(names).size).toBe(10);
    expect(names).toEqual(component.techLogos.slice(0, 10).map((tech) => tech.name));
  });

  it('exposes the visually active navigation item to assistive technology', () => {
    const element = fixture.nativeElement as HTMLElement;
    component.activeSection = 'experience';
    fixture.detectChanges();

    const currentLinks = element.querySelectorAll('.nav a[aria-current="location"]');
    expect(currentLinks.length).toBe(1);
    expect(currentLinks[0].textContent?.trim()).toBe('Experience');
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
