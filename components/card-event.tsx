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
import { MoveRight, CalendarDays, Tag } from "lucide-react";

const statusConfig = {
  ongoing: {
    label: "Berlangsung",
    className:
      "bg-emerald-500/10 text-emerald-700 border-emerald-200 dark:text-emerald-400",
  },
  upcoming: {
    label: "Akan Datang",
    className:
      "bg-blue-500/10 text-blue-700 border-blue-200 dark:text-blue-400",
  },
  past: {
    label: "Selesai",
    className: "bg-muted text-muted-foreground border-border",
  },
};

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
    <Card className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        {imgSrc && (
          <img
            src={imgSrc}
            alt={title ?? "Event image"}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {status && (
          <Badge
            variant="outline"
            className={`absolute left-3 top-3 backdrop-blur-md ${s.className}`}
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
            {s.label}
          </Badge>
        )}
      </div>

      {/* Content */}
      <CardHeader className="flex-1 space-y-3 p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            <time>{date}</time>
          </span>
          <span className="h-3 w-px bg-border" aria-hidden />
          <span className="inline-flex items-center gap-1.5">
            <Tag className="h-3.5 w-3.5" aria-hidden />
            {category}
          </span>
        </div>

        <CardTitle className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
          {title}
        </CardTitle>

        <CardDescription className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="p-5 pt-0">
        <CardAction className="w-full">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="group/btn -ml-2 h-auto px-2 py-1.5 font-medium text-primary hover:bg-primary/5 hover:text-primary"
          >
            <a href={link} aria-label={`Lihat detail ${title}`}>
              Lihat Event
              <MoveRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </a>
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
