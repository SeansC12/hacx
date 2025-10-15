import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronUp, ChevronDown, FileText, Mail, Usb } from 'lucide-react';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"

// Types from the previous artifact
type ShortTextInput = { type: 'short_text' };
type LongTextInput = { type: 'long_text' };
type FileUploadInput = { type: 'file_upload' };
type DateTimeInput = { type: 'date_time'; options: { includeDate: boolean; includeTime: boolean } };
type DropdownSelectorInput = { type: 'dropdown'; options: string[]; allowOther: boolean };
type GridSelectorInput = { type: 'grid'; options: string[] };
type AddressInput = { type: 'address' };

type FormInputType = ShortTextInput | LongTextInput | FileUploadInput | DateTimeInput | DropdownSelectorInput | GridSelectorInput | AddressInput;

type FormInput = { id: string; name: string; description?: string; input: FormInputType };

type ImageItem = { itemType: 'image'; src: string; alt?: string };
type TextItem = { itemType: 'text'; level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body'; content: string };
type FormInputItem = { itemType: 'input'; formInput: FormInput };
type CombinedItem = { itemType: 'combined'; items: FormItem[] };

type FormItem = ImageItem | TextItem | FormInputItem | CombinedItem;
type FormSection = { name: string; description?: string; items: FormItem[] };
type ReportForm = { name: string; description: string; sections: FormSection[] };

// Main component
export default function ReportFormUI({ form }: { form: ReportForm }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  const updateFormData = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setShowTopFade(el.scrollTop > 0);
      setShowBottomFade(el.scrollTop < el.scrollHeight - el.clientHeight - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [currentSection]);

  const scrollBy = (amount: number) => {
    scrollContainerRef.current?.scrollBy({ top: amount, behavior: 'smooth' });
  };

  const getAllInputIds = (items: FormItem[]): string[] => {
    const ids: string[] = [];
    items.forEach(item => {
      if (item.itemType === 'input') {
        ids.push(item.formInput.id);
      } else if (item.itemType === 'combined') {
        ids.push(...getAllInputIds(item.items));
      }
    });
    return ids;
  };

  const isSectionComplete = (sectionIndex: number) => {
    const section = form.sections[sectionIndex];
    const requiredIds = getAllInputIds(section.items);
    return requiredIds.every(id => {
      const input = findInputById(section.items, id);
      if (!input) return false;
      // TODO: FileUploadInput, DateTimeInput, DropdownSelectorInput assumed filled
      if (input.input.type === 'file_upload' || input.input.type === 'date_time' || input.input.type === 'dropdown') {
        return true;
      }
      return formData[id] && formData[id].toString().trim() !== '';
    });
  };

  const findInputById = (items: FormItem[], id: string): FormInput | null => {
    for (const item of items) {
      if (item.itemType === 'input' && item.formInput.id === id) {
        return item.formInput;
      } else if (item.itemType === 'combined') {
        const found = findInputById(item.items, id);
        if (found) return found;
      }
    }
    return null;
  };

  const goToSection = (index: number) => {
    if (index === currentSection || isAnimating) return;
    setDirection(index > currentSection ? 'down' : 'up');
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
      case 'short_text':
        inputElement = (
          <Input
            id={id}
            value={formData[id] || ''}
            onChange={(e) => updateFormData(id, e.target.value)}
            style={{ width: '100%' }}
          />
        );
        break;

      case 'long_text':
        inputElement = (
          <textarea
            id={id}
            value={formData[id] || ''}
            onChange={(e) => updateFormData(id, e.target.value)}
            rows={3}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              resize: 'vertical',
              fontFamily: 'inherit',
              fontSize: 'inherit'
            }}
          />
        );
        break;

      case 'address':
        inputElement = (
          <Input
            id={id}
            value={formData[id] || ''}
            onChange={(e) => updateFormData(id, e.target.value)}
            placeholder="Address"
            style={{ width: '100%' }}
          />
        );
        break;

      case 'grid':
        inputElement = (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            {input.options.map((option) => (
              <Card
                key={option}
                onClick={() => updateFormData(id, option)}
                style={{
                  cursor: 'pointer',
                  border: formData[id] === option ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                  backgroundColor: formData[id] === option ? '#eff6ff' : 'white'
                }}
              >
                <CardHeader>
                  <CardTitle style={{ fontSize: '1rem' }}>{option}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        );
        break;

      case 'file_upload':
        inputElement = (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            {[
              { label: 'Scan File', icon: FileText },
              { label: 'Email File', icon: Mail },
              { label: 'Use USB Drive', icon: Usb }
            ].map(({ label, icon: Icon }) => (
              <Card
                key={label}
                onClick={() => updateFormData(id, label)}
                style={{
                  cursor: 'pointer',
                  border: formData[id] === label ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                  backgroundColor: formData[id] === label ? '#eff6ff' : 'white'
                }}
              >
                <CardHeader style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <Icon size={24} />
                  <CardTitle style={{ fontSize: '1rem' }}>{label}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        );
        break;

      case 'date_time':
        // TODO: Implement DateTimeInput
        inputElement = (
          <Input
            id={id}
            value={formData[id] || ''}
            onChange={(e) => updateFormData(id, e.target.value)}
            placeholder="Date/Time (TODO)"
            style={{ width: '100%' }}
          />
        );
        break;

      case 'dropdown':
        // TODO: Implement DropdownSelectorInput
        inputElement = (
          <Input
            id={id}
            value={formData[id] || ''}
            onChange={(e) => updateFormData(id, e.target.value)}
            placeholder="Select... (TODO)"
            style={{ width: '100%' }}
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
      case 'text':
        const TextTag = item.level === 'body' ? 'p' : item.level;
        return <TextTag key={index}>{item.content}</TextTag>;

      case 'image':
        return <img key={index} src={item.src} alt={item.alt} style={{ maxWidth: '100%' }} />;

      case 'input':
        return renderInput(item.formInput);

      case 'combined':
        return (
          <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            {item.items.map((subItem, subIndex) => (
              <div key={subIndex} style={{ flex: 1 }}>
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
    <div style={{ width: '70%', display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left sidebar */}
      <div style={{ width: '33%', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div style={{ textAlign: 'right' }}>
          {form.sections.slice(0, maxVisibleSection + 1).map((sec, idx) => (
            <div
              key={idx}
              onClick={() => goToSection(idx)}
              style={{
                padding: '0.5rem 1rem',
                marginBottom: '0.5rem',
                cursor: 'pointer',
                fontWeight: idx === currentSection ? 'bold' : 'normal',
                color: idx === currentSection ? '#3b82f6' : '#374151',
                borderRight: idx === currentSection ? '3px solid #3b82f6' : 'none'
              }}
            >
              {sec.name}
            </div>
          ))}
        </div>
      </div>

      {/* Main form area */}
      <div style={{ width: '66%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', position: 'relative' }}>
        {/* Previous button */}
        {currentSection > 0 && (
          <Button
            onClick={() => goToSection(currentSection - 1)}
            style={{ marginBottom: '1rem', alignSelf: 'flex-start' }}
            disabled={isAnimating}
          >
            Previous
          </Button>
        )}

        {/* Scroll container with fade effects */}
        <div style={{ position: 'relative', width: '100%', flex: 1, display: 'flex', justifyContent: 'center' }}>
          {showTopFade && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40px',
              background: 'linear-gradient(to bottom, white, transparent)',
              pointerEvents: 'none',
              zIndex: 10
            }} />
          )}
          
          {showTopFade && (
            <Button
              onClick={() => scrollBy(-100)}
              style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 20 }}
              size="sm"
            >
              <ChevronUp size={16} />
            </Button>
          )}

          <div
            ref={scrollContainerRef}
            style={{
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              display: 'flex',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <div
              style={{
                animation: isAnimating ? `slide${direction === 'down' ? 'Up' : 'Down'}Out 0.3s ease-out` : `slide${direction === 'down' ? 'Down' : 'Up'}In 0.3s ease-out`,
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <FieldSet style={{ width: '80%' }}>
                <FieldLegend>{section.name}</FieldLegend>
                <FieldDescription>{section.description}</FieldDescription>
                <FieldGroup>
                  {section.items.map((item, idx) => renderItem(item, idx))}
                </FieldGroup>
              </FieldSet>
            </div>
          </div>

          {showBottomFade && (
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40px',
              background: 'linear-gradient(to top, white, transparent)',
              pointerEvents: 'none',
              zIndex: 10
            }} />
          )}

          {showBottomFade && (
            <Button
              onClick={() => scrollBy(100)}
              style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 20 }}
              size="sm"
            >
              <ChevronDown size={16} />
            </Button>
          )}
        </div>

        {/* Next button */}
        {isComplete && currentSection < form.sections.length - 1 && (
          <Button
            onClick={() => goToSection(currentSection + 1)}
            style={{ marginTop: '1rem', alignSelf: 'flex-end' }}
            disabled={isAnimating}
          >
            Next
          </Button>
        )}

        <style>{`
          @keyframes slideDownOut {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-20px); opacity: 0; }
          }
          @keyframes slideUpOut {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(20px); opacity: 0; }
          }
          @keyframes slideDownIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes slideUpIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}