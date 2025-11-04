export type InputType = 
  | "text" 
  | "textarea" 
  | "select" 
  | "date" 
  | "file" 
  | "grid";

export type FormInput = {
  id: string;
  name: string;
  description?: string;
  type: InputType;
  options?: string[];
  required?: boolean;
};

export type FormSection = {
  name: string;
  description?: string;
  inputs: FormInput[];
};

export type FormConfig = {
  name: string;
  description: string;
  sections: FormSection[];
};
