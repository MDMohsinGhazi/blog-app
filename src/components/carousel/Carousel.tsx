'use client';

import React from 'react';
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './Carousel.css';
import Link from 'next/link';

interface PropsInterface {
    posts: Post[];
}

const Carousel: React.FC<PropsInterface> = ({ posts }) => {
    return (
        <div className="py-1 mx-4 bg-white rounded-lg border border-gray-200">
            <Swiper
                modules={[Navigation, A11y]}
                spaceBetween={30}
                slidesPerView={3}
                navigation
                speed={600}
                loop={true}
                centeredSlides={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                {posts.map((post) => (
                    <SwiperSlide key={post.id}>
                        <SlideItem post={post} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

interface SlideItem {
    post: Post;
}

const SlideItem: React.FC<SlideItem> = ({ post }) => {
    return (
        <Link className="relative cursor-pointer " href={`/blog/${post.id}`}>
            <img src={post.imageUrl} alt="Movie 1" />
            <div className="absolute bottom-0 left-0 h-10 w-full bg-black/40 p-4 rounded-b-lg">
                <h1 className="text-white text-[0.5rem] opacity-80 font-semibold line-clamp-2">{post.title}</h1>
            </div>
        </Link>
    );
};

export default Carousel;
