import React from "react";

interface FormNavigationProps {
  sections: { name: string }[];
  currentSection: number;
  onSectionChange: (index: number) => void;
  maxAccessibleSection: number;
}

export function FormNavigation({
  sections,
  currentSection,
  onSectionChange,
  maxAccessibleSection,
}: FormNavigationProps) {
  return (
    <nav className="w-64 border-r p-6">
      <div className="space-y-2">
        {sections.slice(0, maxAccessibleSection + 1).map((section, index) => (
          <button
            key={index}
            onClick={() => onSectionChange(index)}
            className={`w-full rounded p-3 text-left transition-colors ${
              index === currentSection
                ? "bg-blue-100 font-medium text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {section.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
