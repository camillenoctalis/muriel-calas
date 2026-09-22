import { cn } from "@/lib/cn";

/**
 * Logo de Muriel Calas : symbole cœur-infini + wordmark serif.
 * Les deux éléments sont rendus en masque CSS pour prendre la couleur du texte (currentColor),
 * ce qui permet un seul jeu de fichiers pour les fonds clairs et sombres.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block aspect-square bg-current", className)}
      style={{
        WebkitMask: "url(/brand/icon-mask.png) center / contain no-repeat",
        mask: "url(/brand/icon-mask.png) center / contain no-repeat",
      }}
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block bg-current", className)}
      style={{
        aspectRatio: "479.8 / 64.3",
        WebkitMask: "url(/brand/wordmark.svg) center / contain no-repeat",
        mask: "url(/brand/wordmark.svg) center / contain no-repeat",
      }}
    />
  );
}

export function Logo({ className, markClassName, wordClassName }: { className?: string; markClassName?: string; wordClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("h-9 w-9", markClassName)} />
      <Wordmark className={cn("h-[1.35rem]", wordClassName)} />
      <span className="sr-only">Muriel Calas, préparatrice mentale</span>
    </span>
  );
}
