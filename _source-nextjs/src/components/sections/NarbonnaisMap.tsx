import { site, towns } from "@/content/site";

/**
 * Carte stylisée du Narbonnais (indicative) : positions réelles des communes
 * (projection équirectangulaire locale), cercles de 5, 10 et 15 km autour de Mirepeisset.
 */
const LON_MIN = 2.785;
const LAT_MAX = 43.352;
const COS = Math.cos((43.24 * Math.PI) / 180);
const S = 2500; // px par degré de latitude
const KM = S / 111.13;

const project = (lat: number, lon: number) => ({
  x: 12 + (lon - LON_MIN) * COS * S,
  y: 12 + (LAT_MAX - lat) * S,
});

type Placement = { anchor: "start" | "end" | "middle"; dx: number; dy: number };

const placements: Record<string, Placement> = {
  Mirepeisset: { anchor: "start", dx: 14, dy: -10 },
  Narbonne: { anchor: "end", dx: -14, dy: 5 },
  Ginestas: { anchor: "end", dx: -10, dy: 12 },
  "Bize-Minervois": { anchor: "start", dx: 10, dy: 4 },
  Argeliers: { anchor: "start", dx: 10, dy: 4 },
  Ouveillan: { anchor: "start", dx: 10, dy: 4 },
  "Sallèles-d’Aude": { anchor: "start", dx: 10, dy: 4 },
  "Saint-Marcel-sur-Aude": { anchor: "start", dx: 10, dy: 4 },
  "Saint-Nazaire-d’Aude": { anchor: "middle", dx: 0, dy: -12 },
  "Ventenac-en-Minervois": { anchor: "end", dx: -10, dy: 4 },
  "Cuxac-d’Aude": { anchor: "start", dx: 10, dy: 4 },
  Moussan: { anchor: "start", dx: 10, dy: 4 },
  Marcorignan: { anchor: "end", dx: -10, dy: 4 },
};

export function NarbonnaisMap({ className }: { className?: string }) {
  const home = project(site.location.geo.latitude, site.location.geo.longitude);
  const width = 12 * 2 + (3.06 - LON_MIN) * COS * S;
  const height = 12 * 2 + (LAT_MAX - 43.135) * S;

  return (
    <svg
      viewBox={`0 0 ${width.toFixed(0)} ${height.toFixed(0)}`}
      className={className}
      role="img"
      aria-labelledby="carte-titre carte-desc"
    >
      <title id="carte-titre">Carte indicative du Narbonnais</title>
      <desc id="carte-desc">
        Mirepeisset au centre, entouré de Ginestas, Argeliers, Bize-Minervois, Ouveillan, Sallèles-d’Aude,
        Saint-Marcel-sur-Aude, Saint-Nazaire-d’Aude, Ventenac-en-Minervois, Cuxac-d’Aude, Moussan et Marcorignan ;
        Narbonne se trouve à environ 19 km au sud-est.
      </desc>

      <defs>
        <pattern id="carte-points" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="currentColor" fillOpacity="0.14" />
        </pattern>
        <clipPath id="carte-clip">
          <rect width={width} height={height} rx="6" />
        </clipPath>
      </defs>

      <g clipPath="url(#carte-clip)">
        <rect width={width} height={height} fill="url(#carte-points)" />

        {/* Cercles de distance */}
        {[5, 10, 15].map((km, i) => (
          <g key={km}>
            <circle
              cx={home.x}
              cy={home.y}
              r={km * KM}
              fill="none"
              stroke="var(--color-navy)"
              strokeOpacity={0.28 - i * 0.06}
              strokeDasharray={i === 0 ? undefined : "3 5"}
            />
            <text
              x={home.x + km * KM * Math.cos(-Math.PI / 4) + 4}
              y={home.y + km * KM * Math.sin(-Math.PI / 4) - 4}
              className="fill-current font-sans text-[11px] font-semibold tracking-[0.08em]"
              fillOpacity="0.55"
            >
              {km} km
            </text>
          </g>
        ))}

        {/* Communes */}
        {towns.map((t) => {
          const p = project(t.lat, t.lon);
          const place = placements[t.name] ?? { anchor: "start", dx: 10, dy: 4 };
          const isHome = "home" in t && t.home;
          const isMajor = "major" in t && t.major;
          return (
            <g key={t.name}>
              {isHome ? (
                <>
                  <circle cx={p.x} cy={p.y} r="22" fill="var(--color-clay)" fillOpacity="0.1" className="breathe" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
                  <circle cx={p.x} cy={p.y} r="7" fill="var(--color-clay)" />
                  <circle cx={p.x} cy={p.y} r="12" fill="none" stroke="var(--color-clay)" strokeOpacity="0.5" />
                </>
              ) : (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isMajor ? 5.5 : 3.5}
                  fill={isMajor ? "var(--color-navy)" : "var(--color-paper)"}
                  stroke="var(--color-navy)"
                  strokeWidth="1.2"
                />
              )}
              <text
                x={p.x + place.dx}
                y={p.y + place.dy}
                textAnchor={place.anchor}
                className={
                  isHome
                    ? "fill-current font-serif text-[20px]"
                    : isMajor
                      ? "fill-current font-serif text-[18px]"
                      : "fill-current font-sans text-[12.5px]"
                }
                fillOpacity={isHome || isMajor ? 1 : 0.78}
              >
                {t.name}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
