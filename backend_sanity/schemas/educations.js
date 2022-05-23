export default {
  name: "educations",
  title: "Educations",
  type: "document",
  fields: [
    {
      name: "qualification",
      title: "Qualification",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "institution",
      title: "Institution",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "year",
      title: "Year",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
