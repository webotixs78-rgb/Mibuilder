export interface BlogPost {
  id: number
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  gradient: string
  content: string[]
  tags: string[]
}

export const blogCategories = [
  "All",
  "Industry Trends",
  "Sales Automation",
  "Tutorial",
  "Security",
  "Business Growth",
  "Integrations"
]

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of No-Code CRM Development",
    excerpt: "Discover how no-code platforms are revolutionizing the way businesses build and customize their CRM systems.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Industry Trends",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    gradient: "from-purple-500 to-pink-500",
    tags: ["No-Code", "CRM", "Strategy"],
    content: [
      "No-code CRM systems are rapidly changing how companies build customer engagement workflows. By removing the need for engineering resources, teams can launch tailored applications faster and maintain control over business logic.",
      "At Mibuilder, we believe the next era of CRM will be driven by adaptability and automation. With flexible building blocks, teams can create pipelines, automation rules, and dashboards that evolve with their business.",
      "This post explores the trends shaping no-code CRM products, including composable workflows, built-in AI, and deeper integration with communication platforms."
    ]
  },
  {
    id: 2,
    title: "10 Ways to Automate Your Sales Process",
    excerpt: "Learn practical strategies to automate repetitive sales tasks and boost your team's productivity.",
    author: "Mike Chen",
    date: "March 10, 2024",
    readTime: "7 min read",
    category: "Sales Automation",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    gradient: "from-blue-500 to-purple-500",
    tags: ["Sales", "Automation", "Productivity"],
    content: [
      "Automating sales workflows helps teams move leads through the funnel faster and reduces manual follow-up tasks. The most impactful automations combine triggers, actions, and data updates in a single flow.",
      "In this article, we share ten practical automation ideas for lead capture, scoring, follow-up reminders, and sales reporting. These workflows can be built quickly using Mibuilder's drag-and-drop automation engine.",
      "Whether you're managing inbound leads or enterprise deals, automations give your team time back and improve responsiveness across the pipeline."
    ]
  },
  {
    id: 3,
    title: "Building Custom Workflows Without Code",
    excerpt: "Step-by-step guide to creating powerful business workflows using Mibuilder's visual editor.",
    author: "Emily Davis",
    date: "March 5, 2024",
    readTime: "10 min read",
    category: "Tutorial",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop",
    gradient: "from-green-500 to-blue-500",
    tags: ["Tutorial", "Workflow", "Onboarding"],
    content: [
      "Custom business workflows don't need to be complicated. With a visual editor, you can map stages, assign tasks, and build approvals without writing a single line of code.",
      "This tutorial walks through creating a sample process in Mibuilder, including form fields, status updates, and automated notifications for your team.",
      "By focusing on the actual steps your business takes, you can design workflows that are intuitive, maintainable, and easy to improve over time."
    ]
  },
  {
    id: 4,
    title: "Security Best Practices for CRM Systems",
    excerpt: "Essential security measures to protect your customer data and maintain compliance.",
    author: "Alex Thompson",
    date: "February 28, 2024",
    readTime: "8 min read",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
    gradient: "from-orange-500 to-red-500",
    tags: ["Security", "Compliance", "Privacy"],
    content: [
      "Protecting customer data is a top priority for any CRM deployment. Strong security starts with access control, encryption, and logging across every workspace and board.",
      "In this post, we cover best practices for role-based permissions, workspace-level sharing, and audit-ready activity tracking to keep your CRM environment safe.",
      "Implementing these practices ensures your team can collaborate confidently while meeting internal and external compliance requirements."
    ]
  },
  {
    id: 5,
    title: "Scaling Your Business with Custom CRM",
    excerpt: "How to design a CRM system that grows with your business and adapts to changing needs.",
    author: "Lisa Anderson",
    date: "February 20, 2024",
    readTime: "6 min read",
    category: "Business Growth",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop",
    gradient: "from-purple-500 to-indigo-500",
    tags: ["Growth", "Strategy", "Scaling"],
    content: [
      "A scalable CRM lets you evolve processes without breaking the experience for your team. Start with a modular workspace design and add boards, automations, and permissions as you grow.",
      "This article explains how to structure your CRM for expansion, including reusable templates, cross-workspace reports, and performance monitoring.",
      "Growing with confidence means your CRM can support larger teams, increasing data volume, and more sophisticated workflows without slowing down."
    ]
  },
  {
    id: 6,
    title: "Integration Guide: Connect Your Favorite Tools",
    excerpt: "Complete guide to integrating Mibuilder with popular business tools and services.",
    author: "David Kim",
    date: "February 15, 2024",
    readTime: "12 min read",
    category: "Integrations",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    gradient: "from-pink-500 to-purple-500",
    tags: ["Integrations", "APIs", "Tools"],
    content: [
      "Integrations let your CRM become the central source of truth for customer data across every tool your business uses.",
      "Learn how to connect email, collaboration, analytics, and payments so your team can work from a single shared workspace without duplicate entry.",
      "The right integrations reduce friction and help your CRM deliver more value across marketing, sales, and support."
    ]
  }
]

export function getBlogPostById(id: string | number) {
  return blogPosts.find((post) => String(post.id) === String(id))
}

export function getRelatedPosts(category: string, id: string | number) {
  return blogPosts.filter((post) => post.category === category && String(post.id) !== String(id)).slice(0, 2)
}
