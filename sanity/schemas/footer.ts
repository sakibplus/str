import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'address_line1',
      title: 'Address Line 1',
      type: 'string',
    }),
    defineField({
      name: 'address_line2',
      title: 'Address Line 2',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'links',
      title: 'Important Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'href', type: 'string', title: 'URL'},
          ],
        },
      ],
    }),
    defineField({
      name: 'newsletter_heading',
      title: 'Newsletter Heading',
      type: 'string',
    }),
    defineField({
      name: 'newsletter_placeholder',
      title: 'Newsletter Placeholder',
      type: 'string',
    }),
    defineField({
      name: 'copyright_text',
      title: 'Copyright Text',
      type: 'string',
    }),
  ],
})
