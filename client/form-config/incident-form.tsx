import { FormConfig } from "@/types/form";

export const incidentFormConfig: FormConfig = {
  name: "Incident Report Form",
  description: "Please provide detailed information about the incident",
  sections: [
    {
      name: "Personal Information",
      description: "Your contact details",
      inputs: [
        {
          id: "name",
          name: "Full Name",
          type: "text",
          required: true,
        },
        {
          id: "email",
          name: "Email Address",
          type: "text",
          required: true,
        },
        {
          id: "phone",
          name: "Phone Number",
          type: "text",
          required: true,
        },
        {
          id: "nationality",
          name: "Nationality",
          type: "select",
          options: ["Singaporean", "Malaysian", "Indonesian", "Other"],
          required: true,
        },
      ],
    },
    {
      name: "Incident Details",
      description: "Information about the incident",
      inputs: [
        {
          id: "incident_date",
          name: "Date of Incident",
          type: "date",
          required: true,
        },
        {
          id: "incident_location",
          name: "Location",
          description: "Where did the incident occur?",
          type: "textarea",
          required: true,
        },
        {
          id: "incident_type",
          name: "Type of Incident",
          type: "grid",
          options: ["Theft", "Scam", "Traffic Offense", "Assault"],
          required: true,
        },
        {
          id: "description",
          name: "Description",
          description: "Please describe what happened",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      name: "Confirmation",
      description: "Review and submit your report",
      inputs: [
        {
          id: "signature",
          name: "Digital Signature",
          description: "Type your full name to confirm",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
