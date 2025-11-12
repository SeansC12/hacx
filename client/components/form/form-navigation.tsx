import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
        <button className="mb-4">
          <Link
            href="/"
            key="return-home"
            className={`w-full rounded p-3 text-left font-bold transition-colors`}
          >
            <ArrowLeft className="mr-2 inline-block h-4 w-4" />
            Return home
          </Link>
        </button>
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
