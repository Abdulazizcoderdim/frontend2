import { IProduct } from "@/type";
import "swiper/css";
import "swiper/css/navigation";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "../product-item/ProductItem";

const NewsProduct = ({
  todayProduct,
  loading,
}: {
  todayProduct: IProduct[];
  loading: boolean;
}) => {
  return (
    <div className="pt-10">
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
        {loading && <p>Loading...</p>}

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

export default NewsProduct;
