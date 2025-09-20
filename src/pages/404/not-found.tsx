import MaxWidth from "@/components/max-width";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/translate";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <MaxWidth className="py-20 space-y-10">
      <div className="flex items-center gap-3 mb-20">
        <Link to={"/"} className="font-normal text-sm text-zinc-400">
          {t({ uz: "Bosh sahifa", ru: "Главная", en: "Home" })}
        </Link>
        /
        <span className="text-black font-normal text-sm cursor-pointer">
          404 {t({ uz: "Xato", ru: "Ошибка", en: "Error" })}
        </span>
      </div>

      <div className="flex flex-col h-full space-y-10 items-center justify-center text-center">
        <h1 className="font-medium md:text-[110px] sm:text-5xl text-3xl">
          404 {t({ uz: "Topilmadi", ru: "Не найдено", en: "Not Found" })}
        </h1>
        <p className="text-base font-normal">
          {t({
            uz: "Siz tashrif buyurgan sahifa topilmadi. Bosh sahifaga qaytishingiz mumkin.",
            ru: "Посещенная вами страница не найдена. Вы можете вернуться на главную страницу.",
            en: "The page you visited was not found. You may go to the home page.",
          })}
        </p>
        <div>
          <Button variant={"destructive"} size={"lg"}>
            <Link to={"/"}>
              {t({
                uz: "Bosh sahifaga qaytish",
                ru: "Вернуться на главную",
                en: "Back to home page",
              })}
            </Link>
          </Button>
        </div>
      </div>
    </MaxWidth>
  );
};

export default NotFoundPage;
