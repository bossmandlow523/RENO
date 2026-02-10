import AnimatedCounter from "./AnimatedCounter";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface ImpactStatsProps {
  stats?: Stat[];
}

const DEFAULT_STATS: Stat[] = [
  { value: 1500000, suffix: " lbs", label: "Processed per month" },
  { value: 2017, label: "Serving Manatee County since" },
  { value: 100, suffix: "+", label: "Local business partners" },
];

export default function ImpactStats({ stats = DEFAULT_STATS }: ImpactStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat) => (
        <AnimatedCounter
          key={stat.label}
          end={stat.value}
          suffix={stat.suffix}
          prefix={stat.prefix}
          label={stat.label}
        />
      ))}
    </div>
  );
}
