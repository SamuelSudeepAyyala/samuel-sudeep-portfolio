import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';

interface Capability {
  eyebrow: string;
  title: string;
  description: string;
  tools: string[];
}

interface Project {
  label: string;
  title: string;
  description: string;
  highlights: string[];
  tools: string[];
  link?: string;
  linkLabel?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent implements OnInit, OnDestroy {
  menuOpen = false;
  currentYear = new Date().getFullYear();
  private observer?: IntersectionObserver;

  readonly metrics = [
    { value: '86', label: 'Azure DevOps work items closed' },
    { value: '182', label: 'Pull requests authored' },
    { value: '160+', label: 'Self-authored PRs merged' },
    { value: '25', label: 'Backend modules modernized' }
  ];

  readonly capabilities: Capability[] = [
    {
      eyebrow: '01 / Platform engineering',
      title: 'Ship repeatable environments, not one-off deployments.',
      description: 'I build delivery systems that turn pull requests into testable environments with consistent configuration, observability, health checks and deployment automation.',
      tools: ['Kubernetes', 'Argo CD', 'GitOps', 'Docker', 'Vault', 'GitHub Actions', 'Azure DevOps']
    },
    {
      eyebrow: '02 / Software engineering',
      title: 'Work across the stack when the problem requires it.',
      description: 'My background spans .NET services, APIs, data layers and modern web applications, so I can trace failures across application and platform boundaries instead of treating infrastructure in isolation.',
      tools: ['.NET', 'C#', 'FastAPI', 'Python', 'Angular', 'Next.js', 'PostgreSQL']
    },
    {
      eyebrow: '03 / Automation + AI',
      title: 'Use AI where it removes real operational friction.',
      description: 'I prototype workflow automation and AI-assisted tools with an emphasis on explainability, human control, testability and production boundaries rather than novelty for its own sake.',
      tools: ['AI workflows', 'Anomaly detection', 'Clerk', 'Browser extensions', 'Prometheus', 'Grafana']
    }
  ];

  readonly projects: Project[] = [
    {
      label: 'Platform modernization / 2026',
      title: 'Ephemeral environments at Incident IQ',
      description: 'Helped convert a large backend surface to isolated pull-request environments across a Kubernetes and GitOps delivery platform. The work crossed service repositories, deployment overlays, developer-platform configuration and end-to-end validation.',
      highlights: [
        '25 backend modules converted for ephemeral environments',
        'Health, smoke and E2E validation integrated into the workflow',
        'Cross-repository fixes spanning application, GitOps and platform layers'
      ],
      tools: ['.NET', 'Kubernetes', 'Kustomize', 'Argo CD', 'Vault', 'Cypress', 'GitHub Actions']
    },
    {
      label: 'Product engineering / 2026',
      title: 'Job Application Assistant',
      description: 'A privacy-conscious application workspace designed around user-approved automation: authenticated candidate profiles, versioned APIs, isolated persistence, resume evidence workflows and a browser-extension path for supported ATS systems.',
      highlights: [
        'Next.js dashboard + FastAPI API + PostgreSQL',
        'Clerk authentication and user-isolation tests',
        'Shared contracts and a phased production roadmap'
      ],
      tools: ['Next.js', 'FastAPI', 'PostgreSQL', 'Clerk', 'TypeScript', 'Python', 'Manifest V3']
    },
    {
      label: 'Observability / AIOps',
      title: 'Intelligent observability lab',
      description: 'A hands-on observability project combining metrics, logs, alerting and anomaly-detection experiments to explore how AI can improve signal quality without replacing operational judgment.',
      highlights: [
        'Prometheus, Grafana and Loki monitoring stack',
        'Alertmanager-based incident detection',
        'Containerized path toward anomaly detection and response automation'
      ],
      tools: ['Prometheus', 'Grafana', 'Loki', 'Alertmanager', 'Docker', 'Python'],
      link: 'https://github.com/SamuelSudeepAyyala/AiOps',
      linkLabel: 'View repository'
    },
    {
      label: 'Applied AI / product UX',
      title: 'DreamStream real-estate assistant',
      description: 'A conversational support experience for a real-estate platform, using curated domain knowledge and fuzzy retrieval to answer common product and property questions with a lightweight, maintainable architecture.',
      highlights: [
        '50+ curated FAQ entries',
        'Fuse.js fuzzy matching for typos and rephrasings',
        'Responsive in-product conversation experience'
      ],
      tools: ['Angular', 'TypeScript', 'Fuse.js', 'JSON', 'UX']
    }
  ];

  readonly skillGroups = [
    { title: 'Platform', items: ['Kubernetes', 'Docker', 'Argo CD', 'Kustomize', 'GitOps', 'Vault', 'GitHub Actions', 'Azure DevOps', 'Linux'] },
    { title: 'Backend', items: ['C#', '.NET', 'Python', 'FastAPI', 'REST APIs', 'PostgreSQL', 'SQL Server', 'Redis'] },
    { title: 'Frontend', items: ['Angular', 'Next.js', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'] },
    { title: 'Observability + security', items: ['Prometheus', 'Grafana', 'Loki', 'Datadog', 'Splunk', 'Burp Suite', 'Fortify'] }
  ];

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    this.host.nativeElement.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => {
      this.observer?.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
