import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navLink',
  title: 'Nav Link',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'href',
      title: 'Href',
      type: 'string',
    }),
  ],
})
