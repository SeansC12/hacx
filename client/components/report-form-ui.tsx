import React, { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ChevronUp, ChevronDown, FileText, Mail, Usb } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

// Main component
export default function ReportFormUI({ form }: { form: ReportForm }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [topFadeAmount, setTopFadeAmount] = useState(0);
  const [bottomFadeAmount, setBottomFadeAmount] = useState(0);

  const updateFormData = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setTopFadeAmount(el.scrollTop);
      setBottomFadeAmount(el.scrollHeight - el.clientHeight - el.scrollTop);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, [currentSection]);

  const scrollBy = (amount: number) => {
    scrollContainerRef.current?.scrollBy({ top: amount, behavior: "smooth" });
  };

  const getAllInputIds = (items: FormItem[]): string[] => {
    const ids: string[] = [];
    items.forEach((item) => {
      if (item.itemType === "input") {
        ids.push(item.formInput.id);
      } else if (item.itemType === "combined") {
        ids.push(...getAllInputIds(item.items));
      }
    });
    return ids;
  };

  const isSectionComplete = (sectionIndex: number) => {
    const section = form.sections[sectionIndex];
    const requiredIds = getAllInputIds(section.items);
    return requiredIds.every((id) => {
      const input = findInputById(section.items, id);
      if (!input) return false;
      // TODO: FileUploadInput, DateTimeInput, DropdownSelectorInput assumed filled
      if (
        input.input.type === "file_upload" ||
        input.input.type === "date_time" ||
        input.input.type === "dropdown"
      ) {
        return true;
      }
      return formData[id] && formData[id].toString().trim() !== "";
    });
  };

  const findInputById = (items: FormItem[], id: string): FormInput | null => {
    for (const item of items) {
      if (item.itemType === "input" && item.formInput.id === id) {
        return item.formInput;
      } else if (item.itemType === "combined") {
        const found = findInputById(item.items, id);
        if (found) return found;
      }
    }
    return null;
  };

  const goToSection = (index: number) => {
    if (index === currentSection || isAnimating) return;
    setDirection(index > currentSection ? "down" : "up");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSection(index);
      setIsAnimating(false);
      scrollContainerRef.current?.scrollTo(0, 0);
    }, 300);
  };

  const renderInput = (formInput: FormInput) => {
    const { id, name, description, input } = formInput;

    let inputElement: React.ReactNode = null;

    switch (input.type) {
      case "short_text":
        inputElement = (
          <Input
            id={id}
            value={formData[id] || ""}
            onChange={(e) => updateFormData(id, e.target.value)}
            className="w-full"
          />
        );
        break;

      case "long_text":
        inputElement = (
          <textarea
            id={id}
            value={formData[id] || ""}
            onChange={(e) => updateFormData(id, e.target.value)}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md resize-y font-inherit text-inherit focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );
        break;

      case "address":
        inputElement = (
          <Input
            id={id}
            value={formData[id] || ""}
            onChange={(e) => updateFormData(id, e.target.value)}
            placeholder="Address"
            className="w-full"
          />
        );
        break;

      case "grid":
        inputElement = (
          <div className="grid grid-cols-3 gap-5">
            {input.options.map((option) => (
              <Card
                key={option}
                onClick={() => updateFormData(id, option)}
                className={`cursor-pointer transition-colors ${
                  formData[id] === option
                    ? "border-2 border-blue-500 bg-blue-50"
                    : "border border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-base">{option}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        );
        break;

      case "file_upload":
        inputElement = (
          <div className="grid grid-cols-3 gap-5">
            {[
              { label: "Scan File", icon: FileText },
              { label: "Email File", icon: Mail },
              { label: "Use USB Drive", icon: Usb },
            ].map(({ label, icon: Icon }) => (
              <Card
                key={label}
                onClick={() => updateFormData(id, label)}
                className={`cursor-pointer transition-colors ${
                  formData[id] === label
                    ? "border-2 border-blue-500 bg-blue-50"
                    : "border border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <CardHeader className="flex flex-col items-center gap-2">
                  <Icon size={24} />
                  <CardTitle className="text-base">{label}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        );
        break;

      case "date_time":
        // TODO: Implement DateTimeInput
        inputElement = (
          <Input
            id={id}
            value={formData[id] || ""}
            onChange={(e) => updateFormData(id, e.target.value)}
            placeholder="Date/Time (TODO)"
            className="w-full"
          />
        );
        break;

      case "dropdown":
        // TODO: Implement DropdownSelectorInput
        inputElement = (
          <Input
            id={id}
            value={formData[id] || ""}
            onChange={(e) => updateFormData(id, e.target.value)}
            placeholder="Select... (TODO)"
            className="w-full"
          />
        );
        break;
    }

    return (
      <Field key={id}>
        <FieldLabel htmlFor={id}>{name}</FieldLabel>
        {description && <FieldDescription>{description}</FieldDescription>}
        {inputElement}
      </Field>
    );
  };

  const renderItem = (item: FormItem, index: number): React.ReactNode => {
    switch (item.itemType) {
      case "text":
        const TextTag = item.level === "body" ? "p" : item.level;
        return <TextTag key={index}>{item.content}</TextTag>;

      case "image":
        return (
          <Image
            key={index}
            src={item.src}
            alt={item.alt ?? ""}
            className="max-w-full"
          />
        );

      case "input":
        return renderInput(item.formInput);

      case "combined":
        return (
          <div key={index} className="flex gap-4 items-start">
            {item.items.map((subItem, subIndex) => (
              <div key={subIndex} className="flex-1">
                {renderItem(subItem, subIndex)}
              </div>
            ))}
          </div>
        );
    }
  };

  const section = form.sections[currentSection];
  const isComplete = isSectionComplete(currentSection);
  const maxVisibleSection = currentSection;

  return (
    <div className="w-4/5 flex overflow-hidden">
      {/* Left sidebar */}
      <div className="w-1/5 max-w-[25%] p-8 flex flex-col items-end">
        <div className="text-right w-full">
          {form.sections.slice(0, maxVisibleSection + 1).map((sec, idx) => (
            <div
              key={idx}
              onClick={() => goToSection(idx)}
              className={`px-4 py-2 mb-2 cursor-pointer border-r-4 transition-all ${
                idx === currentSection
                  ? "font-bold text-blue-600 border-blue-600"
                  : "font-normal text-gray-700 border-transparent hover:text-blue-500"
              }`}
            >
              {sec.name}
            </div>
          ))}
        </div>
      </div>

      {/* Main form area */}
      <div className="w-3/5 flex flex-col items-center p-8 pt-0 relative">
        {/* Scroll container with fade effects */}
        <div className="relative w-full max-h-[70vh] flex-1 flex justify-center overflow-visible">
          {/* Top fade overlay */}
          <div
            className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10"
            style={{
              background: `linear-gradient(to bottom, rgba(255, 255, 255, ${Math.min(
                topFadeAmount / 200,
                1,
              )}), transparent)`,
            }}
          />

          <div
            ref={scrollContainerRef}
            className="w-full h-full overflow-y-scroll flex justify-center relative"
          >
            <div
              className={`w-full flex justify-center pt-8 pb-[50rem] ${
                isAnimating
                  ? direction === "up"
                    ? "animate-slide-up-out"
                    : "animate-slide-down-out"
                  : direction === "down"
                    ? "animate-slide-down-in"
                    : "animate-slide-up-in"
              }`}
            >
              <FieldSet className="w-4/5">
                <FieldLegend>{section.name}</FieldLegend>
                <FieldDescription>{section.description}</FieldDescription>
                <FieldGroup>
                  {section.items.map((item, idx) => renderItem(item, idx))}
                </FieldGroup>
              </FieldSet>
            </div>
          </div>

          {/* Bottom fade overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
            style={{
              background: `linear-gradient(to bottom, transparent, rgba(255, 255, 255, ${Math.min(
                bottomFadeAmount / 200,
                1,
              )}))`,
            }}
          />
        </div>

        {/* Navigation buttons */}
        <div className="w-full flex justify-between mt-4">
          <Button
            onClick={() => goToSection(currentSection - 1)}
            className={`self-start ${
              currentSection <= 0 ? "opacity-50" : "opacity-100"
            }`}
            size="lg"
            disabled={isAnimating || currentSection <= 0}
          >
            Previous
          </Button>
          <div className="flex-1" />
          <Button
            onClick={() => goToSection(currentSection + 1)}
            className={`self-end bg-blue-600 hover:bg-blue-700 text-white ${
              !isComplete || currentSection >= form.sections.length - 1
                ? "opacity-50"
                : "opacity-100"
            }`}
            size="lg"
            disabled={
              isAnimating ||
              !isComplete ||
              currentSection >= form.sections.length - 1
            }
          >
            Next
          </Button>
        </div>

        {/* CSS animations */}
        <style jsx>{`
          @keyframes slide-down-out {
            from {
              transform: translateY(0);
              opacity: 1;
            }
            to {
              transform: translateY(-100vh);
              opacity: 0;
            }
          }
          @keyframes slide-up-out {
            from {
              transform: translateY(0);
              opacity: 1;
            }
            to {
              transform: translateY(100vh);
              opacity: 0;
            }
          }
          @keyframes slide-down-in {
            from {
              transform: translateY(100vh);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          @keyframes slide-up-in {
            from {
              transform: translateY(-100vh);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-slide-down-out {
            animation: slide-down-out 0.5s ease-out;
          }
          .animate-slide-up-out {
            animation: slide-up-out 0.5s ease-out;
          }
          .animate-slide-down-in {
            animation: slide-down-in 0.5s ease-out;
          }
          .animate-slide-up-in {
            animation: slide-up-in 0.5s ease-out;
          }
        `}</style>
      </div>

      {/* Right spacer with scroll buttons */}
      <div className="w-1/5 p-4 flex flex-col items-start relative">
        <Button
          onClick={() => scrollBy(-100)}
          className={`absolute top-2 left-0 z-20 ${
            topFadeAmount > 0 ? "opacity-100" : "opacity-50"
          }`}
          size="sm"
          disabled={topFadeAmount <= 0}
        >
          <ChevronUp size={16} />
        </Button>

        <Button
          onClick={() => scrollBy(100)}
          className={`absolute top-16 left-0 z-20 ${
            bottomFadeAmount > 0 ? "opacity-100" : "opacity-50"
          }`}
          size="sm"
          disabled={bottomFadeAmount <= 0}
        >
          <ChevronDown size={16} />
        </Button>
      </div>
    </div>
  );
}
