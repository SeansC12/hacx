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
  maxAccessibleSection 
}: FormNavigationProps) {
  return (
    <nav className="w-64 p-6 border-r">
      <div className="space-y-2">
        {sections.slice(0, maxAccessibleSection + 1).map((section, index) => (
          <button
            key={index}
            onClick={() => onSectionChange(index)}
            className={`w-full text-left p-3 rounded transition-colors ${
              index === currentSection
                ? "bg-blue-100 text-blue-700 font-medium"
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
