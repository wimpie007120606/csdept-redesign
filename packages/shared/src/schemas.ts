import { z } from 'zod';

// Person
export const personSchema = z.object({
  id: z.number().int().positive().optional(),
  slug: z.string().min(1).max(200),
  full_name: z.string().min(1).max(300),
  title: z.string().max(200).optional(),
  role: z.string().max(200).optional(),
  division: z.string().max(300).optional(),
  email_primary: z.string().email().max(320).optional(),
  email_secondary: z.string().email().max(320).optional(),
  phone: z.string().max(50).optional(),
  office: z.string().max(200).optional(),
  bio: z.string().optional(),
  research_interests_json: z.string().optional(), // JSON array of strings
  qualifications: z.string().optional(),
  links_json: z.string().optional(), // JSON object/array
  image_key: z.string().max(500).optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export const personCreateSchema = personSchema.omit({ id: true, created_at: true, updated_at: true });
export const personUpdateSchema = personSchema.partial().omit({ id: true, created_at: true });

// Publication (for timeline / person profile)
export const publicationSchema = z.object({
  id: z.number().int().positive().optional(),
  person_id: z.number().int().positive(),
  year: z.number().int().min(1900).max(2100),
  citation: z.string(),
  venue: z.string().max(500).optional(),
  tags_json: z.string().optional(),
  url: z.string().url().max(2000).optional(),
  created_at: z.string().datetime().optional(),
});

export const publicationCreateSchema = publicationSchema.omit({ id: true, created_at: true });

// News
export const newsSchema = z.object({
  id: z.number().int().positive().optional(),
  slug: z.string().min(1).max(200),
  title: z.string().min(1).max(500),
  excerpt: z.string().optional(),
  body_md: z.string().optional(),
  cover_image_key: z.string().max(500).optional(),
  published_at: z.string().datetime().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export const newsCreateSchema = newsSchema.omit({ id: true, created_at: true, updated_at: true });
export const newsUpdateSchema = newsSchema.partial().omit({ id: true, created_at: true });

// Event
export const eventSchema = z.object({
  id: z.number().int().positive().optional(),
  slug: z.string().min(1).max(200),
  title: z.string().min(1).max(500),
  body_md: z.string().optional(),
  location: z.string().max(500).optional(),
  start_at: z.string().datetime(),
  end_at: z.string().datetime().optional(),
  cover_image_key: z.string().max(500).optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export const eventCreateSchema = eventSchema.omit({ id: true, created_at: true, updated_at: true });
export const eventUpdateSchema = eventSchema.partial().omit({ id: true, created_at: true });

// Programme
export const programmeSchema = z.object({
  id: z.number().int().positive().optional(),
  slug: z.string().min(1).max(200),
  name: z.string().min(1).max(300),
  focal_area: z.string().max(200).optional(),
  admission_requirements_md: z.string().optional(),
  continued_study_md: z.string().optional(),
  notes_md: z.string().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export const programmeYearSchema = z.object({
  id: z.number().int().positive().optional(),
  programme_id: z.number().int().positive(),
  year_number: z.number().int().min(1).max(10),
  min_credits: z.number().int().min(0).optional(),
  max_credits: z.number().int().min(0).optional(),
  notes_md: z.string().optional(),
});

export const programmeModuleSchema = z.object({
  id: z.number().int().positive().optional(),
  programme_year_id: z.number().int().positive(),
  group_name: z.string().max(200).optional(),
  module_code: z.string().max(50),
  module_name: z.string().max(300),
  credits: z.number().int().min(0),
  is_compulsory: z.boolean(),
  notes_md: z.string().optional(),
  sort_order: z.number().int().min(0).optional(),
});

export const programmeCreateSchema = programmeSchema.omit({ id: true, created_at: true, updated_at: true });
export const programmeUpdateSchema = programmeSchema.partial().omit({ id: true, created_at: true });

// Admin auth
export const loginSchema = z.object({
  username: z.string().min(1).max(100),
  password: z.string().min(1),
});

export const r2UploadUrlSchema = z.object({
  filename: z.string().min(1).max(255),
  contentType: z.string().max(100).optional(),
});
