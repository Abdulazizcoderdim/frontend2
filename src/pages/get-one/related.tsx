import ProductItem from "@/components/product-item/ProductItem";
import { Skeleton } from "@/components/ui/skeleton";
import $axios from "@/http";
import { t } from "@/lib/translate";
import { IPagination, IProduct } from "@/type";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Reletaed = ({ slug }: { slug: string | undefined }) => {
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    try {
      const { data }: { data: { data: IProduct[]; pagination: IPagination } } =
        await $axios.get("/products/category/" + slug + "?limit=" + 10);

      if (!data) {
        throw new Error("Ma'lumotlarni olishda xatolik yuz berdi");
      }

      setRelatedProducts(data.data);
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 space-y-14">
      <div className="flex items-center gap-3">
        <div className="w-[20px] h-[40px] rounded-md bg-red" />
        <p className="text-red font-semibold text-base">
          {t({
            uz: "Tegishli mahsulot",
            ru: "Похожие товары",
            en: "Related Item",
          })}
        </p>
      </div>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
        }}
        className="min-h-[350px]"
      >
        {relatedProducts.map((product, i) => {
          return !loading ? (
            <SwiperSlide key={i} className="min-h-[350px]">
              <ProductItem product={product} />
            </SwiperSlide>
          ) : (
            <div className="flex items-center gap-5">
              {relatedProducts.map((_, i) => (
                <Skeleton key={i} className="w-[270px] h-[150px]" />
              ))}
            </div>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Reletaed;
