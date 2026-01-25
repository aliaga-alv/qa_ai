import { useState, useEffect, useRef, type ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  lazy?: boolean;
  skeleton?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className,
  lazy = true,
  skeleton = true,
  objectFit = 'cover',
  ...props
}: OptimizedImageProps) => {
  // Generate WebP source if supported
  const getOptimizedSrc = (originalSrc: string): string => {
    // If already WebP or AVIF, return as is
    if (originalSrc.endsWith('.webp') || originalSrc.endsWith('.avif')) {
      return originalSrc;
    }

    // For external URLs, return as is
    if (originalSrc.startsWith('http')) {
      return originalSrc;
    }

    // For local images, you could add logic to serve WebP/AVIF variants
    // For now, return the original
    return originalSrc;
  };

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(() =>
    lazy ? null : getOptimizedSrc(src)
  );
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy) {
      return;
    }

    const currentRef = imgRef.current;
    if (!currentRef) {
      return;
    }

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(getOptimizedSrc(src));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [src, lazy]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  const containerClasses = cn(
    'relative overflow-hidden',
    width && `w-[${width}px]`,
    height && `h-[${height}px]`,
    className
  );

  const imageClasses = cn(
    'transition-opacity duration-300',
    isLoading ? 'opacity-0' : 'opacity-100',
    objectFit === 'cover' && 'object-cover',
    objectFit === 'contain' && 'object-contain',
    objectFit === 'fill' && 'object-fill',
    objectFit === 'none' && 'object-none',
    objectFit === 'scale-down' && 'object-scale-down'
  );

  return (
    <div className={containerClasses}>
      {/* Loading skeleton */}
      {skeleton && isLoading && !error && (
        <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-dark-surface" />
      )}

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 dark:bg-dark-surface">
          <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* Image */}
      {imageSrc && !error && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy ? 'lazy' : 'eager'}
          {...props}
        />
      )}

      {/* Placeholder for lazy loading */}
      {!imageSrc && lazy && !error && <div ref={imgRef} className="absolute inset-0" />}
    </div>
  );
};
