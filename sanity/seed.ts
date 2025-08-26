
import { createClient } from '@sanity/client';
import pLimit from 'p-limit';
import fs from 'fs/promises';
import path from 'path';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;
const token = process.env.SANITY_API_READ_WRITE_TOKEN;

if (!projectId || !dataset || !apiVersion || !token) {
  console.error(
    'Sanity environment variables (projectId, dataset, apiVersion, token) must be defined.'
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const limit = pLimit(5); // Limit concurrency to 5 concurrent uploads

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

async function createDocument(doc: any) {
  try {
    await client.create(doc, {
      overwrite: true,
    });
    console.log(`Created/updated document: ${doc._id}`);
  } catch (error) {
    console.error(`Error creating document ${doc._id}:`, error);
  }
}

async function main() {
  console.log('Starting data import...');

  const contentPath = path.join(process.cwd(), 'src', 'lib', 'content.json');
  const content = JSON.parse(await fs.readFile(contentPath, 'utf-8'));

  const transaction = client.transaction();

  // 1. Navbar
  if (content.navbar) {
    const image = await uploadImageFromUrl(content.navbar.logo_url);
    const doc = {
      _id: 'singleton-navbar',
      _type: 'navbar',
      button_text: content.navbar.button_text,
      ...(image && { logo: image }),
    };
    transaction.createOrReplace(doc);
    console.log(`Added navbar to transaction`);
  }

  // 2. NavLinks
  if (content.navLinks) {
    content.navLinks.forEach((link: any, index: number) => {
      const doc = {
        _id: `navLink-${index + 1}`,
        _type: 'navLink',
        ...link
      };
      transaction.createOrReplace(doc);
    });
    console.log(`Added ${content.navLinks.length} navLinks to transaction`);
  }

  // 3. Hero Section
  if (content.homePage?.hero) {
    const doc = {
      _id: 'singleton-hero',
      _type: 'hero',
      ...content.homePage.hero
    };
    transaction.createOrReplace(doc);
    console.log(`Added hero section to transaction`);
  }

  // 4. About Us Section (Home Page)
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
      console.log(`Added about us section to transaction`);
  }
  
  // 5. Why Choose Us
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
      console.log(`Added why choose us section to transaction`);
  }

  // 6. Course Carousel
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
    console.log(`Added ${courseCarouselDocs.length} course carousel items to transaction`);
  }
  
  // 7. Courses
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
      console.log(`Added ${courseDocs.length} courses to transaction`);
  }

  // 8. Detailed Courses
  if (content.detailedCourses) {
    content.detailedCourses.forEach((course: any) => {
        const doc = {
            _id: `detailedCourse-${course.id}`,
            _type: 'detailedCourse',
            ...course,
        };
        transaction.createOrReplace(doc);
    });
    console.log(`Added ${content.detailedCourses.length} detailed courses to transaction`);
  }

  // 9. Testimonials
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
      console.log(`Added ${testimonialDocs.length} testimonials to transaction`);
  }

  // 10. Footer
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
      console.log(`Added footer to transaction`);
  }

  // 11. Blog Page Data
  if (content.blog?.pageData) {
      const doc = {
          _id: 'singleton-blogPage',
          _type: 'blogPage',
          ...content.blog.pageData
      };
      transaction.createOrReplace(doc);
      console.log(`Added blog page data to transaction`);
  }
  
  // 12. Blog Posts
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
      console.log(`Added ${blogPostDocs.length} blog posts to transaction`);
  }
  
  // 13. Contact Page
  if (content.contactPage) {
      const { pageData, infoCards } = content.contactPage;
      const doc = {
          _id: 'singleton-contactPage',
          _type: 'contactPage',
          ...pageData,
          infoCards: infoCards,
      };
      transaction.createOrReplace(doc);
      console.log(`Added contact page to transaction`);
  }

  // 14. About Page
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
      console.log(`Added about page to transaction`);
  }

  try {
      const result = await transaction.commit();
      console.log('------------------------------------------');
      console.log(`Import complete! ${result?.results.length || 0} documents were created/updated.`);
      console.log('Please visit your Sanity Studio to see the content.');
      console.log('------------------------------------------');
  } catch (error) {
      console.error('Error committing transaction:', error);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
