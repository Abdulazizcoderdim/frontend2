import { IProduct } from "@/type";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "../product-item/ProductItem";
import ProductSkeleton from "../ProductSkeleton";
import { Button } from "../ui/button";

const OurProducts = ({
  todayProduct,
  loading,
}: {
  todayProduct: IProduct[];
  loading: boolean;
}) => {
  const swiperRef = useRef<SwiperRef>(null);

  return (
    <div className="space-y-6 mt-20">
      <div className="flex items-center gap-3">
        <div className="w-[20px] h-[40px] rounded-md bg-red" />
        <p className="text-red font-semibold text-base">Our Products</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-28">
          <p className="text-black font-semibold md:text-4xl sm:text-2xl text-xl">
            Explore Our Products
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            title="swiper-prev"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="sm:p-3 p-2 rounded-full bg-[#F5F5F5] text-black cursor-pointer"
          >
            <ArrowLeft />
          </button>
          <button
            title="swiper-next"
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="sm:p-3 p-2 rounded-full bg-[#F5F5F5] text-black cursor-pointer"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Autoplay, Pagination, A11y]}
        spaceBetween={30}
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
        }}
        className="min-h-[350px]"
      >
        {loading && (
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {todayProduct.map((product, i) => {
          return (
            <SwiperSlide key={i} className="min-h-[350px]">
              <ProductItem product={product} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* <NewsProduct todayProduct={todayProduct} loading={loading} /> */}

      <div className="py-14 flex items-center justify-center">
        <Button
          asChild
          variant={"destructive"}
          className="font-medium text-base"
        >
          <Link to="/shop">View All Products</Link>
        </Button>
      </div>
    </div>
  );
};

export default OurProducts;
