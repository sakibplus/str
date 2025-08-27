
'use client'

import {useClient} from 'sanity'
import {Button, Card, Stack, Text, useToast} from '@sanity/ui'
import content from '@/lib/content.json'
import {useState} from 'react'
import pLimit from 'p-limit'
import path from 'path-browserify'

export default function SeedContent() {
  const client = useClient({apiVersion: '2024-07-01'})
  const {push: pushToast} = useToast()
  const [isSeeding, setIsSeeding] = useState(false)

  const handleSeed = async () => {
    setIsSeeding(true)
    try {
      const message = await seedDataInternal()
      pushToast({
        status: 'success',
        title: 'Success!',
        description: message,
      })
    } catch (error: any) {
      console.error('Seeding failed:', error)
      pushToast({
        status: 'error',
        title: 'Seeding Failed',
        description: error.message || 'An unknown error occurred.',
      })
    } finally {
      setIsSeeding(false)
    }
  }

  async function seedDataInternal() {
    const limit = pLimit(5)

    async function uploadImageFromUrl(url: string, altText?: string) {
      if (!url) return undefined
      try {
        const response = await fetch(url)
        if (!response.ok) {
          console.warn(`Failed to fetch image from ${url}. Status: ${response.status}`)
          return undefined
        }
        const imageBlob = await response.blob()
        const imageAsset = await client.assets.upload('image', imageBlob, {
          filename: path.basename(new URL(url).pathname),
        })

        return {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id,
          },
          ...(altText && {alt: altText}),
        }
      } catch (error) {
        console.error(`Error uploading image from ${url}:`, error)
        return undefined
      }
    }

    pushToast({status: 'info', title: 'Starting data import...'})

    const transaction = client.transaction()

    if (content.navbar) {
      const image = await uploadImageFromUrl(content.navbar.logo_url)
      const doc = {
        _id: 'singleton-navbar',
        _type: 'navbar',
        button_text: content.navbar.button_text,
        ...(image && {logo: image}),
      }
      transaction.createOrReplace(doc)
    }

    if (content.navLinks) {
      content.navLinks.forEach((link: any, index: number) => {
        const doc = {
          _id: `navLink-${index + 1}`,
          _type: 'navLink',
          ...link,
        }
        transaction.createOrReplace(doc)
      })
    }

    if (content.homePage?.hero) {
      const doc = {
        _id: 'singleton-hero',
        _type: 'hero',
        ...content.homePage.hero,
      }
      transaction.createOrReplace(doc)
    }

    if (content.homePage?.aboutUsSection) {
      const {image: imageUrl, dataAiHint, ...rest} = content.homePage.aboutUsSection
      const image = await uploadImageFromUrl(imageUrl, dataAiHint)
      const doc = {
        _id: 'singleton-aboutUsSection',
        _type: 'aboutUsSection',
        ...rest,
        ...(image && {image: image}),
      }
      transaction.createOrReplace(doc)
    }

    if (content.homePage?.whyChooseUs) {
      const features = await Promise.all(
        content.homePage.whyChooseUs.features.map(async (feature: any) => {
          const {image: imageUrl, dataAiHint, ...rest} = feature
          const image = await uploadImageFromUrl(imageUrl, dataAiHint)
          return {...rest, ...(image && {image: image})}
        })
      )
      const doc = {
        _id: 'singleton-whyChooseUs',
        _type: 'whyChooseUs',
        title: content.homePage.whyChooseUs.title,
        subtitle: content.homePage.whyChooseUs.subtitle,
        features: features,
      }
      transaction.createOrReplace(doc)
    }

    if (content.courseCarousel) {
      const courseCarouselDocs = await Promise.all(
        content.courseCarousel.map(async (course: any) => {
          const {image: imageUrl, dataAiHint, ...rest} = course
          const image = await uploadImageFromUrl(imageUrl, dataAiHint)
          return {
            _id: `courseCarousel-${course.id}`,
            _type: 'courseCarousel',
            ...rest,
            ...(image && {image}),
          }
        })
      )
      courseCarouselDocs.forEach((doc) => transaction.createOrReplace(doc))
    }

    if (content.courses) {
      const courseDocs = await Promise.all(
        content.courses.map(async (course: any) => {
          const {image: imageUrl, dataAiHint, ...rest} = course
          const image = await uploadImageFromUrl(imageUrl, dataAiHint)
          return {
            _id: `course-${course.id}`,
            _type: 'course',
            ...rest,
            ...(image && {image}),
          }
        })
      )
      courseDocs.forEach((doc) => transaction.createOrReplace(doc))
    }

    if (content.detailedCourses) {
      content.detailedCourses.forEach((course: any) => {
        const doc = {
          _id: `detailedCourse-${course.id}`,
          _type: 'detailedCourse',
          ...course,
        }
        transaction.createOrReplace(doc)
      })
    }

    if (content.testimonials) {
      const testimonialDocs = await Promise.all(
        content.testimonials.map(async (testimonial: any) => {
          const {avatar: imageUrl, dataAiHint, ...rest} = testimonial
          const image = await uploadImageFromUrl(imageUrl, dataAiHint)
          return {
            _id: `testimonial-${testimonial.id}`,
            _type: 'testimonial',
            ...rest,
            ...(image && {avatar: image}),
          }
        })
      )
      testimonialDocs.forEach((doc) => transaction.createOrReplace(doc))
    }

    if (content.footer) {
      const {logo_url: logoUrl, ...rest} = content.footer
      const image = await uploadImageFromUrl(logoUrl)
      const doc = {
        _id: 'singleton-footer',
        _type: 'footer',
        ...rest,
        ...(image && {logo: image}),
      }
      transaction.createOrReplace(doc)
    }

    if (content.blog?.pageData) {
      const doc = {
        _id: 'singleton-blogPage',
        _type: 'blogPage',
        ...content.blog.pageData,
      }
      transaction.createOrReplace(doc)
    }

    if (content.blog?.posts) {
      const blogPostDocs = await Promise.all(
        content.blog.posts.map(async (post: any) => {
          const {image: imageUrl, dataAiHint, author_avatar: avatarUrl, ...rest} = post
          const image = await uploadImageFromUrl(imageUrl, dataAiHint)
          const avatar = await uploadImageFromUrl(avatarUrl)
          return {
            _id: `blogPost-${post.id}`,
            _type: 'blogPost',
            ...rest,
            ...(image && {image}),
            ...(avatar && {author_avatar: avatar}),
          }
        })
      )
      blogPostDocs.forEach((doc) => transaction.createOrReplace(doc))
    }

    if (content.contactPage) {
      const {pageData, infoCards} = content.contactPage
      const doc = {
        _id: 'singleton-contactPage',
        _type: 'contactPage',
        ...pageData,
        infoCards: infoCards,
      }
      transaction.createOrReplace(doc)
    }

    if (content.aboutPage) {
      const {story_image: imageUrl, ...rest} = content.aboutPage
      const image = await uploadImageFromUrl(imageUrl, 'team meeting')
      const doc = {
        _id: 'singleton-aboutPage',
        _type: 'aboutPage',
        ...rest,
        ...(image && {story_image: image}),
      }
      transaction.createOrReplace(doc)
    }

    const result = await transaction.commit()
    const message = `Import complete! ${result?.results.length || 0} documents were created/updated.`
    console.log(message)
    return message
  }

  return (
    <Card padding={4} margin={4}>
      <Stack space={3}>
        <Text size={2} weight="bold">
          Initial Content Seeding
        </Text>
        <Text size={1}>
          Click the button below to import the initial content from `content.json` into your Sanity
          project. This will create or replace existing singleton documents and other content. This
          is useful for setting up a new environment or resetting to the default state.
        </Text>
        <Button
          text={isSeeding ? 'Seeding...' : 'Seed Initial Content'}
          onClick={handleSeed}
          loading={isSeeding}
          style={{cursor: isSeeding ? 'not-allowed' : 'pointer'}}
          disabled={isSeeding}
        />
      </Stack>
    </Card>
  )
}
