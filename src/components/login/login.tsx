import { IUser } from "@/interfaces";
import { t } from "@/lib/translate";
import { authSchema } from "@/lib/validation";
import { loginUser } from "@/service/user";
import { authStore } from "@/store/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsAuth, setIsUser } = authStore();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof authSchema>) {
    const info = {
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    try {
      const res = await loginUser(info);
      if (!res) throw new Error("Login failed");

      setIsUser(res?.user as IUser);

      setIsAuth(true);
      localStorage.setItem("accessToken", res?.accessToken as string);

      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
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
              uz: "Exclusive saytiga kiring",
              ru: "Войти в Exclusive",
              en: "Log in to Exclusive",
            })}
          </h1>
          <p className="font-normal text-base w-fit">
            {t({
              uz: "Quyidagi ma'lumotlarni kiriting",
              ru: "Введите свои данные ниже",
              en: "Enter your details below",
            })}
          </p>

          {/* Email */}
          <div className="flex flex-col">
            <input
              {...form.register("email", { required: true })}
              className="border-b-2 border-zinc-300 placeholder:text-zinc-400 pb-2 outline-none bg-transparent"
              type="text"
              placeholder={t({ uz: "Email", ru: "Эл. почта", en: "Email" })}
            />
            {form.formState.errors.email && (
              <span className="text-red text-start text-xs">
                {t({
                  uz: "Email talab qilinadi",
                  ru: "Требуется эл. почта",
                  en: "Email is required",
                })}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <input
              {...form.register("password", { required: true })}
              className="border-b-2 border-zinc-300 placeholder:text-zinc-400 pb-2 outline-none bg-transparent"
              type="password"
              placeholder={t({ uz: "Parol", ru: "Пароль", en: "Password" })}
            />
            {form.formState.errors.password && (
              <span className="text-red text-start text-xs">
                {t({
                  uz: "Parol talab qilinadi",
                  ru: "Требуется пароль",
                  en: "Password is required",
                })}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <Button
              disabled={loading}
              type="submit"
              variant={"destructive"}
              size={"lg"}
            >
              {loading
                ? t({
                    uz: "Yuklanmoqda...",
                    ru: "Загрузка...",
                    en: "Loading...",
                  })
                : t({ uz: "Kirish", ru: "Войти", en: "Log In" })}
            </Button>

            <Button asChild variant={"link"}>
              <Link to={"#"} className="text-red font-normal text-base">
                {t({
                  uz: "Parolni unutdingiz?",
                  ru: "Забыли пароль?",
                  en: "Forgot Password?",
                })}
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
