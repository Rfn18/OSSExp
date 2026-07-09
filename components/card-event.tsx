// src/components/card-event.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveRight, CalendarDays, Tag, ImageOff } from "lucide-react";
import { statusConfig } from "@/lib/statusConfig";

export function CardEvent({
  status,
  imgSrc,
  date,
  category,
  title,
  description,
  link,
}: {
  status?: "ongoing" | "upcoming" | "past";
  imgSrc?: string;
  date?: string;
  category?: string;
  title?: string;
  description?: string;
  link?: string;
}) {
  const s = status ? statusConfig[status] : statusConfig.past;

  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-border/60 bg-card p-0 gap-0 transition-all duration-300">
      <div className="relative aspect-16/10 sm:aspect-video w-full overflow-hidden bg-muted">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={title ?? "Event image"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-white">
            <ImageOff
              className="h-6 w-6 text-muted-foreground/40"
              aria-hidden
            />
          </div>
        )}

        {status && (
          <Badge
            variant="secondary"
            className={`absolute left-3 top-3 sm:left-4 sm:top-4 gap-1.5 border-0 px-2.5 py-1 text-[11px] font-medium backdrop-blur-md ${s.className}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden />
            {s.label}
          </Badge>
        )}
      </div>

      <CardHeader className="flex-1 space-y-2.5 sm:space-y-3 px-4 sm:px-5 pt-4 sm:pt-5 pb-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <time>{date}</time>
          </span>
          <span className="h-3 w-px bg-border" aria-hidden />
          <span className="inline-flex items-center gap-1.5 truncate">
            <Tag className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {category}
          </span>
        </div>

        <CardTitle className="line-clamp-2 text-base sm:text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
          {title}
        </CardTitle>

        <CardDescription className="line-clamp-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="mt-4 sm:mt-5 border-t border-border/60 px-4 sm:px-5 py-3 sm:py-3.5 bg-white">
        <CardAction className="w-full">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="group/btn -ml-2 h-auto px-2 py-1.5 text-xs sm:text-sm font-semibold text-primary hover:bg-primary/5 hover:text-primary"
          >
            <a href={link} aria-label={`Lihat detail ${title}`}>
              Lihat Event
              <MoveRight className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
