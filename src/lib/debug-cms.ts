// @ts-nocheck
'use server';

// This file is for debugging purposes only.
// It checks which environment variables for Google Sheets are available.

import {
  GOOGLE_SHEET_NAVLINKS_URL,
  GOOGLE_SHEET_HERO_URL,
  GOOGLE_SHEET_COURSE_CAROUSEL_URL,
  GOOGLE_SHEET_COURSES_URL,
  GOOGLE_SHEET_ABOUT_US_URL,
  GOOGLE_SHEET_ABOUT_US_STATS_URL,
  GOOGLE_SHEET_TESTIMONIALS_URL,
  GOOGLE_SHEET_WHY_CHOOSE_US_URL,
  GOOGLE_SHEET_WHY_CHOOSE_US_FEATURES_URL,
  GOOGLE_SHEET_FOOTER_URL,
  GOOGLE_SHEET_FOOTER_LINKS_URL,
  GOOGLE_SHEET_FOOTER_CONTACT_URL,
} from './env';

export type DebugInfo = {
  key: string;
  isSet: boolean;
  value: string;
};

export async function getDebugInfo(): Promise<DebugInfo[]> {
  const variables = [
    { key: 'GOOGLE_SHEET_NAVLINKS_URL', value: GOOGLE_SHEET_NAVLINKS_URL },
    { key: 'GOOGLE_SHEET_HERO_URL', value: GOOGLE_SHEET_HERO_URL },
    { key: 'GOOGLE_SHEET_COURSE_CAROUSEL_URL', value: GOOGLE_SHEET_COURSE_CAROUSEL_URL },
    { key: 'GOOGLE_SHEET_COURSES_URL', value: GOOGLE_SHEET_COURSES_URL },
    { key: 'GOOGLE_SHEET_ABOUT_US_URL', value: GOOGLE_SHEET_ABOUT_US_URL },
    { key: 'GOOGLE_SHEET_ABOUT_US_STATS_URL', value: GOOGLE_SHEET_ABOUT_US_STATS_URL },
    { key: 'GOOGLE_SHEET_TESTIMONIALS_URL', value: GOOGLE_SHEET_TESTIMONIALS_URL },
    { key: 'GOOGLE_SHEET_WHY_CHOOSE_US_URL', value: GOOGLE_SHEET_WHY_CHOOSE_US_URL },
    { key: 'GOOGLE_SHEET_WHY_CHOOSE_US_FEATURES_URL', value: GOOGLE_SHEET_WHY_CHOOSE_US_FEATURES_URL },
    { key: 'GOOGLE_SHEET_FOOTER_URL', value: GOOGLE_SHEET_FOOTER_URL },
    { key: 'GOOGLE_SHEET_FOOTER_LINKS_URL', value: GOOGLE_SHEET_FOOTER_LINKS_URL },
    { key: 'GOOGLE_SHEET_FOOTER_CONTACT_URL', value: GOOGLE_SHEET_FOOTER_CONTACT_URL },
  ];

  return variables.map(({ key, value }) => ({
    key: key,
    isSet: !!value,
    value: value ? `${value.substring(0, 50)}...` : 'Not Set',
  }));
}
