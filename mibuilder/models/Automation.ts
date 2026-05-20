import mongoose, { Schema, Document } from 'mongoose'

export interface IAutomationCondition {
  id: string
  field: string
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than' | 'greater_equal' | 'less_equal' | 'is_empty' | 'is_not_empty' | 'in' | 'not_in'
  value: any
  logicalOperator?: 'and' | 'or'
  groupId?: string
}

export interface IAutomationAction {
  id: string
  type: 'update_field' | 'create_record' | 'delete_record' | 'move_row' | 'duplicate_row' | 'connect_row' | 'notify_user' | 'assign_user' | 'send_email' | 'webhook'
  config: Record<string, any>
  delay?: number
  targetBoardId?: string
}

export interface IAutomationTrigger {
  type: 'record_created' | 'record_updated' | 'record_deleted' | 'field_changed' | 'stage_changed' | 'form_submitted' | 'scheduled' | 'manual'
  boardId?: string
  field?: string
  value?: any
  schedule?: string
}

export interface IAutomation extends Document {
  name: string
  description?: string
  workspaceId: string
  boardId: string
  trigger: IAutomationTrigger
  conditions: IAutomationCondition[]
  actions: IAutomationAction[]
  isActive: boolean
  runCount: number
  lastRun?: Date
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const conditionSchema = new Schema<IAutomationCondition>({
  id: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  operator: {
    type: String,
    required: true,
    enum: ['equals', 'not_equals', 'contains', 'not_contains', 'starts_with', 'ends_with', 'greater_than', 'less_than', 'greater_equal', 'less_equal', 'is_empty', 'is_not_empty', 'in', 'not_in'],
  },
  value: {
    type: Schema.Types.Mixed,
  },
  logicalOperator: {
    type: String,
    enum: ['and', 'or'],
    default: 'and',
  },
  groupId: {
    type: String,
  },
}, { _id: false })

const actionSchema = new Schema<IAutomationAction>({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['update_field', 'create_record', 'delete_record', 'move_row', 'duplicate_row', 'connect_row', 'notify_user', 'assign_user', 'send_email', 'webhook'],
  },
  config: {
    type: Schema.Types.Mixed,
    default: {},
  },
  delay: {
    type: Number,
    default: 0,
  },
  targetBoardId: {
    type: String,
  },
}, { _id: false })

const triggerSchema = new Schema<IAutomationTrigger>({
  type: {
    type: String,
    required: true,
    enum: ['record_created', 'record_updated', 'record_deleted', 'field_changed', 'stage_changed', 'form_submitted', 'scheduled', 'manual'],
  },
  boardId: {
    type: String,
  },
  field: {
    type: String,
  },
  value: {
    type: Schema.Types.Mixed,
  },
  schedule: {
    type: String,
  },
}, { _id: false })

const automationSchema = new Schema<IAutomation>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  workspaceId: {
    type: String,
    required: true,
    ref: 'Workspace',
  },
  boardId: {
    type: String,
    required: true,
    ref: 'Board',
  },
  trigger: {
    type: triggerSchema,
    required: true,
  },
  conditions: [conditionSchema],
  actions: [actionSchema],
  isActive: {
    type: Boolean,
    default: true,
  },
  runCount: {
    type: Number,
    default: 0,
  },
  lastRun: {
    type: Date,
  },
  createdBy: {
    type: String,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
}, {
  timestamps: true,
})

export const Automation = mongoose.models.Automation || mongoose.model('Automation', automationSchema)

export class AutomationModel {
  static async create(automationData: Omit<IAutomation, '_id' | 'createdAt' | 'updatedAt'>): Promise<IAutomation> {
    const newAutomation = new Automation(automationData);
    return await newAutomation.save();
  }

  static async findById(id: string): Promise<IAutomation | null> {
    return Automation.findById(id);
  }

  static async findByWorkspace(workspaceId: string): Promise<IAutomation[]> {
    return Automation.find({ workspaceId });
  }

  static async findByBoard(boardId: string): Promise<IAutomation[]> {
    return Automation.find({ boardId });
  }

  static async findActiveByBoard(boardId: string): Promise<IAutomation[]> {
    return Automation.find({ boardId, isActive: true });
  }

  static async update(id: string, automationData: Partial<IAutomation>): Promise<IAutomation | null> {
    return Automation.findByIdAndUpdate(id, automationData, { new: true });
  }

  static async delete(id: string): Promise<boolean> {
    const result = await Automation.findByIdAndDelete(id);
    return result !== null;
  }

  static async toggleActive(id: string): Promise<IAutomation | null> {
    const automation = await Automation.findById(id);
    if (!automation) return null;
    
    automation.isActive = !automation.isActive;
    return await automation.save();
  }

  static async incrementRunCount(id: string): Promise<IAutomation | null> {
    return Automation.findByIdAndUpdate(
      id,
      { $inc: { runCount: 1 }, lastRun: new Date() },
      { new: true }
    );
  }

  static async evaluateConditions(
    automation: IAutomation,
    rowData: Record<string, any>
  ): Promise<boolean> {
    if (!automation.conditions || automation.conditions.length === 0) {
      return true;
    }

    // Group conditions by groupId
    const groups: Record<string, IAutomationCondition[]> = {};
    automation.conditions.forEach(condition => {
      const groupId = condition.groupId || 'default';
      if (!groups[groupId]) {
        groups[groupId] = [];
      }
      groups[groupId].push(condition);
    });

    // Evaluate each group
    const groupResults: boolean[] = [];
    for (const groupId in groups) {
      const conditions = groups[groupId];
      let groupResult = true;
      let currentOperator: 'and' | 'or' = 'and';

      for (let i = 0; i < conditions.length; i++) {
        const condition = conditions[i];
        const conditionResult = this.evaluateCondition(condition, rowData);

        if (i === 0) {
          groupResult = conditionResult;
        } else {
          if (currentOperator === 'and') {
            groupResult = groupResult && conditionResult;
          } else {
            groupResult = groupResult || conditionResult;
          }
        }

        currentOperator = condition.logicalOperator || 'and';
      }

      groupResults.push(groupResult);
    }

    // All groups must be true (AND between groups)
    return groupResults.every(result => result);
  }

  static evaluateCondition(
    condition: IAutomationCondition,
    rowData: Record<string, any>
  ): boolean {
    const fieldValue = rowData[condition.field];
    const conditionValue = condition.value;

    switch (condition.operator) {
      case 'equals':
        return fieldValue === conditionValue;
      case 'not_equals':
        return fieldValue !== conditionValue;
      case 'contains':
        return String(fieldValue || '').toLowerCase().includes(String(conditionValue || '').toLowerCase());
      case 'not_contains':
        return !String(fieldValue || '').toLowerCase().includes(String(conditionValue || '').toLowerCase());
      case 'starts_with':
        return String(fieldValue || '').toLowerCase().startsWith(String(conditionValue || '').toLowerCase());
      case 'ends_with':
        return String(fieldValue || '').toLowerCase().endsWith(String(conditionValue || '').toLowerCase());
      case 'greater_than':
        return Number(fieldValue) > Number(conditionValue);
      case 'less_than':
        return Number(fieldValue) < Number(conditionValue);
      case 'greater_equal':
        return Number(fieldValue) >= Number(conditionValue);
      case 'less_equal':
        return Number(fieldValue) <= Number(conditionValue);
      case 'is_empty':
        return !fieldValue || fieldValue === '' || (Array.isArray(fieldValue) && fieldValue.length === 0);
      case 'is_not_empty':
        return fieldValue && fieldValue !== '' && !(Array.isArray(fieldValue) && fieldValue.length === 0);
      case 'in':
        return Array.isArray(conditionValue) && conditionValue.includes(fieldValue);
      case 'not_in':
        return Array.isArray(conditionValue) && !conditionValue.includes(fieldValue);
      default:
        return true;
    }
  }
}
