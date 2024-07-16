// FallbackImage.tsx

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

interface FallbackImageProps {
  src: string; // Primary image URL
  alt: string; // Alt text for accessibility
  className?: string; // Optional className for additional styling
  width: number; // Width of the image
  height: number; // Height of the image
}

const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
}) => {

  const [fallbackImageShown, setFallbackImageShown] = useState(false);

  const handleImageError = () => {
    setFallbackImageShown(true); // Set state to show fallback image
  };

  return (
    <Link href="/">
      <div className={`cursor-pointer ${className}`}>
        <Image
          alt={alt}
          src={fallbackImageShown ? "/user_profile.jpeg" : src} // Use fallback if primary image fails
          width={width}
          height={height}
          className={className}

          onError={handleImageError} // Handle image loading errors
        />
      </div>
    </Link>
  );
};

export default FallbackImage;
