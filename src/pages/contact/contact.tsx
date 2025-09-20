import MaxWidth from "@/components/max-width";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { t } from "@/lib/translate";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <MaxWidth className="py-20 space-y-10">
      <div className="flex items-center gap-3 mb-20">
        <Link to={"/"} className="font-normal text-sm text-zinc-400">
          {t({ uz: "Bosh sahifa", ru: "Главная", en: "Home" })}
        </Link>
        /
        <span className="text-black font-normal text-sm cursor-pointer">
          {t({ uz: "Aloqa", ru: "Контакт", en: "Contact" })}
        </span>
      </div>

      <div className="flex gap-5 max-md:flex-col">
        <div className="md:w-1/3 shadow-lg p-5 space-y-5">
          <div className="flex items-center gap-2">
            <img src="/call-icon.png" className="w-10 h-10" alt="" />
            <p className="font-medium text-base">
              {t({
                uz: "Bizga qo‘ng‘iroq qiling",
                ru: "Позвоните нам",
                en: "Call To Us",
              })}
            </p>
          </div>
          <p className="font-normal text-sm">
            {t({
              uz: "Biz 24/7, haftaning har kuni ishlaymiz.",
              ru: "Мы доступны 24/7, 7 дней в неделю.",
              en: "We are available 24/7, 7 days a week.",
            })}
          </p>
          <p className="font-normal text-sm">
            {t({
              uz: "Telefon: +8801611112222",
              ru: "Телефон: +8801611112222",
              en: "Phone: +8801611112222",
            })}
          </p>
          <div className="h-0.5 bg-black w-full" />
          <div className="flex items-center gap-2">
            <img src="/icons-mail.png" className="w-10 h-10" alt="" />
            <p className="font-medium text-base">
              {t({ uz: "Bizga yozing", ru: "Напишите нам", en: "Write To Us" })}
            </p>
          </div>
          <p className="font-normal text-sm">
            {t({
              uz: "Formani to‘ldiring va biz 24 soat ichida siz bilan bog‘lanamiz.",
              ru: "Заполните форму, и мы свяжемся с вами в течение 24 часов.",
              en: "Fill out our form and we will contact you within 24 hours.",
            })}
          </p>
          <p className="font-normal text-sm">
            {t({
              uz: "Email: customer@exclusive.com",
              ru: "Эл. почта: customer@exclusive.com",
              en: "Emails: customer@exclusive.com",
            })}
          </p>
        </div>
        <div className="w-full shadow-lg p-5 space-y-6">
          <div className="flex max-sm:flex-wrap items-center gap-5">
            <Input
              className="w-full bg-[#F5F5F5]"
              placeholder={t({
                uz: "Ismingiz",
                ru: "Ваше имя",
                en: "Your Name",
              })}
            />
            <Input
              className="w-full bg-[#F5F5F5]"
              placeholder={t({
                uz: "Emailingiz",
                ru: "Ваш email",
                en: "Your Email",
              })}
            />
            <Input
              className="w-full bg-[#F5F5F5]"
              placeholder={t({
                uz: "Telefoningiz",
                ru: "Ваш телефон",
                en: "Your Phone",
              })}
            />
          </div>
          <Textarea
            className="w-full bg-[#F5F5F5] min-h-[207px]"
            placeholder={t({
              uz: "Xabaringiz",
              ru: "Ваше сообщение",
              en: "Your Message",
            })}
          />
          <div className="flex justify-end">
            <Button size={"lg"} variant={"destructive"}>
              {t({
                uz: "Xabar yuborish",
                ru: "Отправить сообщение",
                en: "Send Message",
              })}
            </Button>
          </div>
        </div>
      </div>
    </MaxWidth>
  );
};

export default Contact;
