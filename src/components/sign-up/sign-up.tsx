import { IUser } from "@/interfaces";
import { t } from "@/lib/translate";
import { registerSchema } from "@/lib/validation";
import { registerUser } from "@/service/user";
import { authStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuth, setIsUser } = authStore();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", username: "" },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const registerInfoUser = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    try {
      const res = await registerUser(registerInfoUser);
      if (!res) throw new Error("Register failed");
      toast.success("Register successful");

      setIsUser(res?.user as IUser);
      setIsAuth(true);
      localStorage.setItem("accessToken", res?.accessToken as string);

      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-14 max-sm:px-5 mb-10 flex items-center max-md:justify-center md:justify-between">
      {/* Left image */}
      <div className="md:w-1/2 max-md:hidden">
        <img className="w-full h-full object-cover" src="/sign-up.png" alt="" />
      </div>

      {/* Right form */}
      <div className="md:w-1/2 flex justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex md:max-w-sm space-y-5 w-full flex-col text-center"
        >
          <h1 className="font-medium sm:text-4xl text-3xl w-fit">
            {t({
              uz: "Hisob yaratish",
              ru: "Создать аккаунт",
              en: "Create an account",
            })}
          </h1>
          <p className="font-normal text-base w-fit">
            {t({
              uz: "Quyidagi ma'lumotlarni kiriting",
              ru: "Введите свои данные ниже",
              en: "Enter your details below",
            })}
          </p>

          {/* Username */}
          <div>
            <input
              {...form.register("username")}
              className="border-b-2 w-full border-zinc-300 placeholder:text-zinc-400 pb-2 outline-none bg-transparent"
              type="text"
              placeholder={t({ uz: "Ism", ru: "Имя", en: "Name" })}
            />
            {form.formState.errors.username && (
              <span className="text-red flex text-start text-xs">
                {form.formState.errors.username.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...form.register("email")}
              className="border-b-2 w-full border-zinc-300 placeholder:text-zinc-400 pb-2 outline-none bg-transparent"
              type="text"
              placeholder={t({ uz: "Email", ru: "Эл. почта", en: "Email" })}
            />
            {form.formState.errors.email && (
              <span className="text-red flex text-start text-xs">
                {form.formState.errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              {...form.register("password")}
              className="border-b-2 w-full border-zinc-300 placeholder:text-zinc-400 pb-2 outline-none bg-transparent"
              type="password"
              placeholder={t({ uz: "Parol", ru: "Пароль", en: "Password" })}
            />
            {form.formState.errors.password && (
              <span className="text-red flex text-start text-xs">
                {form.formState.errors.password.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <Button
            disabled={loading}
            type="submit"
            variant={"destructive"}
            size={"lg"}
          >
            {loading
              ? t({ uz: "Yuklanmoqda...", ru: "Загрузка...", en: "Loading..." })
              : t({
                  uz: "Hisob yaratish",
                  ru: "Создать аккаунт",
                  en: "Create Account",
                })}
          </Button>

          {/* Login link */}
          <p className="flex items-center justify-center w-full gap-3">
            {t({
              uz: "Allaqachon hisobingiz bormi?",
              ru: "Уже есть аккаунт?",
              en: "Already have an account?",
            })}
            <Link to={"/login"} className="underline">
              {t({ uz: "Kirish", ru: "Войти", en: "Log in" })}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
