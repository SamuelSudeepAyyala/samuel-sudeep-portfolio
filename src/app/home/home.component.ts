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
  caseStudy: {
    context: string;
    contribution: string;
    takeaway: string;
  };
}

interface SkillGroup {
  title: string;
  description: string;
  context: string;
  icon: string;
  items: string[];
}

interface TechLogo {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.extras.css'],
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

  readonly workSnapshot = [
    { title: 'Platform delivery', description: 'Pull-request environments, CI/CD, GitOps, deployment configuration, health checks and release validation.' },
    { title: 'Application engineering', description: '.NET services, REST APIs, SQL-backed workflows, Angular/React interfaces and production debugging.' },
    { title: 'Observability', description: 'Metrics, logs, dashboards, alerting and practical troubleshooting using Prometheus, Grafana, Loki and Splunk.' },
    { title: 'Applied automation', description: 'AI-assisted development and workflow automation with explicit review steps, tests and user control.' }
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
        'Troubleshot build, configuration, deployment and authentication failures across layers',
        'Worked with GitOps-style configuration and cloud-native application delivery patterns'
      ],
      tools: ['.NET', 'Kubernetes', 'GitOps', 'Argo CD', 'Docker', 'Cypress', 'GitHub Actions'],
      mediaLabel: 'Platform delivery',
      caseStudy: {
        context: 'The work involved improving how engineering changes could be validated in isolated environments before broader rollout.',
        contribution: 'I worked across application code, deployment configuration and test automation, with an emphasis on repeatable patterns and practical troubleshooting.',
        takeaway: 'The strongest lesson was that reliable developer platforms depend as much on clear validation and debugging paths as they do on automation itself.'
      }
    },
    {
      label: 'Product engineering / 2026',
      title: 'Job Application Assistant',
      description: 'A personal application workspace built around user-approved automation, authenticated profiles, isolated persistence, resume-evidence workflows and a browser-extension path.',
      highlights: [
        'Next.js dashboard with a FastAPI service layer and PostgreSQL persistence',
        'Authentication and user-isolation tests around private profile data',
        'Shared frontend/backend contracts and phased implementation boundaries',
        'Resume evidence review designed around explicit approval instead of silent rewriting'
      ],
      tools: ['Next.js', 'FastAPI', 'PostgreSQL', 'Clerk', 'TypeScript', 'Python', 'Manifest V3'],
      mediaLabel: 'Full-stack product',
      caseStudy: {
        context: 'The goal is to reduce repetitive job-search work without turning applications into an unsupervised automation problem.',
        contribution: 'I designed the product around authenticated user data, explicit review steps, private evidence storage and clear phase boundaries between tracking, resume support and browser-assisted workflows.',
        takeaway: 'Automation is more useful when the user can see what data it used, approve changes and retain control over consequential actions.'
      }
    },
    {
      label: 'Observability / AIOps',
      title: 'Intelligent observability lab',
      description: 'A personal observability project combining metrics, logs, alerting and anomaly-detection experiments to explore how automation can improve signal quality without replacing operational judgment.',
      highlights: [
        'Metrics, dashboards, logs and alerting in a containerized environment',
        'Incident-detection and notification experiments',
        'Prometheus/Grafana/Loki stack used for hands-on systems troubleshooting',
        'Foundation for anomaly detection and response automation experiments'
      ],
      tools: ['Prometheus', 'Grafana', 'Loki', 'Alertmanager', 'Docker', 'Python'],
      link: 'https://github.com/SamuelSudeepAyyala/AiOps',
      linkLabel: 'View repository',
      mediaLabel: 'Observability systems',
      caseStudy: {
        context: 'Monitoring stacks often produce more signals than a person can reasonably interpret at once.',
        contribution: 'I built a local environment that combines metrics, logs and alerts, then used it to experiment with correlation and anomaly-oriented workflows.',
        takeaway: 'The useful role for AIOps is to improve prioritization and context, while keeping final operational decisions observable and reviewable.'
      }
    },
    {
      label: 'Applied AI / product UX',
      title: 'Domain FAQ assistant',
      description: 'Built a lightweight conversational experience for a web product using curated knowledge, search and maintainable response logic. Employer and domain-specific implementation details are intentionally omitted.',
      highlights: [
        'Curated FAQ and search-oriented response flow',
        'Fuzzy matching for common wording variations and typos',
        'Responsive in-product conversation experience',
        'Simple maintainable retrieval approach instead of unnecessary model complexity'
      ],
      tools: ['Angular', 'TypeScript', 'Search', 'JSON', 'UX'],
      mediaLabel: 'Applied product UX',
      caseStudy: {
        context: 'The product needed a faster way for users to find answers to common questions without forcing every interaction through a full support flow.',
        contribution: 'I focused on a small, maintainable assistant using curated content, search-oriented matching and straightforward UI behavior rather than an opaque autonomous system.',
        takeaway: 'For narrow product questions, predictable retrieval and good UX can be more valuable than adding unnecessary model complexity.'
      }
    }
  ];

  readonly techLogos: TechLogo[] = [
    { name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg' },
    { name: '.NET', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg' },
    { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg' },
    { name: 'Prometheus', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg' },
    { name: 'Grafana', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' }
  ];

  readonly skillGroups: SkillGroup[] = [
    { title: 'Platform & cloud-native delivery', description: 'The layer I have been spending the most time in recently: deployment automation, environment configuration and release validation.', context: 'Used in professional and hands-on platform work', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg', items: ['Kubernetes', 'Docker', 'Argo CD', 'Kustomize', 'GitOps', 'HashiCorp Vault', 'GitHub Actions', 'Azure DevOps', 'Linux'] },
    { title: 'Backend & APIs', description: 'Application services, REST integrations, data access and debugging across both .NET and Python-based stacks.', context: 'Professional experience + current product work', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg', items: ['C#', '.NET', 'ASP.NET Core', 'Python', 'FastAPI', 'REST APIs', 'Entity Framework', 'PostgreSQL', 'SQL Server', 'Redis'] },
    { title: 'Frontend & product UI', description: 'Building and supporting web interfaces with a focus on practical workflows rather than purely visual frontend work.', context: 'Enterprise applications + personal products', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg', items: ['Angular', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Responsive UI'] },
    { title: 'Observability & reliability', description: 'Tools I use to understand what a system is doing after deployment and to reduce time spent guessing during failures.', context: 'Platform work + observability labs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg', items: ['Prometheus', 'Grafana', 'Loki', 'Alertmanager', 'Splunk', 'Health checks', 'Smoke tests', 'Cypress'] },
    { title: 'Security & application quality', description: 'Application-security testing and quality controls that complement development and release engineering.', context: 'Professional application support and testing', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg', items: ['Burp Suite', 'Fortify', 'Web security testing', 'Vulnerability analysis', 'Authentication debugging', 'Automated tests'] },
    { title: 'AI-assisted engineering', description: 'Using modern coding agents and AI workflows for repository analysis, implementation support and repetitive engineering tasks while retaining human review.', context: 'Current development workflow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', items: ['Claude Code', 'Claude Skills', 'Codex', 'MCP', 'Repository analysis', 'Workflow automation', 'Human-in-the-loop review'] }
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
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    this.host.nativeElement.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
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
