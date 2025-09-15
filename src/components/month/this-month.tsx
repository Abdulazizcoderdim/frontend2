import { IProduct } from "@/type";
import "swiper/css";
import "swiper/css/navigation";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "../product-item/ProductItem";
import ProductSkeleton from "../ProductSkeleton";
import { Button } from "../ui/button";

const ThisMonth = ({
  todayProduct,
  loading,
}: {
  todayProduct: IProduct[];
  loading: boolean;
}) => {
  return (
    <div className="space-y-10 mt-20">
      <div className="flex items-center gap-3">
        <div className="w-[20px] h-[40px] rounded-md bg-red" />
        <p className="text-red font-semibold text-base">This Month</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-28">
          <p className="text-black font-semibold sm:text-4xl text-2xl">
            Best Selling Products
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={"destructive"} className="font-medium text-base">
            View All
          </Button>
        </div>
      </div>
      <Swiper
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
    </div>
  );
};

export default ThisMonth;
