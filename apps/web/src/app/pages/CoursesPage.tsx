import { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from '@/i18n/useTranslation';
import { getBscProgramme } from '@/content/bscComputerScienceProgramme';
import type { FocalAreaId } from '@/content/bscComputerScienceProgramme';
import { FocalAreaProgrammeStructure } from '@/app/components/study/FocalAreaProgrammeStructure';

const campusBackground = '/realbackground3.jpeg';

export function CoursesPage() {
  const { t } = useTranslation();
  const [selectedFocalArea, setSelectedFocalArea] = useState<FocalAreaId>('general');
  const programmeData = getBscProgramme(selectedFocalArea);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 text-white overflow-hidden min-h-[500px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${campusBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1C2D]/90 via-[#0B1C2D]/85 to-[#0B1C2D]/80" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <span className="text-[#C8A951] text-xs uppercase tracking-[0.2em] font-medium font-['Spectral']">
                    {t('courses.heroLabel')}
                  </span>
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8A951]/40 to-transparent max-w-[200px]"></div>
                </div>
              </div>

              <h1 className="font-['Spectral'] text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] tracking-tight">
                {t('courses.heroTitle')}
              </h1>

              <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed font-light">
                {t('courses.heroSub')}
              </p>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Focal Area Selection */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-['Spectral'] text-2xl font-bold text-foreground mb-6">
              This programme consists of three focal areas:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setSelectedFocalArea('general')}
                className={`p-6 text-left border-2 transition-all ${
                  selectedFocalArea === 'general'
                    ? 'bg-[#7B1E3A] border-[#7B1E3A] text-white'
                    : 'bg-card border-border text-foreground hover:border-[#7B1E3A]/50'
                }`}
              >
                <h3 className="font-['Spectral'] text-xl font-bold mb-2">
                  General Computer Science
                </h3>
                <p className={`text-sm ${selectedFocalArea === 'general' ? 'text-white/70' : 'text-muted-foreground'}`}>
                  Broadest curriculum with diverse electives
                </p>
              </button>
              <button
                onClick={() => setSelectedFocalArea('systems')}
                className={`p-6 text-left border-2 transition-all ${
                  selectedFocalArea === 'systems'
                    ? 'bg-[#7B1E3A] border-[#7B1E3A] text-white'
                    : 'bg-card border-border text-foreground hover:border-[#7B1E3A]/50'
                }`}
              >
                <h3 className="font-['Spectral'] text-xl font-bold mb-2">
                  Computer Systems
                </h3>
                <p className={`text-sm ${selectedFocalArea === 'systems' ? 'text-white/70' : 'text-muted-foreground'}`}>
                  Focus on hardware and systems engineering
                </p>
              </button>
              <button
                onClick={() => setSelectedFocalArea('data')}
                className={`p-6 text-left border-2 transition-all ${
                  selectedFocalArea === 'data'
                    ? 'bg-[#7B1E3A] border-[#7B1E3A] text-white'
                    : 'bg-card border-border text-foreground hover:border-[#7B1E3A]/50'
                }`}
              >
                <h3 className="font-['Spectral'] text-xl font-bold mb-2">
                  Data Science
                </h3>
                <p className={`text-sm ${selectedFocalArea === 'data' ? 'text-white/70' : 'text-muted-foreground'}`}>
                  Specialized in data analysis and statistics
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Focal Area Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <FocalAreaProgrammeStructure data={programmeData} />
        </div>
      </section>
    </div>
  );
}