import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'detailedCourse',
  title: 'Detailed Course Info',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Course ID',
      description: 'Must match an ID from the main Course list',
      type: 'number',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'discountedPrice',
      title: 'Discounted Price',
      type: 'string',
    }),
    defineField({
      name: 'promoCode',
      title: 'Promo Code',
      type: 'string',
    }),
    defineField({
      name: 'details',
      title: 'Course Details',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'heading', title: 'Heading', type: 'string'},
            {name: 'points', title: 'Points', type: 'array', of: [{type: 'string'}]},
          ],
        },
      ],
    }),
  ],
})
