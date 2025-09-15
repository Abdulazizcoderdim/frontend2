import Categories from "@/components/category/categories";
import Featured from "@/components/featured/featured";
import MaxWidth from "@/components/max-width";
import ThisMonth from "@/components/month/this-month";
import OurProducts from "@/components/our_products/our-products";
import TimeCategories from "@/components/time-categories";
import TodayProduct from "@/components/today's/today-product";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import $axios from "@/http";
import { ICategory, IProduct } from "@/type";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeSlider from "./home-slider";

const Home = () => {
  const [category, setCategory] = useState<ICategory[]>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);

  useEffect(() => {
    fetchData();
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      setLoadingCategory(true);
      const { data }: { data: { data: ICategory[] } } = await $axios.get(
        "/category" + "?limit=9"
      );

      if (!data) {
        throw new Error("Ma'lumotlarni olishda xatolik yuz berdi");
      }

      setCategory(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCategory(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data }: { data: { data: IProduct[] } } = await $axios.get(
        "/products"
      );

      if (!data) {
        throw new Error("Ma'lumotlarni olishda xatolik yuz berdi");
      }

      setProducts(data.data);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MaxWidth>
      <div className="flex mb-16">
        <div className="max-[805px]:hidden w-1/3 pt-7 pr-2 border-r">
          <div className="flex flex-col">
            {loadingCategory
              ? Array.from({ length: 10 }).map((_, i) => (
                  <Skeleton className="h-7 w-full rounded-md mb-2" key={i} />
                ))
              : category?.map((item, i) => (
                  <Button
                    asChild
                    variant={"ghost"}
                    key={i}
                    className="flex text-black items-center cursor-pointer justify-between"
                  >
                    <Link
                      to={`/category/${item.slug}`}
                      className="font-normal text-base"
                    >
                      {item.name}
                    </Link>
                  </Button>
                ))}
          </div>
        </div>
        <div className="max-[805px]:w-full xl:max-w-[892px] lg:max-w-3xl min-[805px]:max-w-xl w-full min-[805px]:px-7 h-full pt-7">
          <HomeSlider />
        </div>
      </div>

      <TodayProduct todayProduct={products} loading={loading} />

      <Categories />

      <ThisMonth todayProduct={products} loading={loading} />

      {/* categories */}
      <div className="sm:mt-20 max-sm:relative mt-10 bg-black sm:p-10 max-sm:py-14 p-2.5">
        <div className="flex justify-between items-center">
          <div className="sm:w-1/2 z-10 sm:space-y-8 space-y-5">
            <h3 className="font-semibold text-base text-[#00FF66]">
              Categories
            </h3>
            <p className="font-semibold md:text-5xl sm:text-3xl text-xl text-white">
              Enhance Your Music Experience
            </p>
            <div className="flex items-center">
              <TimeCategories daysToCount={4} />
            </div>
            <Button variant={"ghost"} className="bg-[#00FF66] text-white px-7">
              Buy Now!
            </Button>
          </div>
          <div className="sm:w-1/2 max-sm:absolute ">
            <img src="11.png" className="sahdow-image object-cover" alt="" />
          </div>
        </div>
      </div>

      {/* our products */}
      <OurProducts todayProduct={products} loading={loading} />

      {/* Featured */}
      <Featured />

      <div className="sm:py-28 py-10 flex justify-center items-center">
        <div className="flex max-sm:flex-col items-center gap-16 text-black">
          <div className="flex flex-col gap-2 text-center justify-center">
            <img className="w-20 h-20 mx-auto" src="/icon1.png" alt="" />
            <p className="font-semibold md:text-xl text-base">
              FREE AND FAST DELIVERY
            </p>
            <p className="font-normal text-sm">
              Free delivery for all orders over $140
            </p>
          </div>
          <div className="flex flex-col gap-2 text-center justify-center">
            <img className="w-20 h-20 mx-auto" src="/icon2.png" alt="" />
            <p className="font-semibold md:text-xl text-base">
              24/7 CUSTOMER SERVICE
            </p>
            <p className="font-normal text-sm">
              Friendly 24/7 customer support
            </p>
          </div>
          <div className="flex flex-col gap-2 text-center justify-center">
            <img className="w-20 h-20 mx-auto" src="/icon3.png" alt="" />
            <p className="font-semibold md:text-xl text-base">
              MONEY BACK GUARANTEE
            </p>
            <p className="font-normal text-sm">We reurn money within 30 days</p>
          </div>
        </div>
      </div>
    </MaxWidth>
  );
};

export default Home;
