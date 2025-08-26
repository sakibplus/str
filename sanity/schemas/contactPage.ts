import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'hero_title',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'hero_subtitle',
      title: 'Hero Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'info_title',
      title: 'Info Title',
      type: 'string',
    }),
    defineField({
      name: 'info_subtitle',
      title: 'Info Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'map_url',
      title: 'Google Map Embed URL',
      type: 'url',
    }),
    defineField({
      name: 'form_title',
      title: 'Form Title',
      type: 'string',
    }),
    defineField({
      name: 'form_subtitle',
      title: 'Form Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'infoCards',
      title: 'Info Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'icon', title: 'Icon (Mail, Phone, MapPin)', type: 'string'},
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'value', title: 'Value', type: 'string'},
            {name: 'link', title: 'Link (optional)', type: 'string'},
          ],
        },
      ],
    }),
  ],
})
