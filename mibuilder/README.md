# Mibuilder - No-Code CRM Builder Platform

Build your CRM your way — without code.

Mibuilder is a no-code CRM builder platform where business owners can create custom CRM systems, workflows, pipelines, dashboards, and automations without writing code.

## 🚀 Features

- **Custom CRM Builder** - Create modules, fields, and workflows
- **Pipeline Management** - Visual sales and process pipelines  
- **Dashboard Builder** - Analytics and reporting dashboards
- **Forms Builder** - Lead capture and data collection forms
- **Automations** - No-code workflow automation
- **Multi-Workspace** - Manage multiple business entities
- **Team Collaboration** - Roles, permissions, and activity tracking

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, MongoDB
- **State**: Zustand
- **Charts**: Recharts
- **Drag & Drop**: dnd-kit
- **Forms**: React Hook Form + Zod

## 📦 Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/mibuilder.git
cd mibuilder
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📁 Project Structure

```
mibuilder/
├── app/                    # Next.js App Router pages
│   ├── (marketing)/       # Public marketing pages
│   ├── (auth)/           # Authentication pages
│   └── app/              # Authenticated app pages
├── components/           # Reusable React components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── layout/          # Layout components
│   ├── marketing/       # Marketing page components
│   ├── dashboard/       # Dashboard components
│   ├── crm-builder/     # CRM builder components
│   ├── records/         # Record management
│   ├── pipelines/       # Pipeline components
│   ├── forms/           # Form builder
│   └── automations/     # Automation builder
├── lib/                 # Utility functions and configurations
├── hooks/               # Custom React hooks
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
├── services/            # API service functions
├── actions/             # Server actions
└── models/              # Database schemas
```

## 🎯 Core Modules

### Authentication
- Login, Register, Password Reset
- JWT-based authentication
- Social login ready architecture

### Workspace Management
- Multi-workspace support
- Team roles and permissions
- Workspace settings and branding

### CRM Builder Engine
- Custom module creation
- Dynamic field types
- Drag-and-drop interface
- Real-time preview

### Data Management
- Table, Kanban, Calendar views
- Advanced filtering and sorting
- Bulk operations
- Import/export capabilities

### Analytics & Reporting
- Custom dashboards
- Interactive charts
- KPI tracking
- Export capabilities

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

---

Built with ❤️ for businesses that want to build their CRM their way.
