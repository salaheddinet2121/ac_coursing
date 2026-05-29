import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function StepFrame({
  step,
  title,
  description,
  kicker,
  children,
  className,
  onNext,
  onPrev,
  isLast = false,
}: {
  step: number;
  title: string;
  description: string;
  kicker: string;
  children: React.ReactNode;
  className?: string;
  onNext?: () => void;
  onPrev?: () => void;
  isLast?: boolean;
}) {
  const percent = step * 20;

  return (
    <section className={cn("space-y-6", className)}>
      {/* Progress */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-[#7b6423]">
            Etape {step} sur 5
          </span>
          <span className="text-xs text-muted-foreground">{percent}% complété</span>
        </div>
        <Progress value={percent} className="h-1.5 rounded-full bg-border" />
      </div>

      {/* Heading */}
      <div className="space-y-2">
        <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[0.68rem] font-bold tracking-[0.15em] uppercase text-[#7b6423]">
          {kicker}
        </span>
        <h1 className="text-3xl font-bold tracking-[-0.03em] text-foreground md:text-4xl">
          {title}
        </h1>
        <p className="text-[0.93rem] leading-relaxed text-muted-foreground">{description}</p>
      </div>

      {/* Step content */}
      {children}

      {/* Inline navigation buttons */}
      {(onNext || onPrev) && (
        <div className="flex items-center justify-between gap-3 border-t border-border pt-6">
          {onPrev ? (
            <button
              type="button"
              onClick={onPrev}
              className="flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted active:scale-95"
            >
              <ArrowLeft className="size-4" />
              Retour
            </button>
          ) : (
            <span />
          )}

          {onNext && !isLast && (
            <button
              type="button"
              onClick={onNext}
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_2px_12px_rgba(246,191,29,0.4)] transition hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(246,191,29,0.45)] active:translate-y-0 active:scale-95"
            >
              Continuer
              <ArrowRight className="size-4" />
            </button>
          )}

          {isLast && (
            <button
              type="button"
              onClick={onNext}
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-[0_2px_12px_rgba(16,185,129,0.35)] transition hover:-translate-y-px hover:bg-emerald-600 active:translate-y-0 active:scale-95"
            >
              Recevoir le devis
              <CheckCircle className="size-4" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
