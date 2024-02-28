"use client"

import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const heroImages=[
  {
    imgurl: '/assets/images/hero-1.svg',
    alt: 'smartwatch'
  },
  {
    imgurl: '/assets/images/hero-2.svg',
    alt: 'bag'
  },
  {
    imgurl: '/assets/images/hero-3.svg',
    alt: 'lamp'
  },
  {
    imgurl: '/assets/images/hero-4.svg',
    alt: 'air fryer'
  },
  {
    imgurl: '/assets/images/hero-5.svg',
    alt: 'chair'
  }
]

const Herocarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image
            src={image.imgurl}
            alt={image.alt}
            width={480}
            height={480}
            className="object-contain"
            key={image.alt}
          />
        ))}
      </Carousel>

      <Image 
        src='assets/icons/hand-drawn-arrow.svg'
        alt='arrow'
        width={180}
        height={180}
        className="max-xl:hidden absolute -left-[15%] bottom-0 z-0"
      />

    </div>
  )
}

export default Herocarousel