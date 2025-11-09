"use client";

import React, { createContext, useContext, useState } from "react";

interface FormContextType {
  formData: Record<string, string>;
  updateFormData: (inputId: string, value: string) => void;
  pendingUpdate: { inputId: string; value: string; label: string } | null;
  setPendingUpdate: (
    update: { inputId: string; value: string; label: string } | null,
  ) => void;
  confirmPendingUpdate: () => void;
  cancelPendingUpdate: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [pendingUpdate, setPendingUpdate] = useState<{
    inputId: string;
    value: string;
    label: string;
  } | null>(null);

  const updateFormData = (inputId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [inputId]: value }));
  };

  const confirmPendingUpdate = () => {
    if (pendingUpdate) {
      updateFormData(pendingUpdate.inputId, pendingUpdate.value);
      setPendingUpdate(null);
    }
  };

  const cancelPendingUpdate = () => {
    setPendingUpdate(null);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        pendingUpdate,
        setPendingUpdate,
        confirmPendingUpdate,
        cancelPendingUpdate,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormProvider");
  }
  return context;
}
