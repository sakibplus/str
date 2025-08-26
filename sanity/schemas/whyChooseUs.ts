import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'whyChooseUs',
  title: 'Why Choose Us Section (Home Page)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'id', type: 'number', title: 'ID'},
            {name: 'title', type: 'string', title: 'Feature Title'},
            {name: 'description', type: 'text', title: 'Feature Description'},
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              fields: [{name: 'alt', type: 'string', title: 'Alternative text'}],
            },
          ],
        },
      ],
    }),
  ],
})
