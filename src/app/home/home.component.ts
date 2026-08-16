import { Component, HostListener } from '@angular/core';

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
  visual: 'platform' | 'assistant' | 'observability' | 'faq';
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
  mark: string;
  color: string;
  items: string[];
}

interface TechLogo {
  name: string;
  mark: string;
  color: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.extras.css', './home.final.css', './home.polish.css'],
  standalone: true
})
export class HomeComponent {
  menuOpen = false;
  currentYear = new Date().getFullYear();
  scrollProgress = 0;
  showBackToTop = false;
  activeSection = 'top';

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
      visual: 'platform',
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
      visual: 'assistant',
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
      visual: 'observability',
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
      visual: 'faq',
      caseStudy: {
        context: 'The product needed a faster way for users to find answers to common questions without forcing every interaction through a full support flow.',
        contribution: 'I focused on a small, maintainable assistant using curated content, search-oriented matching and straightforward UI behavior rather than an opaque autonomous system.',
        takeaway: 'For narrow product questions, predictable retrieval and good UX can be more valuable than adding unnecessary model complexity.'
      }
    }
  ];

  readonly techLogos: TechLogo[] = [
    { name: 'C#', mark: 'C#', color: '#9B4F96' },
    { name: '.NET', mark: '.N', color: '#6D429C' },
    { name: 'Python', mark: 'Py', color: '#3776AB' },
    { name: 'TypeScript', mark: 'TS', color: '#3178C6' },
    { name: 'Angular', mark: 'A', color: '#DD0031' },
    { name: 'React', mark: '⚛', color: '#61DAFB' },
    { name: 'Next.js', mark: 'N', color: '#111111' },
    { name: 'FastAPI', mark: 'FA', color: '#009688' },
    { name: 'GitHub Actions', mark: 'GH', color: '#2088FF' },
    { name: 'Grafana', mark: 'G', color: '#F46800' },
    { name: 'Kubernetes', mark: 'K8', color: '#326CE5' },
    { name: 'Docker', mark: 'D', color: '#2496ED' },
    { name: 'Prometheus', mark: 'P', color: '#E6522C' },
    { name: 'PostgreSQL', mark: 'Pg', color: '#336791' },
    { name: 'Linux', mark: 'Lx', color: '#FCC624' },
    { name: 'Redis', mark: 'R', color: '#DC382D' },
    { name: 'Argo CD', mark: 'Ar', color: '#EF7B4D' },
    { name: 'Vault', mark: 'V', color: '#FFD814' }
  ];

  readonly skillGroups: SkillGroup[] = [
    { title: 'Platform & cloud-native delivery', description: 'Deployment automation, environment configuration, release validation and infrastructure-adjacent troubleshooting.', context: 'Professional + hands-on platform work', mark: 'K8', color: '#326CE5', items: ['Kubernetes', 'Docker', 'Argo CD', 'Kustomize', 'GitOps', 'HashiCorp Vault', 'GitHub Actions', 'Azure DevOps', 'Linux'] },
    { title: 'Backend & APIs', description: 'Application services, REST integrations, data access and debugging across .NET and Python-based stacks.', context: 'Professional experience + current product work', mark: '.N', color: '#6D429C', items: ['C#', '.NET', 'ASP.NET Core', 'Python', 'FastAPI', 'REST APIs', 'Entity Framework', 'PostgreSQL', 'SQL Server', 'Redis'] },
    { title: 'Frontend & product UI', description: 'Web interfaces built around useful workflows, responsive behavior and maintainable component structure.', context: 'Enterprise applications + personal products', mark: 'A', color: '#DD0031', items: ['Angular', 'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Responsive UI'] },
    { title: 'Observability & reliability', description: 'Metrics, logs, dashboards, alerting and validation tools used to understand deployed systems and shorten debugging loops.', context: 'Platform work + observability labs', mark: 'G', color: '#F46800', items: ['Prometheus', 'Grafana', 'Loki', 'Alertmanager', 'Splunk', 'Health checks', 'Smoke tests', 'Cypress'] },
    { title: 'Security & application quality', description: 'Application-security testing and quality controls that complement development, release engineering and production support.', context: 'Professional application support + testing', mark: 'S', color: '#66DBC3', items: ['Burp Suite', 'Fortify', 'Web security testing', 'Vulnerability analysis', 'Authentication debugging', 'Automated tests'] },
    { title: 'AI-assisted engineering', description: 'Coding agents and AI workflows used for repository analysis, implementation support and repetitive engineering tasks with human review.', context: 'Current development workflow', mark: 'AI', color: '#8DA8FF', items: ['Claude Code', 'Claude Skills', 'Codex', 'MCP', 'Repository analysis', 'Workflow automation', 'Human-in-the-loop review'] }
  ];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    this.scrollProgress = Math.min(100, Math.max(0, (scrollTop / scrollable) * 100));
    this.showBackToTop = scrollTop > 700;

    const sectionIds = ['about', 'work', 'experience', 'stack', 'contact'];
    let current = 'top';
    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element && element.getBoundingClientRect().top <= 170) {
        current = id;
      }
    }
    this.activeSection = current;
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
