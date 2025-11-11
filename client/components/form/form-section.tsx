import React from "react";
import { FormInput } from "./form-input";
import { FormSection as FormSectionType } from "@/types/form";

interface FormSectionProps {
  section: FormSectionType;
  values: Record<string, string>;
  onChange: (inputId: string, value: string) => void;
  headerRight?: React.ReactNode;
  belowDescription?: React.ReactNode; // Renders between description and first input
}

export function FormSection({
  section,
  values,
  onChange,
  headerRight,
  belowDescription,
}: FormSectionProps) {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="mb-2 text-2xl font-bold">{section.name}</h2>
          {section.description && (
            <p className="text-gray-600">{section.description}</p>
          )}
        </div>
        {headerRight && <div className="flex-shrink-0 pt-1">{headerRight}</div>}
      </div>

      {belowDescription && <div className="-mt-4">{belowDescription}</div>}

      <div className="space-y-6">
        {section.inputs.map((input) => (
          <FormInput
            key={input.id}
            input={input}
            value={values[input.id] || ""}
            onChange={(value) => onChange(input.id, value)}
          />
        ))}
      </div>
    </div>
  );
}
