import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormNavigation } from "./form-navigation";
import { FormSection } from "./form-section";
import { FormConfig } from "@/types/form";
import { useFormContext } from "@/contexts/form-context";
import LogInWithSingpassButton from "@/components/log-in-with-singpass-button";
import { useRouter } from "next/navigation";

interface ReportFormProps {
  config: FormConfig;
}

export function ReportForm({ config }: ReportFormProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const { formData, updateFormData } = useFormContext();
  const router = useRouter();

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

  const handleSubmit = () => {
    // Could post formData to an API here before redirect
    router.push("/incident/success");
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
              belowDescription={(() => {
                const name = config.sections[currentSection].name;
                if (name === "Personal Information") {
                  return (
                    <LogInWithSingpassButton
                      onClick={() => {}}
                      className="mt-3 h-10 cursor-pointer select-none"
                    />
                  );
                }
                if (name === "Preview") {
                  return (
                    <div className="mt-4 space-y-2">
                      <div className="overflow-hidden rounded-md border bg-white shadow">
                        <iframe
                          src="/form.pdf"
                          title="Report preview"
                          className="h-[800px] w-full"
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        If the PDF does not load correctly,{" "}
                        <a
                          href="/form.pdf"
                          target="_blank"
                          rel="noreferrer"
                          className="underline"
                        >
                          open it in a new tab
                        </a>
                        .
                      </p>
                    </div>
                  );
                }
                return undefined;
              })()}
            />
          </div>

          <div className="flex items-center w-full justify-between">
            <Button
              onClick={handlePrev}
              disabled={!canGoToPrev()}
              variant="outline"
            >
              Previous
            </Button>

            {currentSection === config.sections.length - 1 ? (
              <Button onClick={handleSubmit}>Submit Report</Button>
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
