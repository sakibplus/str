
import { createClient } from '@sanity/client';
import pLimit from 'p-limit';
import fs from 'fs/promises';
import path from 'path';

export async function seedData() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
  const token = process.env.SANITY_API_READ_WRITE_TOKEN;

  if (!projectId || !dataset || !apiVersion || !token) {
    const errorMsg = 'Sanity environment variables (projectId, dataset, apiVersion, token) must be defined.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const limit = pLimit(5);

  async function uploadImageFromUrl(url: string, altText?: string) {
    if (!url) return undefined;
    try {
      const response = await fetch(url);
      if (!response.ok) {
          console.warn(`Failed to fetch image from ${url}. Status: ${response.status}`);
          return undefined;
      }
      const imageBuffer = await response.arrayBuffer();
      const imageAsset = await client.assets.upload('image', new Uint8Array(imageBuffer), {
          filename: path.basename(new URL(url).pathname),
      });

      return {
          _type: 'image',
          asset: {
              _type: 'reference',
              _ref: imageAsset._id,
          },
          ...(altText && { alt: altText }),
      };
    } catch (error) {
      console.error(`Error uploading image from ${url}:`, error);
      return undefined;
    }
  }

  console.log('Starting data import...');

  const contentPath = path.join(process.cwd(), 'src', 'lib', 'content.json');
  const content = JSON.parse(await fs.readFile(contentPath, 'utf-8'));

  const transaction = client.transaction();

  if (content.navbar) {
    const image = await uploadImageFromUrl(content.navbar.logo_url);
    const doc = {
      _id: 'singleton-navbar',
      _type: 'navbar',
      button_text: content.navbar.button_text,
      ...(image && { logo: image }),
    };
    transaction.createOrReplace(doc);
  }

  if (content.navLinks) {
    content.navLinks.forEach((link: any, index: number) => {
      const doc = {
        _id: `navLink-${index + 1}`,
        _type: 'navLink',
        ...link
      };
      transaction.createOrReplace(doc);
    });
  }

  if (content.homePage?.hero) {
    const doc = {
      _id: 'singleton-hero',
      _type: 'hero',
      ...content.homePage.hero
    };
    transaction.createOrReplace(doc);
  }

  if (content.homePage?.aboutUsSection) {
      const { image: imageUrl, dataAiHint, ...rest } = content.homePage.aboutUsSection;
      const image = await uploadImageFromUrl(imageUrl, dataAiHint);
      const doc = {
          _id: 'singleton-aboutUsSection',
          _type: 'aboutUsSection',
          ...rest,
          ...(image && { image: image }),
      };
      transaction.createOrReplace(doc);
  }
  
  if (content.homePage?.whyChooseUs) {
      const features = await Promise.all(
          content.homePage.whyChooseUs.features.map(async (feature: any) => {
              const { image: imageUrl, dataAiHint, ...rest } = feature;
              const image = await uploadImageFromUrl(imageUrl, dataAiHint);
              return { ...rest, ...(image && { image: image }) };
          })
      );
      const doc = {
          _id: 'singleton-whyChooseUs',
          _type: 'whyChooseUs',
          title: content.homePage.whyChooseUs.title,
          subtitle: content.homePage.whyChooseUs.subtitle,
          features: features,
      };
      transaction.createOrReplace(doc);
  }

  if (content.courseCarousel) {
    const courseCarouselDocs = await Promise.all(
      content.courseCarousel.map(async (course: any) => {
        const { image: imageUrl, dataAiHint, ...rest } = course;
        const image = await uploadImageFromUrl(imageUrl, dataAiHint);
        return {
          _id: `courseCarousel-${course.id}`,
          _type: 'courseCarousel',
          ...rest,
          ...(image && { image }),
        };
      })
    );
    courseCarouselDocs.forEach(doc => transaction.createOrReplace(doc));
  }
  
  if (content.courses) {
      const courseDocs = await Promise.all(
          content.courses.map(async (course: any) => {
              const { image: imageUrl, dataAiHint, ...rest } = course;
              const image = await uploadImageFromUrl(imageUrl, dataAiHint);
              return {
                  _id: `course-${course.id}`,
                  _type: 'course',
                  ...rest,
                  ...(image && { image }),
              };
          })
      );
      courseDocs.forEach(doc => transaction.createOrReplace(doc));
  }

  if (content.detailedCourses) {
    content.detailedCourses.forEach((course: any) => {
        const doc = {
            _id: `detailedCourse-${course.id}`,
            _type: 'detailedCourse',
            ...course,
        };
        transaction.createOrReplace(doc);
    });
  }

  if (content.testimonials) {
      const testimonialDocs = await Promise.all(
          content.testimonials.map(async (testimonial: any) => {
              const { avatar: imageUrl, dataAiHint, ...rest } = testimonial;
              const image = await uploadImageFromUrl(imageUrl, dataAiHint);
              return {
                  _id: `testimonial-${testimonial.id}`,
                  _type: 'testimonial',
                  ...rest,
                  ...(image && { avatar: image }),
              };
          })
      );
      testimonialDocs.forEach(doc => transaction.createOrReplace(doc));
  }

  if (content.footer) {
      const { logo_url: logoUrl, ...rest } = content.footer;
      const image = await uploadImageFromUrl(logoUrl);
      const doc = {
          _id: 'singleton-footer',
          _type: 'footer',
          ...rest,
          ...(image && { logo: image }),
      };
      transaction.createOrReplace(doc);
  }

  if (content.blog?.pageData) {
      const doc = {
          _id: 'singleton-blogPage',
          _type: 'blogPage',
          ...content.blog.pageData
      };
      transaction.createOrReplace(doc);
  }
  
  if (content.blog?.posts) {
      const blogPostDocs = await Promise.all(
          content.blog.posts.map(async (post: any) => {
              const { image: imageUrl, dataAiHint, author_avatar: avatarUrl, ...rest } = post;
              const image = await uploadImageFromUrl(imageUrl, dataAiHint);
              const avatar = await uploadImageFromUrl(avatarUrl);
              return {
                  _id: `blogPost-${post.id}`,
                  _type: 'blogPost',
                  ...rest,
                  ...(image && { image }),
                  ...(avatar && { author_avatar: avatar }),
              };
          })
      );
      blogPostDocs.forEach(doc => transaction.createOrReplace(doc));
  }
  
  if (content.contactPage) {
      const { pageData, infoCards } = content.contactPage;
      const doc = {
          _id: 'singleton-contactPage',
          _type: 'contactPage',
          ...pageData,
          infoCards: infoCards,
      };
      transaction.createOrReplace(doc);
  }

  if (content.aboutPage) {
      const { story_image: imageUrl, ...rest } = content.aboutPage;
      const image = await uploadImageFromUrl(imageUrl, "team meeting");
      const doc = {
          _id: 'singleton-aboutPage',
          _type: 'aboutPage',
          ...rest,
          ...(image && { story_image: image }),
      };
      transaction.createOrReplace(doc);
  }

  try {
      const result = await transaction.commit();
      const message = `Import complete! ${result?.results.length || 0} documents were created/updated.`;
      console.log(message);
      return message;
  } catch (error) {
      console.error('Error committing transaction:', error);
      throw new Error('Failed to commit Sanity transaction');
  }
}
