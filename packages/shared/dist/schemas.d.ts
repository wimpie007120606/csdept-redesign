import { z } from 'zod';
export declare const personSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    slug: z.ZodString;
    full_name: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    division: z.ZodOptional<z.ZodString>;
    email_primary: z.ZodOptional<z.ZodString>;
    email_secondary: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    office: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    research_interests_json: z.ZodOptional<z.ZodString>;
    qualifications: z.ZodOptional<z.ZodString>;
    links_json: z.ZodOptional<z.ZodString>;
    image_key: z.ZodOptional<z.ZodString>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    full_name: string;
    id?: number | undefined;
    title?: string | undefined;
    role?: string | undefined;
    division?: string | undefined;
    email_primary?: string | undefined;
    email_secondary?: string | undefined;
    phone?: string | undefined;
    office?: string | undefined;
    bio?: string | undefined;
    research_interests_json?: string | undefined;
    qualifications?: string | undefined;
    links_json?: string | undefined;
    image_key?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
}, {
    slug: string;
    full_name: string;
    id?: number | undefined;
    title?: string | undefined;
    role?: string | undefined;
    division?: string | undefined;
    email_primary?: string | undefined;
    email_secondary?: string | undefined;
    phone?: string | undefined;
    office?: string | undefined;
    bio?: string | undefined;
    research_interests_json?: string | undefined;
    qualifications?: string | undefined;
    links_json?: string | undefined;
    image_key?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
}>;
export declare const personCreateSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodNumber>;
    slug: z.ZodString;
    full_name: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    division: z.ZodOptional<z.ZodString>;
    email_primary: z.ZodOptional<z.ZodString>;
    email_secondary: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    office: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    research_interests_json: z.ZodOptional<z.ZodString>;
    qualifications: z.ZodOptional<z.ZodString>;
    links_json: z.ZodOptional<z.ZodString>;
    image_key: z.ZodOptional<z.ZodString>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
    slug: string;
    full_name: string;
    title?: string | undefined;
    role?: string | undefined;
    division?: string | undefined;
    email_primary?: string | undefined;
    email_secondary?: string | undefined;
    phone?: string | undefined;
    office?: string | undefined;
    bio?: string | undefined;
    research_interests_json?: string | undefined;
    qualifications?: string | undefined;
    links_json?: string | undefined;
    image_key?: string | undefined;
}, {
    slug: string;
    full_name: string;
    title?: string | undefined;
    role?: string | undefined;
    division?: string | undefined;
    email_primary?: string | undefined;
    email_secondary?: string | undefined;
    phone?: string | undefined;
    office?: string | undefined;
    bio?: string | undefined;
    research_interests_json?: string | undefined;
    qualifications?: string | undefined;
    links_json?: string | undefined;
    image_key?: string | undefined;
}>;
export declare const personUpdateSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    slug: z.ZodOptional<z.ZodString>;
    full_name: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    role: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    division: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    email_primary: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    email_secondary: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    office: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    bio: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    research_interests_json: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    qualifications: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    links_json: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    image_key: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    created_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    updated_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "id" | "created_at">, "strip", z.ZodTypeAny, {
    slug?: string | undefined;
    full_name?: string | undefined;
    title?: string | undefined;
    role?: string | undefined;
    division?: string | undefined;
    email_primary?: string | undefined;
    email_secondary?: string | undefined;
    phone?: string | undefined;
    office?: string | undefined;
    bio?: string | undefined;
    research_interests_json?: string | undefined;
    qualifications?: string | undefined;
    links_json?: string | undefined;
    image_key?: string | undefined;
    updated_at?: string | undefined;
}, {
    slug?: string | undefined;
    full_name?: string | undefined;
    title?: string | undefined;
    role?: string | undefined;
    division?: string | undefined;
    email_primary?: string | undefined;
    email_secondary?: string | undefined;
    phone?: string | undefined;
    office?: string | undefined;
    bio?: string | undefined;
    research_interests_json?: string | undefined;
    qualifications?: string | undefined;
    links_json?: string | undefined;
    image_key?: string | undefined;
    updated_at?: string | undefined;
}>;
export declare const publicationSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    person_id: z.ZodNumber;
    year: z.ZodNumber;
    citation: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
    tags_json: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    created_at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    person_id: number;
    year: number;
    citation: string;
    id?: number | undefined;
    created_at?: string | undefined;
    venue?: string | undefined;
    tags_json?: string | undefined;
    url?: string | undefined;
}, {
    person_id: number;
    year: number;
    citation: string;
    id?: number | undefined;
    created_at?: string | undefined;
    venue?: string | undefined;
    tags_json?: string | undefined;
    url?: string | undefined;
}>;
export declare const publicationCreateSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodNumber>;
    person_id: z.ZodNumber;
    year: z.ZodNumber;
    citation: z.ZodString;
    venue: z.ZodOptional<z.ZodString>;
    tags_json: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    created_at: z.ZodOptional<z.ZodString>;
}, "id" | "created_at">, "strip", z.ZodTypeAny, {
    person_id: number;
    year: number;
    citation: string;
    venue?: string | undefined;
    tags_json?: string | undefined;
    url?: string | undefined;
}, {
    person_id: number;
    year: number;
    citation: string;
    venue?: string | undefined;
    tags_json?: string | undefined;
    url?: string | undefined;
}>;
export declare const newsSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    slug: z.ZodString;
    title: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
    body_md: z.ZodOptional<z.ZodString>;
    cover_image_key: z.ZodOptional<z.ZodString>;
    published_at: z.ZodOptional<z.ZodString>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    title: string;
    id?: number | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    excerpt?: string | undefined;
    body_md?: string | undefined;
    cover_image_key?: string | undefined;
    published_at?: string | undefined;
}, {
    slug: string;
    title: string;
    id?: number | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    excerpt?: string | undefined;
    body_md?: string | undefined;
    cover_image_key?: string | undefined;
    published_at?: string | undefined;
}>;
export declare const newsCreateSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodNumber>;
    slug: z.ZodString;
    title: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
    body_md: z.ZodOptional<z.ZodString>;
    cover_image_key: z.ZodOptional<z.ZodString>;
    published_at: z.ZodOptional<z.ZodString>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
    slug: string;
    title: string;
    excerpt?: string | undefined;
    body_md?: string | undefined;
    cover_image_key?: string | undefined;
    published_at?: string | undefined;
}, {
    slug: string;
    title: string;
    excerpt?: string | undefined;
    body_md?: string | undefined;
    cover_image_key?: string | undefined;
    published_at?: string | undefined;
}>;
export declare const newsUpdateSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    slug: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    body_md: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    cover_image_key: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    published_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    created_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    updated_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "id" | "created_at">, "strip", z.ZodTypeAny, {
    slug?: string | undefined;
    title?: string | undefined;
    updated_at?: string | undefined;
    excerpt?: string | undefined;
    body_md?: string | undefined;
    cover_image_key?: string | undefined;
    published_at?: string | undefined;
}, {
    slug?: string | undefined;
    title?: string | undefined;
    updated_at?: string | undefined;
    excerpt?: string | undefined;
    body_md?: string | undefined;
    cover_image_key?: string | undefined;
    published_at?: string | undefined;
}>;
export declare const eventSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    slug: z.ZodString;
    title: z.ZodString;
    body_md: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    start_at: z.ZodString;
    end_at: z.ZodOptional<z.ZodString>;
    cover_image_key: z.ZodOptional<z.ZodString>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    title: string;
    start_at: string;
    id?: number | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    body_md?: string | undefined;
    cover_image_key?: string | undefined;
    location?: string | undefined;
    end_at?: string | undefined;
}, {
    slug: string;
    title: string;
    start_at: string;
    id?: number | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    body_md?: string | undefined;
    cover_image_key?: string | undefined;
    location?: string | undefined;
    end_at?: string | undefined;
}>;
export declare const eventCreateSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodNumber>;
    slug: z.ZodString;
    title: z.ZodString;
    body_md: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    start_at: z.ZodString;
    end_at: z.ZodOptional<z.ZodString>;
    cover_image_key: z.ZodOptional<z.ZodString>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
    slug: string;
    title: string;
    start_at: string;
    body_md?: string | undefined;
    cover_image_key?: string | undefined;
    location?: string | undefined;
    end_at?: string | undefined;
}, {
    slug: string;
    title: string;
    start_at: string;
    body_md?: string | undefined;
    cover_image_key?: string | undefined;
    location?: string | undefined;
    end_at?: string | undefined;
}>;
export declare const eventUpdateSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    slug: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    body_md: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    location: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    start_at: z.ZodOptional<z.ZodString>;
    end_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    cover_image_key: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    created_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    updated_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "id" | "created_at">, "strip", z.ZodTypeAny, {
    slug?: string | undefined;
    title?: string | undefined;
    updated_at?: string | undefined;
    body_md?: string | undefined;
    cover_image_key?: string | undefined;
    location?: string | undefined;
    start_at?: string | undefined;
    end_at?: string | undefined;
}, {
    slug?: string | undefined;
    title?: string | undefined;
    updated_at?: string | undefined;
    body_md?: string | undefined;
    cover_image_key?: string | undefined;
    location?: string | undefined;
    start_at?: string | undefined;
    end_at?: string | undefined;
}>;
export declare const programmeSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    slug: z.ZodString;
    name: z.ZodString;
    focal_area: z.ZodOptional<z.ZodString>;
    admission_requirements_md: z.ZodOptional<z.ZodString>;
    continued_study_md: z.ZodOptional<z.ZodString>;
    notes_md: z.ZodOptional<z.ZodString>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    slug: string;
    name: string;
    id?: number | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    focal_area?: string | undefined;
    admission_requirements_md?: string | undefined;
    continued_study_md?: string | undefined;
    notes_md?: string | undefined;
}, {
    slug: string;
    name: string;
    id?: number | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    focal_area?: string | undefined;
    admission_requirements_md?: string | undefined;
    continued_study_md?: string | undefined;
    notes_md?: string | undefined;
}>;
export declare const programmeYearSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    programme_id: z.ZodNumber;
    year_number: z.ZodNumber;
    min_credits: z.ZodOptional<z.ZodNumber>;
    max_credits: z.ZodOptional<z.ZodNumber>;
    notes_md: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    programme_id: number;
    year_number: number;
    id?: number | undefined;
    notes_md?: string | undefined;
    min_credits?: number | undefined;
    max_credits?: number | undefined;
}, {
    programme_id: number;
    year_number: number;
    id?: number | undefined;
    notes_md?: string | undefined;
    min_credits?: number | undefined;
    max_credits?: number | undefined;
}>;
export declare const programmeModuleSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    programme_year_id: z.ZodNumber;
    group_name: z.ZodOptional<z.ZodString>;
    module_code: z.ZodString;
    module_name: z.ZodString;
    credits: z.ZodNumber;
    is_compulsory: z.ZodBoolean;
    notes_md: z.ZodOptional<z.ZodString>;
    sort_order: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    programme_year_id: number;
    module_code: string;
    module_name: string;
    credits: number;
    is_compulsory: boolean;
    id?: number | undefined;
    notes_md?: string | undefined;
    group_name?: string | undefined;
    sort_order?: number | undefined;
}, {
    programme_year_id: number;
    module_code: string;
    module_name: string;
    credits: number;
    is_compulsory: boolean;
    id?: number | undefined;
    notes_md?: string | undefined;
    group_name?: string | undefined;
    sort_order?: number | undefined;
}>;
export declare const programmeCreateSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodNumber>;
    slug: z.ZodString;
    name: z.ZodString;
    focal_area: z.ZodOptional<z.ZodString>;
    admission_requirements_md: z.ZodOptional<z.ZodString>;
    continued_study_md: z.ZodOptional<z.ZodString>;
    notes_md: z.ZodOptional<z.ZodString>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
    slug: string;
    name: string;
    focal_area?: string | undefined;
    admission_requirements_md?: string | undefined;
    continued_study_md?: string | undefined;
    notes_md?: string | undefined;
}, {
    slug: string;
    name: string;
    focal_area?: string | undefined;
    admission_requirements_md?: string | undefined;
    continued_study_md?: string | undefined;
    notes_md?: string | undefined;
}>;
export declare const programmeUpdateSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    slug: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    focal_area: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    admission_requirements_md: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    continued_study_md: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    notes_md: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    created_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    updated_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "id" | "created_at">, "strip", z.ZodTypeAny, {
    slug?: string | undefined;
    updated_at?: string | undefined;
    name?: string | undefined;
    focal_area?: string | undefined;
    admission_requirements_md?: string | undefined;
    continued_study_md?: string | undefined;
    notes_md?: string | undefined;
}, {
    slug?: string | undefined;
    updated_at?: string | undefined;
    name?: string | undefined;
    focal_area?: string | undefined;
    admission_requirements_md?: string | undefined;
    continued_study_md?: string | undefined;
    notes_md?: string | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const r2UploadUrlSchema: z.ZodObject<{
    filename: z.ZodString;
    contentType: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    filename: string;
    contentType?: string | undefined;
}, {
    filename: string;
    contentType?: string | undefined;
}>;
//# sourceMappingURL=schemas.d.ts.map