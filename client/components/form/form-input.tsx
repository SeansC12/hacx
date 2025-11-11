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

  // Show pending value if this field has a pending update, otherwise show actual value
  const displayValue = isPending ? pendingUpdate.value : value;

  const renderInput = () => {
    switch (input.type) {
      case "text":
        return (
          <div className="relative">
            <Input
              value={displayValue}
              onChange={(e) => onChange(e.target.value)}
              placeholder={input.name}
              className={
                isPending
                  ? "border-yellow-500 bg-yellow-50 text-gray-900"
                  : "text-gray-900"
              }
              disabled={isPending}
            />
            {isPending && (
              <div className="absolute top-10 left-0 text-xs text-yellow-600 font-medium">
                Pending confirmation - Say "yes" to confirm
              </div>
            )}
          </div>
        );

      case "textarea":
        return (
          <div className="relative">
            <textarea
              value={displayValue}
              onChange={(e) => onChange(e.target.value)}
              rows={3}
              className={`w-full p-2 border rounded-md resize-none text-gray-900 ${
                isPending ? "border-yellow-500 bg-yellow-50" : ""
              }`}
              placeholder={input.name}
              disabled={isPending}
            />
            {isPending && (
              <div className="absolute top-24 left-0 text-xs text-yellow-600 font-medium">
                Pending confirmation - Say "yes" to confirm
              </div>
            )}
          </div>
        );

      case "select":
        return (
          <div className="relative">
            <Select
              value={displayValue}
              onValueChange={onChange}
              disabled={isPending}
            >
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
            {isPending && (
              <div className="absolute top-10 left-0 text-xs text-yellow-600 font-medium">
                Pending confirmation - Say "yes" to confirm
              </div>
            )}
          </div>
        );

      case "date":
        return (
          <div className="relative">
            <Input
              type="date"
              value={displayValue}
              onChange={(e) => onChange(e.target.value)}
              className={
                isPending
                  ? "border-yellow-500 bg-yellow-50 text-gray-900"
                  : "text-gray-900"
              }
              disabled={isPending}
            />
            {isPending && (
              <div className="absolute top-10 left-0 text-xs text-yellow-600 font-medium">
                Pending confirmation - Say "yes" to confirm
              </div>
            )}
          </div>
        );

      case "grid":
        return (
          <>
            <div className="grid grid-cols-3 gap-4">
              {input.options?.map((option) => (
                <Card
                  key={option}
                  className={`cursor-pointer transition-colors ${
                    displayValue === option
                      ? isPending
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-blue-500 bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => !isPending && onChange(option)}
                >
                  <CardHeader>
                    <CardTitle className="text-sm text-gray-900">
                      {option}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
            {isPending && (
              <div className="text-xs text-yellow-600 font-medium text-center mt-2">
                Pending confirmation - Say "yes" to confirm
              </div>
            )}
          </>
        );

      case "file":
        return (
          <Button
            variant="outline"
            onClick={() => onChange("file-selected")}
            className="w-full"
            disabled={isPending}
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
      <label className="block text-sm font-medium text-gray-900">
        {input.name}
        {input.required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {input.description && (
        <p className="text-sm text-gray-600">{input.description}</p>
      )}
      {renderInput()}
    </div>
  );
}
