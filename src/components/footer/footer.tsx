import { t } from "@/lib/translate";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { VscSend } from "react-icons/vsc";
import { Link } from "react-router-dom";
import MaxWidth from "../max-width";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <MaxWidth className="py-20 grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5">
        <div className="flex flex-col gap-4">
          <p className="font-medium text-xl">Exclusive</p>
          <p className="font-normal text-base">
            {t({ uz: "Obuna bo‘ling", ru: "Подписка", en: "Subscribe" })}
          </p>
          <p className="font-normal text-base">
            {t({
              uz: "Birinchi buyurtmangizga 10% chegirma oling",
              ru: "Получите 10% скидку на первый заказ",
              en: "Get 10% off your first order",
            })}
          </p>

          <div className="flex items-center px-2 py-2 border-2 rounded-md border-white">
            <input
              type="text"
              placeholder={t({
                uz: "Emailingizni kiriting",
                ru: "Введите вашу почту",
                en: "Enter your email",
              })}
              className="border-none w-full h-full outline-none bg-transparent placeholder:text-white/50"
            />
            <button title={t({ uz: "Yuborish", ru: "Отправить", en: "Send" })}>
              <VscSend className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-medium text-xl">
            {t({ uz: "Qo‘llab-quvvatlash", ru: "Поддержка", en: "Support" })}
          </p>
          <p className="font-normal text-base">
            111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.
          </p>
          <Link to={"#"} className="font-normal text-base">
            exclusive@gmail.com
          </Link>
          <Link to={"#"} className="font-normal text-base">
            +88015-88888-9999
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-medium text-xl">
            {t({
              uz: "Mening akkauntim",
              ru: "Мой аккаунт",
              en: "My Account",
            })}
          </p>
          <Link to={"#"} className="font-normal text-base">
            {t({
              uz: "Kirish / Ro‘yxatdan o‘tish",
              ru: "Вход / Регистрация",
              en: "Login / Register",
            })}
          </Link>
          <Link to={"#"} className="font-normal text-base">
            {t({ uz: "Savatcha", ru: "Корзина", en: "Cart" })}
          </Link>
          <Link to={"#"} className="font-normal text-base">
            {t({
              uz: "Istaklar ro‘yxati",
              ru: "Список желаний",
              en: "Wishlist",
            })}
          </Link>
          <Link to={"#"} className="font-normal text-base">
            {t({ uz: "Do‘kon", ru: "Магазин", en: "Shop" })}
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-medium text-xl">
            {t({
              uz: "Tezkor havolalar",
              ru: "Быстрые ссылки",
              en: "Quick Link",
            })}
          </p>
          <Link to={"#"} className="font-normal text-base">
            {t({
              uz: "Maxfiylik siyosati",
              ru: "Политика конфиденциальности",
              en: "Privacy Policy",
            })}
          </Link>
          <Link to={"#"} className="font-normal text-base">
            {t({
              uz: "Foydalanish shartlari",
              ru: "Условия использования",
              en: "Terms Of Use",
            })}
          </Link>
          <Link to={"#"} className="font-normal text-base">
            {t({ uz: "FAQ", ru: "Вопросы и ответы", en: "FAQ" })}
          </Link>
          <Link to={"#"} className="font-normal text-base">
            {t({ uz: "Bog‘lanish", ru: "Контакты", en: "Contact" })}
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-medium text-xl">
            {t({
              uz: "Ilovani yuklab oling",
              ru: "Скачать приложение",
              en: "Download App",
            })}
          </p>
          <p className="font-medium text-base">
            {t({
              uz: "Faqat yangi foydalanuvchilar uchun ilova orqali $3 tejang",
              ru: "Сэкономьте $3 только для новых пользователей приложения",
              en: "Save $3 with App New User Only",
            })}
          </p>
          <div className="flex items-center gap-3">
            <Link to={"#"}>
              <img src="/qr.png" className="w-20 h-20 cursor-pointer" alt="" />
            </Link>
            <div className="flex flex-col gap-4">
              <Link to={"#"}>
                <img
                  src="/app.png"
                  className="h-[30px] cursor-pointer"
                  alt=""
                />
              </Link>
              <Link to={"#"}>
                <img
                  src="/app2.png"
                  className="h-[30px] cursor-pointer"
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Link to={"#"}>
              <Facebook />
            </Link>
            <Link to={"#"}>
              <Twitter />
            </Link>
            <Link to={"#"}>
              <Instagram />
            </Link>
            <Link to={"#"}>
              <Linkedin />
            </Link>
          </div>
        </div>
      </MaxWidth>

      <div className="border-t border-white/40 text-white/40 py-5 text-center">
        <p className="max-sm:text-sm">
          {t({
            uz: `© Mualliflik huquqi Rimel ${new Date().getFullYear()}. Barcha huquqlar himoyalangan`,
            ru: `© Авторские права Rimel ${new Date().getFullYear()}. Все права защищены`,
            en: `© Copyright Rimel ${new Date().getFullYear()}. All right reserved`,
          })}
        </p>
      </div>
    </div>
  );
};

export default Footer;
