import $axios from "@/http";
import { ICategory } from "@/type";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { A11y, Navigation, Pagination } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";

const Categories = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<ICategory[]>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data }: { data: { data: ICategory[] } } = await $axios.get(
        "/category"
      );

      if (!data) {
        throw new Error("Ma'lumotlarni olishda xatolik yuz berdi");
      }

      setCategory(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 mt-20 border-b pb-20">
      <div className="flex items-center gap-3">
        <div className="w-[20px] h-[40px] rounded-md bg-red" />
        <p className="text-red font-semibold text-base">Categories</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-28">
          <p className="text-black font-semibold sm:text-4xl text-2xl">
            Browse By Category
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            title="swiper-prev"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="xs:p-3 p-2 rounded-full bg-[#F5F5F5] text-black cursor-pointer"
          >
            <ArrowLeft />
          </button>
          <button
            title="swiper-next"
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="xs:p-3 p-2 rounded-full bg-[#F5F5F5] text-black cursor-pointer"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={5}
        loop={true}
        className="h-full"
      >
        {loading
          ? "Loading.."
          : category?.map((item, i) => {
              return (
                <SwiperSlide
                  key={i}
                  onClick={() => navigate(`/category/${item.slug}`)}
                  className="min-h-[145px] min-w-[170px] rounded-md hover:bg-red transition-all duration-300 hover:text-white flex items-center justify-center border cursor-pointer"
                >
                  <div className="flex flex-col space-y-3 h-full">
                    <p className="font-normal text-lg">{item.name}</p>
                  </div>
                </SwiperSlide>
              );
            })}
      </Swiper>
    </div>
  );
};

export default Categories;
