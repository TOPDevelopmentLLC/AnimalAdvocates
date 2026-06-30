import { useEffect, useState } from "react";

interface HeroSlideshowProps {
  /** Image URLs to cycle through, in order. */
  images: string[];
  /** Milliseconds each image stays before crossfading. Defaults to 5000. */
  interval?: number;
}

/**
 * A crossfading background slideshow. Renders all images stacked and fades
 * between them on a timer. Intended to sit behind hero text, so it's purely
 * decorative and hidden from assistive tech.
 */
export function HeroSlideshow({ images, interval = 5000 }: HeroSlideshowProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {images.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url("${src}")`,
            opacity: index === active ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}
