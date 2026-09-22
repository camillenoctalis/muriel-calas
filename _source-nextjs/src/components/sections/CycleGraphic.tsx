/**
 * Visuel « cycle » : quatre temps d’une démarche d’observation (et non des phases médicales),
 * un point qui parcourt lentement le cercle, et au centre l’objectif : le « 100 % du jour ».
 */
const C = 200;
const R = 138;

function polar(deg: number, r = R) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
}

function arc(start: number, end: number, r = R) {
  const a = polar(start, r);
  const b = polar(end, r);
  const large = end - start > 180 ? 1 : 0;
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

const steps = [
  { label: "Observer", angle: 0 },
  { label: "Comprendre", angle: 90 },
  { label: "Adapter", angle: 180 },
  { label: "S’appuyer", angle: 270 },
];

export function CycleGraphic({ className }: { className?: string }) {
  return (
    <svg viewBox="-78 -6 556 412" className={className} role="img" aria-labelledby="cycle-graphic-title">
      <title id="cycle-graphic-title">
        Une démarche en quatre temps : observer son cycle, le comprendre, adapter sa préparation et s’appuyer sur
        ses points forts pour être à son 100 % du jour.
      </title>

      {/* cercles de respiration */}
      <circle cx={C} cy={C} r={186} fill="none" stroke="currentColor" strokeOpacity="0.08" />
      <circle cx={C} cy={C} r={96} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="2 6" />

      {/* quatre arcs */}
      {steps.map((s, i) => (
        <path
          key={s.label}
          d={arc(s.angle + 9, s.angle + 81)}
          fill="none"
          stroke={i % 2 === 0 ? "var(--color-clay)" : "var(--color-navy)"}
          strokeOpacity={i % 2 === 0 ? 0.85 : 0.55}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}

      {/* repères et libellés */}
      {steps.map((s) => {
        const p = polar(s.angle);
        const l = polar(s.angle, R + 34);
        const anchor = s.angle === 90 ? "start" : s.angle === 270 ? "end" : "middle";
        const dy = s.angle === 0 ? -2 : s.angle === 180 ? 12 : 5;
        return (
          <g key={s.label}>
            <circle cx={p.x} cy={p.y} r="4" fill="var(--color-paper)" stroke="currentColor" strokeOpacity="0.5" />
            <text
              x={s.angle === 90 ? l.x - 18 : s.angle === 270 ? l.x + 18 : l.x}
              y={l.y + dy}
              textAnchor={anchor}
              className="fill-current font-sans text-[13px] font-semibold uppercase tracking-[0.14em]"
            >
              {s.label}
            </text>
          </g>
        );
      })}

      {/* point qui parcourt le cycle */}
      <g className="orbit" style={{ transformOrigin: "200px 200px", transformBox: "view-box" }}>
        <circle cx={C} cy={C - R} r="7" fill="var(--color-clay)" />
        <circle cx={C} cy={C - R} r="14" fill="var(--color-clay)" fillOpacity="0.15" />
      </g>

      {/* centre */}
      <text x={C} y={C - 6} textAnchor="middle" className="fill-current font-serif text-[40px] italic">
        100 %
      </text>
      <text x={C} y={C + 22} textAnchor="middle" className="fill-current font-sans text-[12px] font-semibold uppercase tracking-[0.16em] opacity-70">
        du jour
      </text>
    </svg>
  );
}
