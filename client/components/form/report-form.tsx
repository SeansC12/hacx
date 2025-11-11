import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormNavigation } from "./form-navigation";
import { FormSection } from "./form-section";
import { FormConfig } from "@/types/form";
import LogInWithSingpassButton from "@/components/log-in-with-singpass-button";

interface ReportFormProps {
  config: FormConfig;
}

export function ReportForm({ config }: ReportFormProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const updateFormData = (inputId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [inputId]: value }));
  };

  const isSectionComplete = (sectionIndex: number) => {
    const section = config.sections[sectionIndex];
    const requiredInputs = section.inputs.filter((input) => input.required);

    return requiredInputs.every((input) => {
      const value = formData[input.id];
      return value && value.trim() !== "";
    });
  };

  const canGoToNext = () => {
    return (
      isSectionComplete(currentSection) &&
      currentSection < config.sections.length - 1
    );
  };

  const canGoToPrev = () => {
    return currentSection > 0;
  };

  const goToSection = (index: number) => {
    const maxAccessible = getMaxAccessibleSection();
    if (index >= 0 && index <= maxAccessible) {
      setCurrentSection(index);
    }
  };

  const getMaxAccessibleSection = () => {
    let maxSection = 0;
    for (let i = 0; i < config.sections.length; i++) {
      if (i === 0 || isSectionComplete(i - 1)) {
        maxSection = i;
      } else {
        break;
      }
    }
    return maxSection;
  };

  const handleNext = () => {
    if (canGoToNext()) {
      setCurrentSection((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (canGoToPrev()) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  return (
    <div className="flex h-full justify-center bg-gray-50">
      <div className="flex w-full max-w-[1200px] min-[670px]:px-8 lg:px-0">
        <FormNavigation
          sections={config.sections}
          currentSection={currentSection}
          onSectionChange={goToSection}
          maxAccessibleSection={getMaxAccessibleSection()}
        />

        <div className="flex-1 p-6">
          <div className="mb-8">
            <FormSection
              section={config.sections[currentSection]}
              values={formData}
              onChange={updateFormData}
              belowDescription={
                config.sections[currentSection].name ===
                "Personal Information" ? (
                  <div className="mt-2 mb-2">
                    <LogInWithSingpassButton
                      onClick={() => {}}
                      className="h-10 cursor-pointer select-none"
                    />
                  </div>
                ) : config.sections[currentSection].name ===
                  "Confirmation" ? (
                  <div className="mt-4 mb-6">
                    <div className="rounded-md border overflow-hidden bg-white">
                      <iframe
                        src="/form.pdf"
                        title="Report preview"
                        className="w-full h-[600px]"
                      />
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Can’t see the preview? {" "}
                      <a
                        href="/form.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        Open the PDF in a new tab
                      </a>
                      .
                    </div>
                  </div>
                ) : undefined
              }
            />
          </div>

          <div className="flex max-w-2xl justify-between">
            <Button
              onClick={handlePrev}
              disabled={!canGoToPrev()}
              variant="outline"
            >
              Previous
            </Button>

            {currentSection === config.sections.length - 1 ? (
              <Button onClick={() => console.log("Submit:", formData)}>
                Submit
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!canGoToNext()}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
