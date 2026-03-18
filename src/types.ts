export interface PromptState {
  language: string;
  pages: string;
  time: string;
  purpose: string;
  customPurpose: string;
  logic: string;
  customLogic: string;
  cta: string;
  customCta: string;
  role: string;
  customRole: string;
  scene: string;
  customScene: string;
  audience: string;
  customAudience: string;
  tone: string;
  customTone: string;
  visualStyle: string;
  customVisualStyle: string;
  character: string;
  customCharacter: string;
  speakerNotes: boolean;
  extraInfo: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface Section {
  id: string;
  title: string;
  fields: Field[];
}

export type FieldType = 'select' | 'number' | 'text' | 'textarea' | 'radio';

export interface Field {
  id: keyof PromptState;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  description?: string;
  customId?: keyof PromptState;
}
