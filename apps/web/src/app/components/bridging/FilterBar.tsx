import { Search } from 'lucide-react';

export type ResourceTypeFilter = 'all' | 'pdf' | 'java' | 'python' | 'c';
export type DayFilter = 'all' | 'day1' | 'day2' | 'day3';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  typeFilter: ResourceTypeFilter;
  onTypeFilterChange: (value: ResourceTypeFilter) => void;
  dayFilter: DayFilter;
  onDayFilterChange: (value: DayFilter) => void;
  resultCount: number;
  filterCardTitle: string;
  typeFilterLabel: string;
  dayFilterLabel: string;
  searchPlaceholder: string;
  resultCountLabel: string;
  allLabel: string;
  pdfLabel: string;
  javaLabel: string;
  pythonLabel: string;
  cLabel: string;
  day1Label: string;
  day2Label: string;
  day3Label: string;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  dayFilter,
  onDayFilterChange,
  resultCount,
  filterCardTitle,
  typeFilterLabel,
  dayFilterLabel,
  searchPlaceholder,
  resultCountLabel,
  allLabel,
  pdfLabel,
  javaLabel,
  pythonLabel,
  cLabel,
  day1Label,
  day2Label,
  day3Label,
}: FilterBarProps) {
  const typeOptions: { value: ResourceTypeFilter; label: string }[] = [
    { value: 'all', label: allLabel },
    { value: 'pdf', label: pdfLabel },
    { value: 'java', label: javaLabel },
    { value: 'python', label: pythonLabel },
    { value: 'c', label: cLabel },
  ];
  const dayOptions: { value: DayFilter; label: string }[] = [
    { value: 'all', label: allLabel },
    { value: 'day1', label: day1Label },
    { value: 'day2', label: day2Label },
    { value: 'day3', label: day3Label },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <h3 className="font-semibold text-foreground text-sm">{filterCardTitle}</h3>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2"
          aria-label={searchPlaceholder}
        />
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">{typeFilterLabel}</p>
        <div className="flex flex-wrap gap-2">
          {typeOptions.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onTypeFilterChange(value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2 ${
                typeFilter === value
                  ? 'bg-[#7B1E3A] text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              aria-pressed={typeFilter === value}
              aria-label={`Filter by ${label}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">{dayFilterLabel}</p>
        <div className="flex flex-wrap gap-2">
          {dayOptions.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => onDayFilterChange(value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B1E3A] focus:ring-offset-2 ${
                dayFilter === value
                  ? 'bg-[#7B1E3A] text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              aria-pressed={dayFilter === value}
              aria-label={`Filter by ${label}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground pt-2 border-t border-border">
        {resultCountLabel}: <span className="font-semibold text-foreground">{resultCount}</span>
      </p>
    </div>
  );
}
