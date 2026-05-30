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

export function CardEvent({
  status,
  imgSrc,
  date,
  category,
  title,
  description,
  link,
  ...props
}: {
  status?: "ongoing" | "upcoming" | "past";
  imgSrc?: string;
  date?: string;
  category?: string;
  title?: string;
  description?: string;
  link?: string;
}) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <div>
        <CardAction className="absolute top-4 right-4 z-40">
          <Badge variant="secondary">
            {status === "ongoing" && "Ongoing"}
            {status === "upcoming" && "Upcoming"}
            {status === "past" && "Past"}
          </Badge>
        </CardAction>
        <img
          src={imgSrc}
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm">
          <div className="bg-border flex items-center justify-center h-8 w-10 rounded-b-xl rounded-tl-xl">
            <svg
              width="24"
              height="18"
              viewBox="0 0 24 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect
                width="24"
                height="18"
                fill="url(#pattern0_2032_478)"
                fillOpacity="0.5"
              />
              <defs>
                <pattern
                  id="pattern0_2032_478"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_2032_478"
                    transform="matrix(0.00833333 0 0 0.0111111 0.125 0)"
                  />
                </pattern>
                <image
                  id="image0_2032_478"
                  width="90"
                  height="90"
                  preserveAspectRatio="none"
                  xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAABwUlEQVR4nO2csU7kQBAFK2L5hNuFT+QgO/OFwEZ79ykIEkdzQnJAsAQOpt09rpJesnryqkuWLXcwICIiIiIiIiIiX9wCT8AZ+ATaoPkE3oBH4BAt+R74l0BCC87fZfawO3mPkts32SF39lOCYdvG+R0h+pxg0LZxXiNEfyQYtG2cLwfd+enPR6VtNa+iUXQPFB2EooNQdBCKDkLRQSg6CEUHoeggFL1X0XtLd7YesCWJolE0I0XRKJqRomgUzUhRNIrme2bgD3BaMi2/VemXET1dufZUqF9G9PHKtX8V6pcRfbpy7btC/dKPjudC/TKi52W4NS+rTP0yolvxKBpFM1IUjaIZKYpmcNHZdhHzqLuObLuIqXO/O1V2EcfO/e5U2UWcOve7M+ruYlrZ706VXcTsroMhomgUzUhRNIpmpCiawUVn20XMK/tlRGfbRUwr+2VEZ9tFHFf2y4jOtos4reyXEZ1tFzGt7JcRnW0XMa/slxG9t3Rn6wFbkiiaQUR7HBu8R4j2gEFiDhh8TDBo2zgPEaIPy0Gobae5ADcEcb9T2Zfl6zKUw3Lq7OvgL8gP4GV5XITdySIiIiIiIiIiJOY/IwTqED8R3PUAAAAASUVORK5CYII="
                />
              </defs>
            </svg>
          </div>
          <p className="text-sm text-muted-foreground w-full">
            {date} | {category}
          </p>
        </div>
        <CardTitle className="text-lg font-bold mt-2">{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer">
            View Event
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
