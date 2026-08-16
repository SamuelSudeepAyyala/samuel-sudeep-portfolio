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
  mediaLabel: string;
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
    { value: 'App → Platform', label: 'Comfortable working across product code and delivery systems' },
    { value: 'PR → Environment', label: 'Experience with automated, repeatable test and deployment workflows' },
    { value: 'Signals → Action', label: 'Observability and troubleshooting with practical operational context' },
    { value: 'AI + Review', label: 'Automation designed with human control and clear boundaries' }
  ];

  readonly capabilities: Capability[] = [
    {
      eyebrow: '01 / Platform engineering',
      title: 'Make delivery repeatable instead of fragile.',
      description: 'I work on deployment automation, test environments, configuration, health checks and observability so engineering teams can ship with fewer manual steps.',
      tools: ['Kubernetes', 'Argo CD', 'GitOps', 'Docker', 'Vault', 'GitHub Actions', 'Azure DevOps']
    },
    {
      eyebrow: '02 / Software engineering',
      title: 'Trace problems across the stack.',
      description: 'My background spans .NET services, APIs, data layers and modern web applications, which helps when a production issue crosses application and infrastructure boundaries.',
      tools: ['.NET', 'C#', 'FastAPI', 'Python', 'Angular', 'Next.js', 'PostgreSQL']
    },
    {
      eyebrow: '03 / Automation + AI',
      title: 'Automate useful work, not judgment.',
      description: 'I use AI-assisted workflows where they can reduce repetitive engineering effort while keeping approvals, traceability and testing in the loop.',
      tools: ['AI workflows', 'Repository analysis', 'Browser extensions', 'Prometheus', 'Grafana']
    }
  ];

  readonly projects: Project[] = [
    {
      label: 'Platform engineering / 2026',
      title: 'Developer-platform environment automation',
      description: 'Contributed to a platform modernization effort that made isolated pull-request environments more repeatable for backend services. Public details are intentionally generalized to avoid exposing employer-specific architecture or internal systems.',
      highlights: [
        'Coordinated application, deployment and test changes across multiple repositories',
        'Added health, smoke and end-to-end validation into delivery workflows',
        'Troubleshot build, configuration, deployment and authentication failures across layers'
      ],
      tools: ['.NET', 'Kubernetes', 'GitOps', 'Argo CD', 'Docker', 'Cypress', 'GitHub Actions'],
      mediaLabel: 'Architecture visual slot'
    },
    {
      label: 'Product engineering / 2026',
      title: 'Job Application Assistant',
      description: 'A personal application workspace built around user-approved automation, authenticated profiles, isolated persistence, resume-evidence workflows and a browser-extension path.',
      highlights: [
        'Next.js dashboard + FastAPI API + PostgreSQL',
        'Authentication and user-isolation tests',
        'Shared contracts and phased implementation boundaries'
      ],
      tools: ['Next.js', 'FastAPI', 'PostgreSQL', 'Clerk', 'TypeScript', 'Python', 'Manifest V3'],
      mediaLabel: 'Product screenshot slot'
    },
    {
      label: 'Observability / AIOps',
      title: 'Intelligent observability lab',
      description: 'A personal observability project combining metrics, logs, alerting and anomaly-detection experiments to explore how automation can improve signal quality without replacing operational judgment.',
      highlights: [
        'Metrics, dashboards, logs and alerting in a containerized environment',
        'Incident-detection and notification experiments',
        'Foundation for anomaly detection and response automation'
      ],
      tools: ['Prometheus', 'Grafana', 'Loki', 'Alertmanager', 'Docker', 'Python'],
      link: 'https://github.com/SamuelSudeepAyyala/AiOps',
      linkLabel: 'View repository',
      mediaLabel: 'Dashboard screenshot slot'
    },
    {
      label: 'Applied AI / product UX',
      title: 'Domain FAQ assistant',
      description: 'Built a lightweight conversational experience for a web product using curated knowledge, search and maintainable response logic. Employer and domain-specific implementation details are intentionally omitted.',
      highlights: [
        'Curated FAQ and search-oriented response flow',
        'Fuzzy matching for common wording variations and typos',
        'Responsive in-product conversation experience'
      ],
      tools: ['Angular', 'TypeScript', 'Search', 'JSON', 'UX'],
      mediaLabel: 'Product visual slot'
    }
  ];

  readonly skillGroups = [
    { title: 'Platform', items: ['Kubernetes', 'Docker', 'Argo CD', 'Kustomize', 'GitOps', 'Vault', 'GitHub Actions', 'Azure DevOps', 'Linux'] },
    { title: 'Backend', items: ['C#', '.NET', 'Python', 'FastAPI', 'REST APIs', 'PostgreSQL', 'SQL Server', 'Redis'] },
    { title: 'Frontend', items: ['Angular', 'Next.js', 'React', 'TypeScript', 'JavaScript', 'HTML', 'CSS'] },
    { title: 'Observability + security', items: ['Prometheus', 'Grafana', 'Loki', 'Splunk', 'Burp Suite', 'Fortify'] }
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
