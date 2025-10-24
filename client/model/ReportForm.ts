// Base types for form inputs
export type ShortTextInput = {
  type: "short_text";
};

export type LongTextInput = {
  type: "long_text";
};

export type FileUploadInput = {
  type: "file_upload";
};

export type DateTimeInput = {
  type: "date_time";
  options: {
    includeDate: boolean;
    includeTime: boolean;
  };
};

export type DropdownSelectorInput = {
  type: "dropdown";
  options: string[];
  allowOther: boolean;
};

export type GridSelectorInput = {
  type: "grid";
  options: string[];
};

export type AddressInput = {
  type: "address";
};

// Union type for all input types
export type FormInputType =
  | ShortTextInput
  | LongTextInput
  | FileUploadInput
  | DateTimeInput
  | DropdownSelectorInput
  | GridSelectorInput
  | AddressInput;

// FormInput contains the input configuration
export type FormInput = {
  id: string;
  name: string;
  description?: string;
  input: FormInputType;
};

// Base types for form items
export type ImageItem = {
  itemType: "image";
  src: string;
  alt?: string;
};

export type TextItem = {
  itemType: "text";
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body";
  content: string;
};

export type FormInputItem = {
  itemType: "input";
  formInput: FormInput;
};

export type CombinedItem = {
  itemType: "combined";
  items: FormItem[];
};

// Union type for all form items
export type FormItem = ImageItem | TextItem | FormInputItem | CombinedItem;

// FormSection contains a collection of form items
export type FormSection = {
  name: string;
  description?: string;
  items: FormItem[];
};

// ReportForm is the top-level container
export type ReportForm = {
  name: string;
  description: string;
  sections: FormSection[];
};

// Example form
export const exampleIncidentReport: ReportForm = {
  name: "Incident Report Form",
  description:
    "Please provide detailed information about the incident and your contact details.",
  sections: [
    {
      name: "Informant Information",
      description: "Please provide your personal information",
      items: [
        {
          itemType: "text",
          level: "h3",
          content: "Fill in with SingPass 📱",
        },
        {
          itemType: "input",
          formInput: {
            id: "informant_name",
            name: "Name of Informant",
            input: { type: "short_text" },
          },
        },
        {
          itemType: "input",
          formInput: {
            id: "reporting_datetime",
            name: "Date of Reporting",
            input: {
              type: "date_time",
              options: {
                includeDate: true,
                includeTime: true,
              },
            },
          },
        },
        {
          itemType: "combined",
          items: [
            {
              itemType: "input",
              formInput: {
                id: "informant_id",
                name: "ID/NRIC",
                input: { type: "short_text" },
              },
            },
            {
              itemType: "input",
              formInput: {
                id: "informant_nationality",
                name: "Nationality",
                input: {
                  type: "dropdown",
                  options: ["Singaporean", "Malaysian", "Indonesian"],
                  allowOther: true,
                },
              },
            },
          ],
        },
        {
          itemType: "input",
          formInput: {
            id: "informant_address",
            name: "Address",
            input: { type: "long_text" },
          },
        },
        {
          itemType: "combined",
          items: [
            {
              itemType: "input",
              formInput: {
                id: "informant_phone",
                name: "Phone",
                input: { type: "short_text" },
              },
            },
            {
              itemType: "input",
              formInput: {
                id: "informant_email",
                name: "Email",
                input: { type: "short_text" },
              },
            },
          ],
        },
        {
          itemType: "combined",
          items: [
            {
              itemType: "input",
              formInput: {
                id: "informant_sex",
                name: "Sex",
                input: { type: "short_text" },
              },
            },
            {
              itemType: "input",
              formInput: {
                id: "informant_age",
                name: "Age",
                input: { type: "short_text" },
              },
            },
            {
              itemType: "input",
              formInput: {
                id: "informant_dob",
                name: "Date of Birth",
                input: { type: "short_text" },
              },
            },
          ],
        },
        {
          itemType: "input",
          formInput: {
            id: "informant_race",
            name: "Race",
            input: {
              type: "dropdown",
              options: ["Chinese", "Malay", "Indian"],
              allowOther: true,
            },
          },
        },
      ],
    },
    {
      name: "Incident Information",
      description: "Please provide details about the incident",
      items: [
        {
          itemType: "input",
          formInput: {
            id: "incident_datetime",
            name: "Date/Time of Incident",
            description: "Please specify when the incident occurred",
            input: {
              type: "date_time",
              options: {
                includeDate: true,
                includeTime: true,
              },
            },
          },
        },
        {
          itemType: "input",
          formInput: {
            id: "incident_location",
            name: "Location of Incident",
            description:
              "Please provide the complete address where the incident took place",
            input: { type: "address" },
          },
        },
        {
          itemType: "input",
          formInput: {
            id: "incident_type",
            name: "Type of Incident",
            description: "Select the category that best describes the incident",
            input: {
              type: "grid",
              options: ["Theft", "Scam", "Traffic Offense"],
            },
          },
        },
      ],
    },
    {
      name: "Acknowledgment",
      description: "Please acknowledge the following",
      items: [
        {
          itemType: "text",
          level: "body",
          content:
            "I hereby declare that the information provided is true and accurate to the best of my knowledge. I understand that providing false information may have legal consequences.",
        },
        {
          itemType: "input",
          formInput: {
            id: "acknowledgment_signature",
            name: "Signature",
            description: "Please sign your name to acknowledge",
            input: { type: "short_text" },
          },
        },
      ],
    },
  ],
};
