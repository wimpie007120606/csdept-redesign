import { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

const campusBackground = '/realbackground3.jpeg';

export function CoursesPage() {
  const { t } = useTranslation();
  const [selectedFocalArea, setSelectedFocalArea] = useState<'general' | 'systems' | 'data'>('general');

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
          {selectedFocalArea === 'general' && <GeneralComputerScience />}
          {selectedFocalArea === 'systems' && <ComputerSystems />}
          {selectedFocalArea === 'data' && <DataScience />}

          {/* Footer Note */}
          <div className="mt-16 p-6 bg-muted/30 border-l-4 border-[#7B1E3A]">
            <p className="text-sm text-muted-foreground italic">
              For detailed and updated information, consult the official Faculty of Science Yearbook.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// General Computer Science Component
function GeneralComputerScience() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-['Spectral'] text-4xl font-bold text-foreground mb-8">
          7.4.1 Focal Area: General Computer Science
        </h2>
      </div>

      {/* Admission Requirements */}
      <div className="space-y-4">
        <h3 className="font-['Spectral'] text-2xl font-semibold text-foreground border-b-2 border-[#7B1E3A] pb-2">
          Specific Admission Requirements
        </h3>
        <ul className="space-y-2 text-foreground/80 leading-relaxed">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
            <span>Afrikaans or English (Home Language or First Additional Language) – minimum 50%</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
            <span>Mathematics – minimum 70%</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
            <span>Any other school subject from the designated subject list for university admission – minimum 50%</span>
          </li>
        </ul>
        <p className="text-foreground/80 pl-6">OR</p>
        <ul className="space-y-2 text-foreground/80 leading-relaxed">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
            <span>Physical Sciences – minimum 50% (if you are planning to take Physics or Chemistry)</span>
          </li>
        </ul>
      </div>

      {/* Continued Study */}
      <div className="space-y-4">
        <h3 className="font-['Spectral'] text-2xl font-semibold text-foreground border-b-2 border-[#7B1E3A] pb-2">
          Continued Study Possibilities
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          If you take applicable elective modules, this focal area leads to honours programmes in:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {['Applied Mathematics', 'Computer Science', 'Economics', 'General Linguistics', 'Genetics', 'GeoInformatics', 'Mathematical Statistics', 'Mathematics', 'Operations Research', 'Statistics'].map((prog) => (
            <div key={prog} className="flex items-center gap-2 text-foreground/80">
              <span className="w-1.5 h-1.5 bg-[#7B1E3A] rounded-full"></span>
              <span>{prog}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-foreground/80">
            <p className="font-semibold mb-1">Note:</p>
            <p>If continuing to Honours in GeoInformatics, you must complete: <strong>Physics 114(16)</strong> and <strong>Physics 144(16)</strong>.</p>
            <p className="mt-2">Without these Physics modules, you may still register with SACNASP as a Natural Scientist in Geospatial Science.</p>
          </div>
        </div>
      </div>

      {/* 1st Year */}
      <div className="space-y-6">
        <h3 className="font-['Spectral'] text-3xl font-bold text-foreground">
          1ST YEAR <span className="text-xl text-muted-foreground">(Minimum 124, Maximum 140 Credits)</span>
        </h3>
        
        <div className="bg-[#7B1E3A] text-white p-6 rounded-t-lg">
          <h4 className="font-['Spectral'] text-xl font-semibold mb-3">Compulsory Modules (92 credits)</h4>
          <ul className="space-y-2">
            <li>• Computer Science 114 (16)</li>
            <li>• Computer Science 144 (16)</li>
            <li>• Mathematics 114 (16)</li>
            <li>• Mathematics 144 (16)</li>
            <li>• Probability Theory and Statistics 114 (16)</li>
            <li>• Science in Context 179 (12)</li>
          </ul>
        </div>

        <div className="bg-card border border-border p-6 rounded-b-lg">
          <h4 className="font-['Spectral'] text-xl font-semibold text-foreground mb-3">
            Elective Modules (Minimum 32, Maximum 48 credits)
          </h4>
          <p className="text-foreground/80 mb-3">Choose at least one:</p>
          <ul className="space-y-1 mb-4 text-foreground/80">
            <li>• Applied Mathematics 144 (16)</li>
            <li>• Mathematics 154 (16)</li>
          </ul>
          <p className="text-foreground/80 mb-3">Then choose additional modules from:</p>
          <ul className="space-y-1 text-foreground/80">
            <li>• Applied Mathematics 144 (16)</li>
            <li>• Biology 124 (16), 144 (16) or 154 (16)</li>
            <li>• Chemistry 124 (16), 144 (16)</li>
            <li>• Economics 114 (12), 144 (12)</li>
            <li>• General Linguistics 178 (24)</li>
            <li>• Geo-Environmental Science 124 (16), 154 (16)</li>
            <li>• Geographical Information Technology 141 (16)</li>
            <li>• Mathematics 154 (16)</li>
            <li>• Music Technology 112 (6), 142 (6)</li>
            <li>• Physics 114 (16), 144 (16)</li>
          </ul>
        </div>
      </div>

      {/* 2nd Year */}
      <div className="space-y-6">
        <h3 className="font-['Spectral'] text-3xl font-bold text-foreground">
          2ND YEAR <span className="text-xl text-muted-foreground">(128 Credits)</span>
        </h3>
        
        <div className="bg-[#7B1E3A] text-white p-6 rounded-t-lg">
          <h4 className="font-['Spectral'] text-xl font-semibold mb-3">Compulsory Modules (32 credits)</h4>
          <ul className="space-y-2">
            <li>• Computer Science 214 (16)</li>
            <li>• Computer Science 244 (16)</li>
          </ul>
        </div>

        <div className="bg-card border border-border p-6 rounded-b-lg">
          <h4 className="font-['Spectral'] text-xl font-semibold text-foreground mb-3">
            Elective Modules (96 credits)
          </h4>
          <p className="text-foreground/80 mb-3">Choose from:</p>
          <ul className="space-y-1 text-foreground/80">
            <li>• Applied Mathematics 214 (16), 244 (16)</li>
            <li>• Chemistry 214 (16), 234 (16), 254 (16), 264 (16)</li>
            <li>• Economics 217 (16), 248 (16)</li>
            <li>• General Linguistics 278 (32)</li>
            <li>• Genetics 214 (16), 244 (16)</li>
            <li>• Biometry 212 (8), 242 (8)</li>
            <li>• Geographical Information Technology 211 (16), 214 (16), 241 (16), 242 (16)</li>
            <li>• Mathematical Statistics 214 (16), 245 (8), 246 (8)</li>
            <li>• Mathematics 214 (16), 244 (16), 279 (16)</li>
            <li>• Music Technology 222 (8), 252 (8)</li>
            <li>• Operations Research 214 (16), 244 (16)</li>
            <li>• Physics 224 (16), 254 (16)</li>
          </ul>
        </div>
      </div>

      {/* 3rd Year */}
      <div className="space-y-6">
        <h3 className="font-['Spectral'] text-3xl font-bold text-foreground">
          3RD YEAR <span className="text-xl text-muted-foreground">(128 Credits)</span>
        </h3>
        
        <div className="bg-[#7B1E3A] text-white p-6 rounded-t-lg">
          <h4 className="font-['Spectral'] text-xl font-semibold mb-3">Compulsory Modules (64 credits)</h4>
          <ul className="space-y-2">
            <li>• Computer Science 313 (16)</li>
            <li>• Computer Science 314 (16)</li>
            <li>• Computer Science 343 (16)</li>
            <li>• Computer Science 344 (16)</li>
          </ul>
        </div>

        <div className="bg-card border border-border p-6 rounded-b-lg">
          <h4 className="font-['Spectral'] text-xl font-semibold text-foreground mb-3">
            Elective Modules (64 credits)
          </h4>
          <p className="text-foreground/80 mb-3">Choose from:</p>
          <ul className="space-y-1 text-foreground/80">
            <li>• Applied Mathematics 314 (16), 324 (16), 354 (16), 364 (16)</li>
            <li>• Biomathematics 374 (16)</li>
            <li>• Chemistry 344 (16)</li>
            <li>• Computer Science 315 (16), 345 (16)</li>
            <li>• Economics 318 (24), 348 (24)</li>
            <li>• General Linguistics 318 (24), 348 (24)</li>
            <li>• Genetics 314 (16), 324 (16), 344 (16), 354 (16)</li>
            <li>• Geographical Information Technology 311 (16), 312 (16), 341 (16), 342 (16)</li>
            <li>• Mathematical Statistics 312 (16), 316 (16), 344 (16), 364 (16)</li>
          </ul>
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 text-sm">
            <p className="text-foreground/80">
              <AlertTriangle className="w-4 h-4 inline mr-1" />
              These Mathematical Statistics modules may not be taken with Statistics 318 or 348.
            </p>
          </div>
          <ul className="space-y-1 text-foreground/80 mt-3">
            <li>• Mathematics 314 (16), 324 (16), 344 (16), 345 (16), 365 (16), 378 (32)*</li>
            <li>• Music Technology 379 (48)</li>
            <li>• Operations Research 314 (16), 322 (16), 344 (16), 352 (16)</li>
            <li>• Physics 314 (16), 334 (16), 344 (16), 384 (16)</li>
            <li>• Statistics 318 (24), 348 (24)</li>
          </ul>
          <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-600 text-sm">
            <p className="text-foreground/80">
              * Mathematics 378 (32) will be replaced with Mathematics 318 (16) in 2027.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Computer Systems Component
function ComputerSystems() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-['Spectral'] text-4xl font-bold text-foreground mb-4">
          7.4.2 Focal Area: Computer Systems
        </h2>
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-foreground/80">
            <p className="font-semibold mb-1">Note:</p>
            <p>Includes modules assessed during Engineering test week. If timetable clashes occur, consult the divisional head during the first two weeks of the semester.</p>
          </div>
        </div>
      </div>

      {/* Admission Requirements */}
      <div className="space-y-4">
        <h3 className="font-['Spectral'] text-2xl font-semibold text-foreground border-b-2 border-[#7B1E3A] pb-2">
          Specific Admission Requirements
        </h3>
        <ul className="space-y-2 text-foreground/80 leading-relaxed">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
            <span>Afrikaans or English – minimum 50%</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
            <span>Mathematics – minimum 70%</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
            <span>Any other designated subject – minimum 50%</span>
          </li>
        </ul>
        <p className="text-foreground/80 pl-6">OR</p>
        <ul className="space-y-2 text-foreground/80 leading-relaxed">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
            <span>Physical Sciences – minimum 50% (if planning to take Physics)</span>
          </li>
        </ul>
      </div>

      {/* Continued Study */}
      <div className="space-y-4">
        <h3 className="font-['Spectral'] text-2xl font-semibold text-foreground border-b-2 border-[#7B1E3A] pb-2">
          Continued Study Possibilities
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Leads to Honours in Computer Science.
        </p>
      </div>

      {/* 1st Year */}
      <div className="space-y-6">
        <h3 className="font-['Spectral'] text-3xl font-bold text-foreground">
          1ST YEAR <span className="text-xl text-muted-foreground">(139 Credits)</span>
        </h3>
        
        <div className="bg-[#7B1E3A] text-white p-6 rounded-lg">
          <ul className="space-y-2">
            <li>• Applied Mathematics 144 (16)</li>
            <li>• Computer Science 114 (16), 144 (16)</li>
            <li>• Electrotechnique 143 (15)</li>
            <li>• Mathematics 114 (16), 144 (16)</li>
            <li>• Physics 114 (16)</li>
            <li>• Probability Theory and Statistics 114 (16)</li>
            <li>• Science in Context 179 (12)</li>
          </ul>
        </div>
      </div>

      {/* 2nd Year */}
      <div className="space-y-6">
        <h3 className="font-['Spectral'] text-3xl font-bold text-foreground">
          2ND YEAR <span className="text-xl text-muted-foreground">(130 Credits)</span>
        </h3>
        
        <div className="bg-[#7B1E3A] text-white p-6 rounded-lg">
          <ul className="space-y-2">
            <li>• Applied Mathematics B 224 (15)</li>
            <li>• Computer Science 214 (16), 244 (16)</li>
            <li>• Computer Systems 214 (15), 245 (15)</li>
            <li>• Engineering Mathematics 214 (15), 242 (8)</li>
            <li>• Systems and Signals 214 (15), 244 (15)</li>
          </ul>
        </div>
      </div>

      {/* 3rd Year */}
      <div className="space-y-6">
        <h3 className="font-['Spectral'] text-3xl font-bold text-foreground">
          3RD YEAR <span className="text-xl text-muted-foreground">(127 Credits)</span>
        </h3>
        
        <div className="bg-[#7B1E3A] text-white p-6 rounded-lg">
          <ul className="space-y-2">
            <li>• Applied Mathematics 324 (16), 364 (16)</li>
            <li>• Computer Science 313 (16), 314 (16), 343 (16), 344 (16), 345 (16)</li>
            <li>• Design E 314 (15)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Data Science Component
function DataScience() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-['Spectral'] text-4xl font-bold text-foreground mb-4">
          7.4.3 Focal Area: Data Science
        </h2>
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-600 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-foreground/80">
            <p className="font-semibold mb-1">Note:</p>
            <p>Includes Engineering test week modules.</p>
          </div>
        </div>
      </div>

      {/* Admission Requirements */}
      <div className="space-y-4">
        <h3 className="font-['Spectral'] text-2xl font-semibold text-foreground border-b-2 border-[#7B1E3A] pb-2">
          Specific Admission Requirements
        </h3>
        <ul className="space-y-2 text-foreground/80 leading-relaxed">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
            <span>Afrikaans or English – minimum 50%</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
            <span>Mathematics – minimum 70%</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
            <span>Any other designated subject – minimum 50%</span>
          </li>
        </ul>
        <p className="text-foreground/80 pl-6">OR</p>
        <ul className="space-y-2 text-foreground/80 leading-relaxed">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-[#7B1E3A] rounded-full mt-2 flex-shrink-0"></span>
            <span>Physical Sciences – minimum 50% (if planning to take Physics)</span>
          </li>
        </ul>
      </div>

      {/* Continued Study */}
      <div className="space-y-4">
        <h3 className="font-['Spectral'] text-2xl font-semibold text-foreground border-b-2 border-[#7B1E3A] pb-2">
          Continued Study Possibilities
        </h3>
        <p className="text-foreground/80 leading-relaxed">
          Leads to Honours in Computer Science.
        </p>
      </div>

      {/* 1st Year */}
      <div className="space-y-6">
        <h3 className="font-['Spectral'] text-3xl font-bold text-foreground">
          1ST YEAR <span className="text-xl text-muted-foreground">(Minimum 124, Maximum 140 Credits)</span>
        </h3>
        
        <div className="bg-[#7B1E3A] text-white p-6 rounded-t-lg">
          <h4 className="font-['Spectral'] text-xl font-semibold mb-3">Compulsory Modules (108 credits)</h4>
          <ul className="space-y-2">
            <li>• Computer Science 114 (16), 144 (16)</li>
            <li>• Data Science 141 (16)</li>
            <li>• Mathematics 114 (16), 144 (16)</li>
            <li>• Probability Theory and Statistics 114 (16)</li>
            <li>• Science in Context 179 (12)</li>
          </ul>
        </div>

        <div className="bg-card border border-border p-6 rounded-b-lg">
          <h4 className="font-['Spectral'] text-xl font-semibold text-foreground mb-3">
            Electives (Minimum 16, Maximum 32 credits)
          </h4>
          <ul className="space-y-1 text-foreground/80">
            <li>• Applied Mathematics 144 (16)</li>
            <li>• Economics 114 (12), 144 (12)</li>
            <li>• Mathematics 154 (16)</li>
            <li>• Physics 114 (16), 144 (16)</li>
          </ul>
        </div>
      </div>

      {/* 2nd Year */}
      <div className="space-y-6">
        <h3 className="font-['Spectral'] text-3xl font-bold text-foreground">
          2ND YEAR <span className="text-xl text-muted-foreground">(Minimum 124, Maximum 128 Credits)</span>
        </h3>
        
        <div className="bg-[#7B1E3A] text-white p-6 rounded-t-lg">
          <h4 className="font-['Spectral'] text-xl font-semibold mb-3">Compulsory (112 credits)</h4>
          <ul className="space-y-2">
            <li>• Applied Mathematics 214 (16)</li>
            <li>• Computer Science 214 (16), 244 (16)</li>
            <li>• Mathematics 214 (16), 244 (16)</li>
            <li>• Mathematical Statistics 214 (16), 245 (8), 246 (8)</li>
          </ul>
        </div>

        <div className="bg-card border border-border p-6 rounded-b-lg">
          <h4 className="font-['Spectral'] text-xl font-semibold text-foreground mb-3">
            Elective (Choose one)
          </h4>
          <ul className="space-y-1 text-foreground/80">
            <li>• Data Engineering 245 (12)</li>
            <li className="ml-6">OR</li>
            <li>• Data Science 241 (16)</li>
          </ul>
        </div>
      </div>

      {/* 3rd Year */}
      <div className="space-y-6">
        <h3 className="font-['Spectral'] text-3xl font-bold text-foreground">
          3RD YEAR <span className="text-xl text-muted-foreground">(Minimum 127, Maximum 128 Credits)</span>
        </h3>
        
        <div className="bg-[#7B1E3A] text-white p-6 mb-6 rounded-lg">
          <h4 className="font-['Spectral'] text-xl font-semibold mb-3">Compulsory (64 credits)</h4>
          <ul className="space-y-2">
            <li>• Computer Science 314 (16), 315 (16), 343 (16), 344 (16)</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-['Spectral'] text-2xl font-semibold text-foreground">
            Choose ONE Option:
          </h4>

          {/* Option 1 */}
          <div className="bg-card border-2 border-[#7B1E3A]/30 p-6 rounded-lg">
            <h5 className="font-['Spectral'] text-xl font-bold text-[#7B1E3A] mb-3">Option 1</h5>
            <ul className="space-y-1 text-foreground/80">
              <li>• Computer Science 345 (16)</li>
              <li>• Data Science 316 (16), 346 (16)</li>
              <li>• Mathematical Statistics 312 (16)</li>
            </ul>
          </div>

          {/* Option 2 */}
          <div className="bg-card border-2 border-[#7B1E3A]/30 p-6 rounded-lg">
            <h5 className="font-['Spectral'] text-xl font-bold text-[#7B1E3A] mb-3">Option 2</h5>
            <ul className="space-y-1 text-foreground/80">
              <li>• Data Engineering 314 (15)</li>
              <li>• Statistics 318 (24), 348 (24)</li>
            </ul>
          </div>

          {/* Option 3 */}
          <div className="bg-card border-2 border-[#7B1E3A]/30 p-6 rounded-lg">
            <h5 className="font-['Spectral'] text-xl font-bold text-[#7B1E3A] mb-3">Option 3</h5>
            <ul className="space-y-1 text-foreground/80">
              <li>• Mathematical Statistics 312 (16), 316 (16), 344 (16), 364 (16)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}