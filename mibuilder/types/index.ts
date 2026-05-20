// User Types
export interface IUser {
  _id: string
  email: string
  name: string
  avatar?: string
  role: 'owner' | 'admin' | 'manager' | 'member'
  createdAt: Date
  updatedAt: Date
}

// Workspace Types
export interface Workspace {
  _id: string
  name: string
  slug: string
  logo?: string
  industry: string
  companySize: '1-10' | '11-50' | '51-200' | '201-500' | '500+'
  ownerId: string
  members: WorkspaceMember[]
  settings: WorkspaceSettings
  createdAt: Date
  updatedAt: Date
}

export interface WorkspaceMember {
  userId: string
  role: 'owner' | 'admin' | 'manager' | 'member'
  joinedAt: Date
  invitedBy: string
}

export interface WorkspaceSettings {
  timezone: string
  dateFormat: string
  currency: string
  branding: {
    primaryColor?: string
    logo?: string
    companyName?: string
  }
}

// CRM Module Types
export interface Module {
  _id: string
  workspaceId: string
  name: string
  singularName: string
  icon: string
  description?: string
  color: string
  fields: Field[]
  views: View[]
  permissions: ModulePermissions
  createdAt: Date
  updatedAt: Date
}

export interface Field {
  _id: string
  name: string
  label: string
  type: FieldType
  required: boolean
  options?: FieldOption[]
  defaultValue?: any
  validation?: FieldValidation
  order: number
  createdAt: Date
  updatedAt: Date
}

export type FieldType = 
  | 'text'
  | 'number'
  | 'email'
  | 'phone'
  | 'date'
  | 'datetime'
  | 'dropdown'
  | 'multiselect'
  | 'checkbox'
  | 'currency'
  | 'textarea'
  | 'status'
  | 'user'
  | 'file'
  | 'relation'
  | 'formula'
  | 'tags'
  | 'url'

export interface FieldOption {
  label: string
  value: string
  color?: string
}

export interface FieldValidation {
  min?: number
  max?: number
  pattern?: string
  message?: string
}

export interface View {
  _id: string
  name: string
  type: ViewType
  filters: Filter[]
  sorts: Sort[]
  columns: string[]
  layout: ViewLayout
  isDefault: boolean
  isPublic: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export type ViewType = 'table' | 'kanban' | 'calendar' | 'list'
export type ViewLayout = {
  [key: string]: any
}

export interface Filter {
  field: string
  operator: FilterOperator
  value: any
}

export type FilterOperator = 
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'not_contains'
  | 'starts_with'
  | 'ends_with'
  | 'greater_than'
  | 'less_than'
  | 'greater_equal'
  | 'less_equal'
  | 'is_empty'
  | 'is_not_empty'
  | 'in'
  | 'not_in'

export interface Sort {
  field: string
  direction: 'asc' | 'desc'
}

export interface ModulePermissions {
  view: string[]
  create: string[]
  edit: string[]
  delete: string[]
}

// Record Types
export interface CRMRecord {
  _id: string
  moduleId: string
  workspaceId: string
  data: Record<string, any>
  createdBy: string
  updatedBy: string
  createdAt: Date
  updatedAt: Date
}

// Pipeline Types
export interface Pipeline {
  _id: string
  moduleId: string
  workspaceId: string
  name: string
  description?: string
  stages: PipelineStage[]
  settings: PipelineSettings
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface PipelineStage {
  _id: string
  name: string
  description?: string
  color: string
  probability?: number
  order: number
  automation?: StageAutomation
}

export interface PipelineSettings {
  allowBackwardMovement: boolean
  requireReasonForMovement: boolean
  autoAssignOnStageChange: boolean
}

export interface StageAutomation {
  triggers: AutomationTrigger[]
  actions: AutomationAction[]
}

// Form Types
export interface Form {
  _id: string
  moduleId: string
  workspaceId: string
  name: string
  description?: string
  fields: FormField[]
  settings: FormSettings
  submissions: number
  status: 'active' | 'inactive' | 'draft'
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface FormField {
  fieldId: string
  label: string
  required: boolean
  order: number
  placeholder?: string
  helpText?: string
}

export interface FormSettings {
  submitButtonText: string
  successMessage: string
  redirectUrl?: string
  allowMultipleSubmissions: boolean
  collectIpAddress: boolean
  notifications: FormNotification[]
}

export interface FormNotification {
  type: 'email' | 'webhook'
  recipient: string
  template?: string
  url?: string
}

// Automation Types
export interface Automation {
  _id: string
  workspaceId: string
  name: string
  description?: string
  trigger: AutomationTrigger
  conditions: AutomationCondition[]
  actions: AutomationAction[]
  isActive: boolean
  runCount: number
  lastRun?: Date
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface AutomationTrigger {
  type: TriggerType
  moduleId?: string
  field?: string
  value?: any
}

export type TriggerType = 
  | 'record_created'
  | 'record_updated'
  | 'record_deleted'
  | 'field_changed'
  | 'stage_changed'
  | 'form_submitted'
  | 'scheduled'
  | 'manual'

export interface AutomationCondition {
  field: string
  operator: FilterOperator
  value: any
  logicalOperator?: 'and' | 'or'
}

export interface AutomationAction {
  type: ActionType
  config: ActionConfig
  delay?: number
}

export type ActionType = 
  | 'update_field'
  | 'create_record'
  | 'send_notification'
  | 'assign_user'
  | 'add_tag'
  | 'create_task'
  | 'send_email'
  | 'webhook'

export interface ActionConfig {
  [key: string]: any
}

// Dashboard Types
export interface Dashboard {
  _id: string
  workspaceId: string
  name: string
  description?: string
  widgets: Widget[]
  layout: DashboardLayout
  isPublic: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface Widget {
  _id: string
  type: WidgetType
  title: string
  dataSource: WidgetDataSource
  config: WidgetConfig
  position: WidgetPosition
  createdAt: Date
  updatedAt: Date
}

export type WidgetType = 
  | 'stat_card'
  | 'chart'
  | 'table'
  | 'list'
  | 'calendar'
  | 'activity'

export interface WidgetDataSource {
  moduleId?: string
  metric?: string
  filters?: Filter[]
  aggregation?: 'count' | 'sum' | 'avg' | 'min' | 'max'
}

export interface WidgetConfig {
  chartType?: 'bar' | 'line' | 'pie' | 'donut' | 'area'
  xAxis?: string
  yAxis?: string
  groupBy?: string
  dateRange?: string
  limit?: number
  [key: string]: any
}

export interface WidgetPosition {
  x: number
  y: number
  w: number
  h: number
}

export interface DashboardLayout {
  columns: number
  rowHeight: number
  margin: [number, number]
}

// Activity Types
export interface Activity {
  _id: string
  workspaceId: string
  type: ActivityType
  entityType: 'record' | 'module' | 'pipeline' | 'form' | 'automation' | 'user'
  entityId: string
  userId: string
  details: ActivityDetails
  createdAt: Date
}

export type ActivityType = 
  | 'created'
  | 'updated'
  | 'deleted'
  | 'viewed'
  | 'commented'
  | 'assigned'
  | 'mentioned'

export interface ActivityDetails {
  [key: string]: any
}

// Notification Types
export interface Notification {
  _id: string
  userId: string
  workspaceId: string
  type: NotificationType
  title: string
  message: string
  data?: NotificationData
  read: boolean
  createdAt: Date
  readAt?: Date
}

export type NotificationType = 
  | 'mention'
  | 'assignment'
  | 'reminder'
  | 'automation'
  | 'system'
  | 'form_submission'

export interface NotificationData {
  entityId?: string
  entityType?: string
  actionUrl?: string
  [key: string]: any
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Template Types
export interface Template {
  _id: string
  name: string
  description: string
  category: TemplateCategory
  preview: string
  modules: ModuleTemplate[]
  pipelines: PipelineTemplate[]
  forms: FormTemplate[]
  automations: AutomationTemplate[]
  isPublic: boolean
  usageCount: number
  rating?: number
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export type TemplateCategory = 
  | 'sales'
  | 'real-estate'
  | 'clinic'
  | 'recruitment'
  | 'agency'
  | 'support'
  | 'project'
  | 'custom'

export interface ModuleTemplate {
  name: string
  singularName: string
  icon: string
  fields: Omit<Field, '_id' | 'createdAt' | 'updatedAt'>[]
}

export interface PipelineTemplate {
  name: string
  moduleId: string
  stages: Omit<PipelineStage, '_id'>[]
}

export interface FormTemplate {
  name: string
  moduleId: string
  fields: FormField[]
}

export interface AutomationTemplate {
  name: string
  trigger: AutomationTrigger
  conditions: AutomationCondition[]
  actions: AutomationAction[]
}
