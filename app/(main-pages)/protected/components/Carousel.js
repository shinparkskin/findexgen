'use client'
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import Link from 'next/link';
function Carousel({data}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const numberOfCards = 4;

  // const dummyData = [
  //   { id: 1, content: 'Item 1' },
  //   { id: 2, content: 'Item 2' },
  //   { id: 3, content: 'Item 3' },
  //   { id: 4, content: 'Item 4' },
  //   { id: 5, content: 'Item 5' },
  //   { id: 6, content: 'Item 6' },
  //   { id: 7, content: 'Item 6' },
  //   { id: 8, content: 'Item 6' },

  // ];

  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();

    const autoScroll = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(autoScroll);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative my-5">
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex gap-5">
          {data?.map((item) => (
            <div 
              className="flex-none w-full sm:w-1/4"
              key={item.id}
            >
              <Link target="_blank" href={item.url}>
              <Card className="py-4 shadow-none border-1 border-gray-200 flex flex-col justify-center items-center text-center">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-center text-center">
                  
                  
                  <h4 className="font-bold text-2xl line-clamp-2">{item.title}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2 flex justify-center items-center">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={item.imageurl}
                    width={300}
                    height={300}
                  />
                </CardBody>
              </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div
        className="absolute top-1/2 transform -translate-y-1/2 left-2 text-2xl bg-gray-100 border-1 border-gray-500 rounded-full w-8 h-8 flex justify-center items-center cursor-pointer"
        onClick={() => emblaApi.scrollPrev()}
      >
        <FaChevronLeft className="text-medium text-gray-500"></FaChevronLeft>
      </div>
      <div
        className="absolute top-1/2 transform -translate-y-1/2 right-2 text-2xl bg-gray-100 border-1 border-gray-500 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer"
        onClick={() => emblaApi.scrollNext()}
      >
        <FaChevronRight className="text-medium text-gray-500"></FaChevronRight>
      </div>
      <div className="flex justify-center mt-2">
        {data?.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${index === selectedIndex ? 'bg-black' : 'bg-gray-400'}`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;