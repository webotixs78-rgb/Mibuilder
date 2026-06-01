export interface DocArticle {
  slug: string
  title: string
  description: string
  category: string
  time: string
  content: string[]
  tags: string[]
}

export const docs: DocArticle[] = [
  {
    slug: "installation",
    title: "Installation",
    description: "Get Mibuilder up and running with the right setup and dependencies.",
    category: "Getting Started",
    time: "5 min",
    tags: ["setup", "install", "quick start"],
    content: [
      "Mibuilder is designed to be easy to install, whether you want a hosted trial or a self-hosted deployment. This guide covers Node.js installation, setup commands, and environment requirements.",
      "Start by cloning the repository, installing dependencies, and configuring your .env file. Then run the development server to verify the app is running locally.",
      "If you prefer Docker, there are also instructions for pulling and running the official image, which is ideal for staging or production environments."
    ]
  },
  {
    slug: "first-workspace",
    title: "First Workspace",
    description: "Create your first workspace, configure your boards, and start building your CRM.",
    category: "Getting Started",
    time: "10 min",
    tags: ["workspace", "setup", "crm"],
    content: [
      "A workspace in Mibuilder is the top-level container for your CRM data. It holds boards, automations, and configured views. After installation, create a workspace and give it a descriptive name.",
      "Use templates or start from scratch. Each workspace can include multiple boards, such as Leads, Contacts, Projects, or Tickets, depending on your workflow.",
      "Once your first workspace is created, invite team members and start importing data or building custom fields to match your business process."    ]
  },
  {
    slug: "basic-concepts",
    title: "Basic Concepts",
    description: "Understand workspaces, boards, modules, and how Mibuilder data is structured.",
    category: "Getting Started",
    time: "8 min",
    tags: ["concepts", "overview", "architecture"],
    content: [
      "Mibuilder is built around workspaces, boards, fields, and automations. A workspace contains related boards, and each board contains rows, columns, and views.",
      "Boards are the foundation of your CRM. They can represent pipelines, customer lists, support tickets, or any custom process. Columns define the data captured for each record.",
      "Views let you switch between table, Kanban, calendar, and custom presentations. Automations enable rules, notifications, and workflow triggers across boards.",
    ]
  },
  {
    slug: "ui-overview",
    title: "UI Overview",
    description: "Learn the main screens and controls in the Mibuilder interface.",
    category: "Getting Started",
    time: "6 min",
    tags: ["ui", "navigation", "design"],
    content: [
      "The Mibuilder interface is designed for fast navigation. The sidebar gives you quick access to dashboards, workspaces, boards, and automation tools.",
      "The top bar provides actions for creating workspaces, inviting team members, and toggling between different app sections. Each workspace page includes a toolbar for board controls.",
      "Status cards, recent activity feeds, and quick actions help you stay on top of the most important tasks without losing context."    ]
  },
  {
    slug: "creating-modules",
    title: "Creating Modules",
    description: "Build modules and boards for your CRM workflows without writing code.",
    category: "Building CRM",
    time: "12 min",
    tags: ["modules", "boards", "workflow"],
    content: [
      "Modules are reusable building blocks that represent a set of fields and processes. In Mibuilder, each module corresponds to a board with its own columns and rows.",
      "To create a module, choose a template or start from an empty board. Add columns for text, status, dates, users, and more to capture the data your team needs.",
      "After creating a module, configure views and automations to reflect your business process. This allows records to move through stages automatically and keeps everyone aligned."    ]
  },
  {
    slug: "custom-fields",
    title: "Custom Fields",
    description: "Add and configure field types to capture the data your team needs.",
    category: "Building CRM",
    time: "8 min",
    tags: ["fields", "customization", "data"],
    content: [
      "Custom fields let you capture specific data on a board record. Mibuilder supports text, email, date, status, priority, number, and more field types.",
      "Choose the right field type for each piece of information and configure options like default values, validation, and visibility. This ensures data is clean and consistent.",
      "Use field settings to create dropdown options, enable required fields, and set up rules that improve data quality across your workspace."    ]
  },
  {
    slug: "workflows",
    title: "Workflows",
    description: "Design workflows that move records through stages and streamline your team’s process.",
    category: "Building CRM",
    time: "15 min",
    tags: ["workflow", "pipeline", "automation"],
    content: [
      "Workflows help teams manage repeatable processes. In Mibuilder, you can define stages, status updates, and board transitions to keep work moving forward.",
      "Create views for Kanban boards, tables, and calendar schedules so your team can work in the format that fits their process.",
      "Combine workflows with automations to trigger notifications, update fields, and move records automatically based on business rules."    ]
  },
  {
    slug: "automations",
    title: "Automations",
    description: "Use automation rules to reduce manual work and keep your CRM operating smoothly.",
    category: "Building CRM",
    time: "10 min",
    tags: ["automation", "rules", "triggers"],
    content: [
      "Automations in Mibuilder let you perform actions automatically when data changes. You can send notifications, update record fields, or create tasks based on triggers.",
      "Common automation examples include moving deals when status changes, notifying owners when a ticket is assigned, and generating follow-up reminders.",
      "Set up conditions, choose a trigger event, and define the action to reduce manual work and keep your processes consistent."    ]
  },
  {
    slug: "user-roles",
    title: "User Roles",
    description: "Define roles so team members have the right access in each workspace.",
    category: "User Management",
    time: "7 min",
    tags: ["roles", "permissions", "access"],
    content: [
      "User roles determine what each person can see and do inside the app. Mibuilder supports roles like admin, editor, and viewer to match your team structure.",
      "Assign roles when inviting team members and update permissions as responsibilities change. Roles help maintain security while enabling collaboration.",
      "Use role settings to control access to boards, automations, and workspace settings, keeping sensitive data protected."    ]
  },
  {
    slug: "team-management",
    title: "Team Management",
    description: "Invite team members, manage access, and organize collaboration across workspaces.",
    category: "User Management",
    time: "10 min",
    tags: ["team", "collaboration", "invite"],
    content: [
      "Team management helps you onboard collaborators and grant permissions in the right workspace. Invite members by email and assign the appropriate role during setup.",
      "Track invited users, pending invitations, and active team members through the workspace access panel.",
      "Organize your team by workspace and allow members to work together on the same boards without exposing unrelated data."    ]
  },
  {
    slug: "permissions",
    title: "Permissions",
    description: "Control who can view, edit, and manage your workspace content.",
    category: "User Management",
    time: "9 min",
    tags: ["permissions", "security", "access control"],
    content: [
      "Permissions let you restrict actions and data visibility based on roles or workspace membership. This keeps your CRM secure while enabling team collaboration.",
      "Set permissions at the workspace and board level so teams can only interact with the data they need.",
      "Review access settings regularly as team members change roles or projects evolve."    ]
  },
  {
    slug: "access-control",
    title: "Access Control",
    description: "Set workspace-level access and make sure only authorized teams can see your data.",
    category: "User Management",
    time: "11 min",
    tags: ["access", "control", "security"],
    content: [
      "Access control gives you the confidence to share workspaces with specific teams while isolating sensitive information.",
      "Use workspace membership and role assignments to control who can view or modify boards and records.",
      "For advanced setups, combine role-based access with team invitations to keep collaboration secure and organized."    ]
  },
  {
    slug: "api",
    title: "API Reference",
    description: "Document the available API endpoints, authentication, and example requests.",
    category: "API & Integrations",
    time: "15 min",
    tags: ["api", "integration", "developer"],
    content: [
      "The Mibuilder API enables developers to connect external systems, automate deployments, and synchronize data between apps.",
      "Authenticate using API keys or OAuth tokens, then call endpoints for workspaces, boards, records, and users.",
      "Use the API reference to discover request formats, response schemas, and examples for common integration scenarios."    ]
  },
  {
    slug: "webhooks",
    title: "Webhooks",
    description: "Push updates from Mibuilder to external services in real time.",
    category: "API & Integrations",
    time: "8 min",
    tags: ["webhooks", "events", "integration"],
    content: [
      "Webhooks let Mibuilder notify your external apps when key events occur, such as record creation, status updates, or form submissions.",
      "Configure a webhook URL, select the events you want to listen for, and handle incoming payloads in your service.",
      "Webhooks are ideal for real-time workflows, custom notifications, and syncing data with other tools."    ]
  },
  {
    slug: "third-party-apps",
    title: "Third-party Apps",
    description: "Connect Mibuilder to popular software with prebuilt integrations.",
    category: "API & Integrations",
    time: "12 min",
    tags: ["apps", "integration", "connectors"],
    content: [
      "Mibuilder supports integrations with common business applications so you can sync data across CRMs, email platforms, and analytics tools.",
      "Browse available third-party apps, authorize connections, and map fields between systems.",
      "Use integrations to automate workflows and reduce duplicate entry across tools."    ]
  },
  {
    slug: "custom-integrations",
    title: "Custom Integrations",
    description: "Build custom connectors to integrate Mibuilder with the tools your business depends on.",
    category: "API & Integrations",
    time: "18 min",
    tags: ["custom", "integration", "api"],
    content: [
      "Custom integrations let you extend Mibuilder with your own systems and services. Use the API and webhook capabilities to build tailored connections.",
      "Define mapping strategies, data synchronization rules, and error handling for custom workflows.",
      "Custom integrations are powerful when you need one-off connectors or deep two-way sync between a legacy system and your CRM."    ]
  }
]

export const docSections = [
  {
    title: "Getting Started",
    description: "Quick start guide and basic concepts",
    slugs: ["installation", "first-workspace", "basic-concepts", "ui-overview"]
  },
  {
    title: "Building CRM",
    description: "Create custom CRM modules and workflows",
    slugs: ["creating-modules", "custom-fields", "workflows", "automations"]
  },
  {
    title: "User Management",
    description: "Manage users, teams, and permissions",
    slugs: ["user-roles", "team-management", "permissions", "access-control"]
  },
  {
    title: "API & Integrations",
    description: "API documentation and third-party integrations",
    slugs: ["api", "webhooks", "third-party-apps", "custom-integrations"]
  }
]

export const popularDocs = [
  "first-workspace",
  "creating-modules",
  "permissions",
  "api"
]

export function getDocBySlug(slug: string) {
  return docs.find((doc) => doc.slug === slug)
}

export function getRelatedDocs(category: string, currentSlug: string) {
  return docs.filter((doc) => doc.category === category && doc.slug !== currentSlug).slice(0, 3)
}

export function getDocsForSearch(query: string) {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return docs
  return docs.filter((doc) =>
    doc.title.toLowerCase().includes(normalized) ||
    doc.description.toLowerCase().includes(normalized) ||
    doc.tags.some((tag) => tag.toLowerCase().includes(normalized))
  )
}
