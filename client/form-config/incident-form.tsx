import { FormConfig } from "@/types/form";

export const incidentFormConfig: FormConfig = {
  name: "Incident Report Form",
  description: "Please provide detailed information about the incident",
  sections: [
    {
      name: "Informant's Particulars",
      description: "Your personal details",
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
          id: "dob",
          name: "Date of Birth",
          type: "date",
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
      name: "General Information of the Accident",
      description: "Information about the incident",
      inputs: [
        {
          id: "accident_type",
          name: "Accident Type",
          type: "select",
          options: ["Injury", "Other"],
          required: true,
        },
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
          id: "weather",
          name: "Weather Conditions",
          description: "Please describe the weather conditions at the time",
          type: "text",
          required: true,
        },
        {
          id: "road_surface",
          name: "Road Surface Conditions",
          description:
            "Please describe the road surface conditions at the time",
          type: "text",
          required: true,
        },
        {
          id: "collision_type",
          name: "Type of Collision",
          type: "grid",
          options: ["Head-on", "Rear-end", "Side-impact", "Rollover", "Other"],
          required: true,
        },
      ],
    },
    {
      name: "Details of Person Involved",
      description: "Information about Persons involved",
      inputs: [
        {
          id: "pedestrians_involved",
          name: "Pedestrians Involved",
          type: "select",
          options: ["Yes", "No"],
          required: true,
        },
        {
          id: "number_of_injured_pedestrians",
          name: "Number of Injured Pedestrians",
          type: "select",
          options: ["0", "1", "2", "3", "4", "More than 5"],
          required: true,
        },
        {
          id: "pedestrian_crossing",
          name: "Use of Pedestrian Crossing",
          type: "grid",
          options: ["Yes", "No", "Not Applicable"],
          required: true,
        },
        {
          id: "weather",
          name: "Weather Conditions",
          description: "Please describe the weather conditions at the time",
          type: "text",
          required: true,
        },
        {
          id: "road_surface",
          name: "Road Surface Conditions",
          description:
            "Please describe the road surface conditions at the time",
          type: "text",
          required: true,
        },
        {
          id: "collision_type",
          name: "Type of Collision",
          type: "grid",
          options: ["Head-on", "Rear-end", "Side-impact", "Rollover", "Other"],
          required: true,
        },
      ],
    },
    {
      name: "Preview",
      description: "Preview the generated report as a PDF before final submission",
      inputs: [],
    },
  ],
};
