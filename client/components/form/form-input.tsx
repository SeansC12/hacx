import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormInput as FormInputType } from "@/types/form";
import { useFormContext } from "@/contexts/form-context";

interface FormInputProps {
  input: FormInputType;
  value: string;
  onChange: (value: string) => void;
}

export function FormInput({ input, value, onChange }: FormInputProps) {
  const { pendingUpdate } = useFormContext();
  const isPending = pendingUpdate?.inputId === input.id;

  const renderInput = () => {
    switch (input.type) {
      case "text":
        return (
          <div className="relative">
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={input.name}
              className={isPending ? "border-yellow-500 bg-yellow-50" : ""}
            />
            {isPending && (
              <div className="absolute top-10 left-0 text-xs text-yellow-600 font-medium">
                Pending confirmation
              </div>
            )}
          </div>
        );

      case "textarea":
        return (
          <div className="relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              rows={3}
              className={`w-full p-2 border rounded-md resize-none ${
                isPending ? "border-yellow-500 bg-yellow-50" : ""
              }`}
              placeholder={input.name}
            />
            {isPending && (
              <div className="absolute top-14 left-0 text-xs text-yellow-600 font-medium">
                Pending confirmation
              </div>
            )}
          </div>
        );

      case "select":
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger
              className={isPending ? "border-yellow-500 bg-yellow-50" : ""}
            >
              <SelectValue placeholder={`Select ${input.name}`} />
            </SelectTrigger>
            <SelectContent>
              {input.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "date":
        return (
          <Input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={isPending ? "border-yellow-500 bg-yellow-50" : ""}
          />
        );

      case "grid":
        return (
          <div className="grid grid-cols-3 gap-4">
            {input.options?.map((option) => (
              <Card
                key={option}
                className={`cursor-pointer transition-colors ${
                  value === option
                    ? "border-blue-500 bg-blue-50"
                    : isPending && pendingUpdate.value === option
                      ? "border-yellow-500 bg-yellow-50"
                      : "hover:bg-gray-50"
                }`}
                onClick={() => onChange(option)}
              >
                <CardHeader>
                  <CardTitle className="text-sm">{option}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        );

      case "file":
        return (
          <Button
            variant="outline"
            onClick={() => onChange("file-selected")}
            className="w-full"
          >
            Choose File
          </Button>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {input.name}
        {input.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {input.description && (
        <p className="text-sm text-gray-600">{input.description}</p>
      )}
      {renderInput()}
    </div>
  );
}
