export default {
  name: "works",
  title: "Works",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(1).max(20),
    },

    {
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(80),
    },
    {
      name: "projectLink",
      title: "Project Link",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(255),
    },
    {
      name: "codeLink",
      title: "Code Link",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(255),
    },
    {
      name: "imgUrl",
      title: "ImageUrl",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          name: "tag",
          title: "Tag",
          type: "string",
          validation: (Rule) => Rule.required().min(1).max(20),
        },
      ],
    },
  ],
};
