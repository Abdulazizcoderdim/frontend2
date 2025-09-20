import MaxWidth from "@/components/max-width";
import { aboutItem, personItems } from "@/constants";
import { Link } from "react-router-dom";
import { A11y, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { t } from "@/lib/translate";
import { useLangStore } from "@/store/languageStore";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const About = () => {
  const { lang } = useLangStore();

  return (
    <MaxWidth className="py-20 sm:space-y-20 space-y-10">
      <div className="flex items-center gap-3">
        <Link to={"/"} className="font-normal text-sm text-zinc-400">
          {t({ uz: "Bosh sahifa", ru: "Главная", en: "Home" })}
        </Link>{" "}
        /{" "}
        <span className="text-black font-normal text-sm cursor-pointer">
          {t({ uz: "Biz haqimizda", ru: "О нас", en: "About" })}
        </span>
      </div>

      <div className="flex max-md:flex-col items-center gap-10">
        <div className="space-y-8 md:w-1/2">
          <h1 className="font-semibold sm:text-[54px] text-4xl">
            {t({
              uz: "Bizning hikoyamiz",
              ru: "Наша история",
              en: "Our Story",
            })}
          </h1>
          <p className="font-normal text-base">
            {t({
              uz: "2015-yilda ishga tushirilgan Exclusive Janubiy Osiyodagi yetakchi onlayn bozor bo‘lib, Bangladeshta faoliyat yuritadi. Keng qamrovli marketing, ma’lumot va xizmat yechimlari bilan Exclusive 10 500 sotuvchi va 300 brendga ega hamda butun mintaqada 3 million mijozga xizmat ko‘rsatadi.",
              ru: "Запущенный в 2015 году, Exclusive является ведущей онлайн-площадкой Южной Азии с активным присутствием в Бангладеш. Благодаря широкому спектру маркетинговых, аналитических и сервисных решений, Exclusive объединяет 10 500 продавцов и 300 брендов и обслуживает 3 миллиона клиентов по всему региону.",
              en: "Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.",
            })}
          </p>
          <p className="font-normal text-base">
            {t({
              uz: "Exclusive’da 1 milliondan ortiq mahsulot mavjud bo‘lib, juda tez o‘sib bormoqda. Exclusive turli kategoriyalarda keng tanlovni taklif etadi.",
              ru: "Exclusive предлагает более 1 миллиона товаров, и ассортимент быстро растет. Exclusive предлагает разнообразные категории для покупателей.",
              en: "Exclusive has more than 1 Million products to offer, growing very fast. Exclusive offers a diverse assortment in categories ranging from consumer goods.",
            })}
          </p>
        </div>
        <div className="md:w-1/2">
          <img src="/about.png" className="object-cover" alt="" />
        </div>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
        {aboutItem[lang].map((item, i) => (
          <div
            key={i}
            className="border py-6 hover:bg-red hover:text-white transition cursor-pointer rounded-md flex flex-col items-center justify-center"
          >
            <img src="/s1.svg" alt="" />
            <h1 className="font-bold text-[32px]">{item.count}</h1>
            <p className="font-normal text-base">{item.title}</p>
          </div>
        ))}
      </div>

      <Swiper
        className=""
        modules={[Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
        }}
        pagination={{ clickable: true }}
      >
        {personItems.map((item, i) => (
          <SwiperSlide key={i} className="space-y-1 pb-14">
            <div className="bg-[#F5F5F5] h-[430px] flex justify-center items-end w-full space-y-3">
              <img src={item.image} className="object-contain" alt="" />
            </div>
            <h1 className="font-medium text-[32px]">{item.name}</h1>
            <p className="font-normal text-base">{item.title}</p>
            <div className="flex items-center gap-2 pt-2">
              <Link to={item.hrefTwitter}>
                <item.twitter className="w-5 h-5" />
              </Link>
              <Link to={item.hrefInstagram}>
                <item.instagram className="w-5 h-5" />
              </Link>
              <Link to={item.hrefLinkedin}>
                <item.linkedin className="w-5 h-5" />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="sm:py-28 py-10 flex justify-center items-center">
        <div className="flex max-sm:flex-col items-center gap-16 text-black">
          <div className="flex flex-col gap-2 text-center justify-center">
            <img className="w-20 h-20 mx-auto" src="/icon1.png" alt="" />
            <p className="font-semibold md:text-xl text-base">
              {t({
                uz: "TEKIN VA TEZ YETKAZIB BERISH",
                ru: "БЕСПЛАТНАЯ И БЫСТРАЯ ДОСТАВКА",
                en: "FREE AND FAST DELIVERY",
              })}
            </p>
            <p className="font-normal text-sm">
              {t({
                uz: "140$ dan yuqori barcha buyurtmalar uchun bepul yetkazib berish",
                ru: "Бесплатная доставка для всех заказов свыше 140$",
                en: "Free delivery for all orders over $140",
              })}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-center justify-center">
            <img className="w-20 h-20 mx-auto" src="/icon2.png" alt="" />
            <p className="font-semibold md:text-xl text-base">
              {t({
                uz: "24/7 MIJOZLAR XIZMATI",
                ru: "КРУГЛОСУТОЧНАЯ ПОДДЕРЖКА",
                en: "24/7 CUSTOMER SERVICE",
              })}
            </p>
            <p className="font-normal text-sm">
              {t({
                uz: "Do‘stona 24/7 mijozlarni qo‘llab-quvvatlash",
                ru: "Дружелюбная поддержка клиентов 24/7",
                en: "Friendly 24/7 customer support",
              })}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-center justify-center">
            <img className="w-20 h-20 mx-auto" src="/icon3.png" alt="" />
            <p className="font-semibold md:text-xl text-base">
              {t({
                uz: "PUL QAYTARISH KAFOLATI",
                ru: "ГАРАНТИЯ ВОЗВРАТА ДЕНЕГ",
                en: "MONEY BACK GUARANTEE",
              })}
            </p>
            <p className="font-normal text-sm">
              {t({
                uz: "Biz 30 kun ichida pulni qaytaramiz",
                ru: "Мы возвращаем деньги в течение 30 дней",
                en: "We return money within 30 days",
              })}
            </p>
          </div>
        </div>
      </div>
    </MaxWidth>
  );
};

export default About;
