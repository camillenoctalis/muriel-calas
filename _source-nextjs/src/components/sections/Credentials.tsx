import Image from "next/image";
import { ArrowUpRight } from "@/components/ui/icons";
import { site } from "@/content/site";

/** Logo Catch & Think, fourni par l’organisme ; colorable via currentColor. */
function CatchAndThink({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 152.39 55.8" fill="currentColor" role="img" aria-label="Catch & Think" className={className}>
      <g><g><g><path d="M89.59,27.78c1.14-7.39,8.44-13,16.92-13,7.46,0,12.66,4.37,13,10.45h-8.23c-.69-2.26-2.89-3.75-5.81-3.75a7.85,7.85,0,0,0-7.91,6.3c-.57,3.6,2,6.3,5.93,6.3a8.33,8.33,0,0,0,7-3.75h8.24c-2.27,6.08-8.84,10.44-16.31,10.44C93.93,40.77,88.41,35.17,89.59,27.78Z" transform="translate(-89.43 -14.78)"></path><path d="M133.05,36.88h-10l-1.78,3.46H113l14-25.12h9.13l6.12,25.12h-8.47Zm-1.3-6.41-1.5-7.53-3.9,7.53Z" transform="translate(-89.43 -14.78)"></path><path d="M161.25,21.77h-6.74l-2.92,18.57h-7.75l2.92-18.57H140l1-6.55h21.22Z" transform="translate(-89.43 -14.78)"></path><path d="M157.76,27.78c1.13-7.39,8.44-13,16.92-13,7.46,0,12.66,4.37,13,10.45h-8.24c-.69-2.26-2.88-3.75-5.8-3.75a7.85,7.85,0,0,0-7.91,6.3c-.57,3.6,2,6.3,5.92,6.3a8.33,8.33,0,0,0,7-3.75h8.24c-2.27,6.08-8.85,10.44-16.31,10.44C162.1,40.77,156.58,35.17,157.76,27.78Z" transform="translate(-89.43 -14.78)"></path><path d="M213.51,15.22l-3.94,25.12h-7.75L203.28,31h-8.76l-1.46,9.36h-7.75l3.94-25.12H197l-1.46,9.21h8.77l1.46-9.21Z" transform="translate(-89.43 -14.78)"></path></g><g><path d="M154.53,52h-6.74l-2.92,18.57h-7.75L140,52H133.3l1-6.55h21.22Z" transform="translate(-89.43 -14.78)"></path><path d="M181.18,45.46l-3.94,25.12h-7.75L171,61.22h-8.76l-1.46,9.36H153l3.93-25.12h7.76l-1.47,9.21H172l1.46-9.21Z" transform="translate(-89.43 -14.78)"></path><path d="M183.27,45.46H191l-3.94,25.12h-7.75Z" transform="translate(-89.43 -14.78)"></path><path d="M237.56,64h1.38l-1,6.56h-2.23c-4.91,0-8.2-1.57-9.82-4.74l-1.58-3.09-2.44,2.37L221,70.58h-7.75l3.94-25.12h7.75l-1.46,9.28,8.88-9.28h9.46L230.25,56.85l2.93,4.88A4.75,4.75,0,0,0,237.56,64Z" transform="translate(-89.43 -14.78)"></path></g><path d="M232.53,35h-5.64l-.82,5.09h-6l.81-5.09h-5.64l.85-5.32h5.64l.81-5.1h6l-.81,5.1h5.64Z" transform="translate(-89.43 -14.78)"></path></g><polygon points="110.42 30.69 119.66 30.69 117.65 43.48 110.42 30.69"></polygon><polygon points="106.5 55.79 115.71 55.79 108.45 42.95 106.5 55.79"></polygon></g>
    </svg>
  );
}

/** Formations suivies par Muriel : logos + liens vers les organismes. */
export function Credentials() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
      {site.trainings.map((t) => (
        <li key={t.name} className="flex flex-col gap-4 bg-paper p-6" data-reveal>
          <span className="flex h-10 items-center">
            {t.logo === "svg" ? (
              <CatchAndThink className="h-9 w-auto text-ink" />
            ) : (
              <Image src={t.logo} alt={t.name} width={640} height={167} className="h-8 w-auto" />
            )}
          </span>
          <p className="text-muted">{t.role}</p>
          <a
            href={t.url}
            target="_blank"
            rel="noopener"
            className="link-line mt-auto self-start text-ink"
          >
            {t.linkLabel}
            <ArrowUpRight size={15} />
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
