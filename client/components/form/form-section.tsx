import { FormInput } from "./form-input";
import { FormSection as FormSectionType } from "@/types/form";
import { useFormContext } from "@/contexts/form-context";

interface FormSectionProps {
  section: FormSectionType;
  values: Record<string, string>;
  onChange: (inputId: string, value: string) => void;
  belowDescription?: React.ReactNode;
}

export function FormSection({
  section,
  values,
  onChange,
  belowDescription,
}: FormSectionProps) {
  const { formData } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{section.name}</h2>
        {section.description && (
          <p className="text-gray-600">{section.description}</p>
        )}
        {belowDescription}
      </div>

      <div className="space-y-10">
        {section.inputs.map((input) => (
          <FormInput
            key={input.id}
            input={input}
            value={formData[input.id] || values[input.id] || ""}
            onChange={(value) => onChange(input.id, value)}
          />
        ))}
      </div>
    </div>
  );
}
