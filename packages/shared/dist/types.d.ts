import type { z } from 'zod';
import type { personSchema, publicationSchema, newsSchema, eventSchema, programmeSchema, programmeYearSchema, programmeModuleSchema } from './schemas.js';
export type Person = z.infer<typeof personSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type News = z.infer<typeof newsSchema>;
export type Event = z.infer<typeof eventSchema>;
export type Programme = z.infer<typeof programmeSchema>;
export type ProgrammeYear = z.infer<typeof programmeYearSchema>;
export type ProgrammeModule = z.infer<typeof programmeModuleSchema>;
export interface PersonWithPublications extends Person {
    publications?: Publication[];
    publications_by_year?: {
        year: number;
        publications: Publication[];
    }[];
}
export interface ProgrammeWithYears extends Programme {
    years?: (ProgrammeYear & {
        modules?: ProgrammeModule[];
    })[];
}
//# sourceMappingURL=types.d.ts.map