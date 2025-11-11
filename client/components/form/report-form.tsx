import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormNavigation } from "./form-navigation";
import { FormSection } from "./form-section";
import { FormConfig } from "@/types/form";
import { useFormContext } from "@/contexts/form-context";

interface ReportFormProps {
  config: FormConfig;
}

export function ReportForm({ config }: ReportFormProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const { formData, updateFormData } = useFormContext();

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
    <div className="flex justify-center h-full bg-gray-50">
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
            />
          </div>

          <div className="flex justify-between max-w-2xl">
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
