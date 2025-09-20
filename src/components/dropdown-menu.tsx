import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import $axios from "@/http";
import { IUser } from "@/interfaces";
import { t } from "@/lib/translate";
import { authStore } from "@/store/auth.store";
import { CircleX, LogOut, ShoppingBag, Star, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DropdownMenuUser = () => {
  const { setIsAuth, setIsUser } = authStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await $axios.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      localStorage.removeItem("accessToken");
      setIsAuth(false);

      setIsUser({} as IUser);

      navigate("/sign-up");

      toast.success("Muvaffaqiyatli chiqish");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="w-8 h-8 cursor-pointer bg-red rounded-full text-white flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-none bg-opacity-85 backdrop-blur-sm bg-zinc-500 text-white"
      >
        <DropdownMenuItem className="cursor-pointer">
          <Link className="flex items-center" to={"/account"}>
            <User className="w-4 h-4 mr-2" />
            {t({
              uz: "Hisobimni boshqarish",
              ru: "Управление аккаунтом",
              en: "Manage My Account",
            })}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center cursor-pointer">
          <ShoppingBag className="w-4 h-4 mr-2" />
          {t({ uz: "Mening buyurtmalarim", ru: "Мои заказы", en: "My Order" })}
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <CircleX className="w-4 h-4 mr-2" />
          {t({
            uz: "Mening bekor qilganlarim",
            ru: "Мои отмены",
            en: "My Cancellations",
          })}
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <Star className="w-4 h-4 mr-2" />
          {t({ uz: "Mening sharhlarim", ru: "Мои отзывы", en: "My Reviews" })}
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          <LogOut className="w-4 h-4 mr-2" />
          {t({ uz: "Chiqish", ru: "Выйти", en: "Logout" })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuUser;
