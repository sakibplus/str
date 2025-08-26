import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Us Page',
  type: 'document',
  fields: [
    defineField({name: 'hero_title', title: 'Hero Title', type: 'string'}),
    defineField({name: 'hero_subtitle', title: 'Hero Subtitle', type: 'string'}),
    defineField({name: 'story_tagline', title: 'Story Tagline', type: 'string'}),
    defineField({name: 'story_heading', title: 'Story Heading', type: 'string'}),
    defineField({name: 'story_description_1', title: 'Story Description 1', type: 'text'}),
    defineField({name: 'story_description_2', title: 'Story Description 2', type: 'text'}),
    defineField({
      name: 'story_image',
      title: 'Story Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({name: 'vision_title', title: 'Vision Title', type: 'string'}),
    defineField({name: 'vision_description', title: 'Vision Description', type: 'text'}),
    defineField({name: 'mission_title', title: 'Mission Title', type: 'string'}),
    defineField({name: 'mission_description', title: 'Mission Description', type: 'text'}),
    defineField({name: 'stats_heading', title: 'Stats Heading', type: 'string'}),
    defineField({name: 'stats_subheading', title: 'Stats Subheading', type: 'string'}),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', type: 'string', title: 'Value'},
            {name: 'label', type: 'string', title: 'Label'},
          ],
        },
      ],
    }),
  ],
})
