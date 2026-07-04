import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const galleryImages = images.length > 0 ? images : [];

  if (galleryImages.length === 0) {
    return null;
  }

  if (galleryImages.length === 1) {
    return (
      <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
        <img
          src={galleryImages[0]}
          alt={title}
          className="aspect-square w-full object-cover"
        />
      </div>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {galleryImages.map((image, index) => (
          <CarouselItem key={image}>
            <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
              <img
                src={image}
                alt={`${title} ${index + 1}`}
                className="aspect-square w-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3" />
      <CarouselNext className="right-3" />
    </Carousel>
  );
}
