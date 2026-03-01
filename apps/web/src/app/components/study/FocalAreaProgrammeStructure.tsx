import { AlertTriangle } from 'lucide-react';
import type {
  FocalAreaProgramme,
  YearStructure,
  CompulsoryBlock,
  ElectiveBlock,
  ElectiveBlockWithOptions,
  ModuleRow,
  ProgrammeFootnote,
} from '@/content/bscComputerScienceProgramme';

function isElectiveWithOptions(e: ElectiveBlock | ElectiveBlockWithOptions): e is ElectiveBlockWithOptions {
  return 'options' in e && Array.isArray((e as ElectiveBlockWithOptions).options);
}

function yearLabel(year: 1 | 2 | 3): string {
  const ord = ['1st', '2nd', '3rd'];
  return `${ord[year - 1]} YEAR`;
}

function ModuleTable({
  modules,
  variant = 'light',
}: {
  modules: ModuleRow[];
  variant?: 'light' | 'maroon';
}) {
  const isMaroon = variant === 'maroon';
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className={isMaroon ? 'border-b border-white/20' : 'border-b border-border'}>
            <th className="py-2 pr-4 font-semibold">Module</th>
            <th className="py-2 font-semibold">Codes (credits)</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((row, i) => (
            <tr
              key={i}
              className={isMaroon ? 'border-b border-white/15 last:border-0' : 'border-b border-border last:border-0'}
            >
              <td className={`py-2 pr-4 ${isMaroon ? 'text-white' : 'text-foreground'}`}>
                {row.subject}
              </td>
              <td className={`py-2 font-mono text-sm ${isMaroon ? 'text-white/85' : 'text-muted-foreground'}`}>
                {row.codes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompulsorySection({
  block,
  isMaroonBg = true,
  rounded = 't',
}: {
  block: CompulsoryBlock;
  isMaroonBg?: boolean;
  /** 't' = top only (elective below), 'full' = all corners */
  rounded?: 't' | 'full';
}) {
  const roundedClass = rounded === 'full' ? 'rounded-lg' : 'rounded-t-lg';
  return (
    <div
      className={
        isMaroonBg
          ? `bg-[#7B1E3A] text-white p-6 ${roundedClass}`
          : `bg-card border border-border p-6 ${roundedClass}`
      }
    >
      <h4 className="font-[\'Spectral\'] text-xl font-semibold mb-3">
        Compulsory Modules (credits = {block.credits})
      </h4>
      <ModuleTable modules={block.modules} variant={isMaroonBg ? 'maroon' : 'light'} />
    </div>
  );
}

function ElectiveSectionSimple({
  elective,
  hasCompulsoryAbove,
}: {
  elective: ElectiveBlock;
  hasCompulsoryAbove: boolean;
}) {
  const rounded = hasCompulsoryAbove ? 'rounded-b-lg' : 'rounded-lg';
  return (
    <div className={`bg-card border border-border p-6 ${rounded}`}>
      <h4 className="font-[\'Spectral\'] text-xl font-semibold text-foreground mb-3">
        Elective Modules (credits = min {elective.minCredits}, max {elective.maxCredits})
      </h4>
      {elective.rule && (
        <p className="text-foreground/80 mb-3">{elective.rule}</p>
      )}
      {elective.chooseOneOf && elective.chooseOneOf.length > 0 && (
        <>
          <ul className="space-y-1 mb-4 text-foreground/80">
            {elective.chooseOneOf.map((row, i) => (
              <li key={i}>• {row.subject}: {row.codes}</li>
            ))}
          </ul>
          {elective.thenText && <p className="text-foreground/80 mb-3">{elective.thenText}</p>}
        </>
      )}
      {!elective.chooseOneOf?.length && elective.thenText && (
        <p className="text-foreground/80 mb-3">{elective.thenText}</p>
      )}
      <ModuleTable modules={elective.modules} />
      {elective.note && (
        <p className="mt-3 text-sm text-foreground/80 italic">{elective.note}</p>
      )}
      {elective.blockNote && (
        <div className="mt-3 p-3 bg-amber-50 maroon:bg-amber-950/20 border-l-4 border-amber-600 text-sm">
          <p className="text-foreground/80 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden />
            {elective.blockNote}
          </p>
        </div>
      )}
    </div>
  );
}

function ElectiveSectionWithOptions({
  elective,
  hasCompulsoryAbove,
}: {
  elective: ElectiveBlockWithOptions;
  hasCompulsoryAbove: boolean;
}) {
  const rounded = hasCompulsoryAbove ? 'rounded-b-lg' : 'rounded-lg';
  return (
    <div className={`bg-card border border-border p-6 ${rounded}`}>
      <h4 className="font-[\'Spectral\'] text-xl font-semibold text-foreground mb-3">
        Elective Modules (credits = min {elective.minCredits}, max {elective.maxCredits})
      </h4>
      {elective.intro && (
        <p className="text-foreground/80 mb-4">{elective.intro}</p>
      )}
      <div className="space-y-4">
        {elective.options.map((opt, i) => (
          <div
            key={i}
            className="bg-muted/30 border-2 border-[#7B1E3A]/30 p-6 rounded-lg"
          >
            <h5 className="font-[\'Spectral\'] text-xl font-bold text-[#7B1E3A] mb-3">
              {opt.optionLabel}
            </h5>
            <ModuleTable modules={opt.modules} />
            {opt.note && (
              <p className="mt-2 text-sm text-foreground/80">{opt.note}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function YearBlock({ yearStruct }: { yearStruct: YearStructure }) {
  const { year, minCredits, maxCredits, compulsory, elective } = yearStruct;
  const creditRange =
    minCredits === maxCredits
      ? `${minCredits}`
      : `min ${minCredits}, max ${maxCredits}`;

  return (
    <div className="space-y-6">
      <h3 className="font-[\'Spectral\'] text-3xl font-bold text-foreground">
        {yearLabel(year)}{' '}
        <span className="text-xl text-muted-foreground">
          ({minCredits === maxCredits ? `${minCredits} credits` : `minimum ${minCredits}, maximum ${maxCredits} credits`})
        </span>
      </h3>

      <div className={elective ? '' : 'rounded-lg overflow-hidden'}>
        <CompulsorySection
          block={compulsory}
          isMaroonBg={true}
          rounded={elective ? 't' : 'full'}
        />
        {elective && (
          isElectiveWithOptions(elective) ? (
            <ElectiveSectionWithOptions
              elective={elective}
              hasCompulsoryAbove={true}
            />
          ) : (
            <ElectiveSectionSimple elective={elective} hasCompulsoryAbove={true} />
          )
        )}
      </div>
    </div>
  );
}

function FootnoteList({ footnotes }: { footnotes: ProgrammeFootnote[] }) {
  return (
    <div className="mt-4 p-4 bg-muted/30 border-l-4 border-[#C8A951] text-sm">
      {footnotes.map((fn) => (
        <p key={fn.id} className="text-foreground/90 mb-1">
          <span className="font-semibold">{fn.marker}</span> {fn.text}
        </p>
      ))}
    </div>
  );
}

export function FocalAreaProgrammeStructure({ data }: { data: FocalAreaProgramme }) {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-['Spectral'] text-4xl font-bold text-foreground mb-4">
          {data.yearbookRef} Focal Area: {data.title}
        </h2>
        {data.topNote && (
          <div className="p-4 bg-amber-50 maroon:bg-amber-950/20 border-l-4 border-amber-600 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden />
            <div className="text-sm text-foreground/80">
              <p className="font-semibold mb-1">Note:</p>
              <p>{data.topNote}</p>
            </div>
          </div>
        )}
      </div>

      {data.admissionRequirements && data.admissionRequirements.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-['Spectral'] text-2xl font-semibold text-foreground border-b-2 border-[#7B1E3A] pb-2">
            Specific Admission Requirements
          </h3>
          <ul className="space-y-2 text-foreground/80 leading-relaxed">
            {data.admissionRequirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0" aria-hidden />
                <span>{req.text}</span>
              </li>
            ))}
          </ul>
          {data.admissionRequirementOr && (
            <>
              <p className="text-foreground/80 pl-6">OR</p>
              <ul className="space-y-2 text-foreground/80 leading-relaxed pl-6">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0" aria-hidden />
                  <span>{data.admissionRequirementOr}</span>
                </li>
              </ul>
            </>
          )}
        </div>
      )}

      {data.continuedStudy && (
        <div className="space-y-4">
          <h3 className="font-['Spectral'] text-2xl font-semibold text-foreground border-b-2 border-[#7B1E3A] pb-2">
            Continued Study Possibilities
          </h3>
          {data.continuedStudy.intro && (
            <p className="text-foreground/80 leading-relaxed">
              {data.continuedStudy.intro}
            </p>
          )}
          {data.continuedStudy.programmes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {data.continuedStudy.programmes.map((prog) => (
                <div key={prog} className="flex items-center gap-2 text-foreground/80">
                  <span className="w-1.5 h-1.5 bg-[#7B1E3A] rounded-full" aria-hidden />
                  <span>{prog}</span>
                </div>
              ))}
            </div>
          )}
          {data.continuedStudy.note && (
            <div className="mt-4 p-4 bg-amber-50 maroon:bg-amber-950/20 border-l-4 border-amber-600 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden />
              <div className="text-sm text-foreground/80">
                <p className="font-semibold mb-1">Note:</p>
                <p>{data.continuedStudy.note}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {data.years.map((y) => (
        <YearBlock key={y.year} yearStruct={y} />
      ))}

      {data.footnotes && data.footnotes.length > 0 && (
        <FootnoteList footnotes={data.footnotes} />
      )}

      <p className="text-sm text-muted-foreground italic">
        Last verified: Yearbook 2026. For detailed and updated information, consult the official Faculty of Science Yearbook.
      </p>
    </div>
  );
}
