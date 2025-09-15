import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import $axios from "@/http";
import { billingSchema } from "@/lib/validation";
import { IProduct } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import MaxWidth from "./max-width";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

type BillingFormValues = z.infer<typeof billingSchema>;

const BuyNow = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<IProduct>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
  });

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data }: { data: IProduct } = await $axios.get(
        `/products/${slug}`
      );

      if (!data) {
        throw new Error("Ma'lumotlarni olishda xatolik yuz berdi");
      }

      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: BillingFormValues) => {
    try {
      setLoading(true);
      const products = [
        {
          productId: product?._id,
          quantity: 1,
          price: product?.price,
        },
      ];

      const payload = {
        products,
        billingDetails: {
          firstName: data.billingDetails.firstName,
          streetAddress: data.billingDetails.streetAddress,
          city: data.billingDetails.city,
          phone: data.billingDetails.phone,
          email: data.billingDetails.email,
        },
      };

      const res = await $axios.post("/customer/orders", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!res.data) {
        throw new Error("Buyurtma muvaffaqiyatli qabul qilinmadi!");
      }

      toast.success("Buyurtma muvaffaqiyatli qabul qilindi!");

      reset();
    } catch (error: any) {
      console.error("Checkout error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MaxWidth className="py-20 space-y-10">
      <div className="flex items-center gap-3 flex-wrap">
        <Link to={"/"} className="font-normal text-sm text-zinc-400">
          Account
        </Link>
        /
        <Link to={"/"} className="font-normal text-sm text-zinc-400">
          My Account
        </Link>
        /
        <Link to={"/"} className="font-normal text-sm text-zinc-400">
          Product
        </Link>
        /
        <Link to={"/"} className="font-normal text-sm text-zinc-400">
          View Cart
        </Link>
        /
        <span className="text-black font-normal text-sm cursor-pointer">
          CheckOut
        </span>
      </div>
      <h1 className="font-medium text-4xl">Billing Details</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-10 max-md:flex-col justify-between items-center"
      >
        <div className="md:max-w-[470px] w-full space-y-2">
          <div className="space-y-2">
            <Label className="flex items-center" htmlFor="firstName">
              First Name <span className="text-red">*</span>
            </Label>
            <Input
              {...register("billingDetails.firstName")}
              className="bg-[#F5F5F5]"
              type="text"
              id="firstName"
            />
            {errors.billingDetails?.firstName && (
              <span className="text-red text-xs">
                {errors.billingDetails.firstName.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="streetAddress" className="flex items-center">
              Address <span className="text-red">*</span>
            </Label>
            <Input
              {...register("billingDetails.streetAddress")}
              className="bg-[#F5F5F5]"
              type="text"
              id="streetAddress"
            />
            {errors.billingDetails?.streetAddress && (
              <span className="text-red text-xs">
                {errors.billingDetails.streetAddress.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center" htmlFor="city">
              Town/City <span className="text-red">*</span>
            </Label>
            <Input
              {...register("billingDetails.city")}
              className="bg-[#F5F5F5]"
              type="text"
              id="city"
            />
            {errors.billingDetails?.city && (
              <span className="text-red text-xs">
                {errors.billingDetails.city.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center" htmlFor="phone">
              Phone Number <span className="text-red">*</span>
            </Label>
            <Input
              {...register("billingDetails.phone")}
              className="bg-[#F5F5F5]"
              type="text"
              id="phone"
            />
            {errors.billingDetails?.phone && (
              <span className="text-red text-xs">
                {errors.billingDetails.phone.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center" htmlFor="email">
              Email Address <span className="text-red">*</span>
            </Label>
            <Input
              {...register("billingDetails.email")}
              className="bg-[#F5F5F5]"
              type="text"
              id="email"
            />
            {errors.billingDetails?.email && (
              <span className="text-red text-xs">
                {errors.billingDetails.email.message}
              </span>
            )}
          </div>

          <div className="flex gap-2 items-center">
            <Checkbox />{" "}
            <p className="text-base font-normal">
              Save this information for faster check-out next time
            </p>
          </div>
        </div>

        {/* Chap tarafdagi savat qismini o‘zgartirmay qo‘ya qolamiz */}
        <div className="space-y-3 max-md:w-full">
          <div className="md:w-[422px] max-md:w-full space-y-3">
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={product?.images[0]}
                  className="object-contain w-[54px] h-[54px]"
                  alt=""
                />
                <p className="font-normal text-base">{product?.title}</p>
              </div>
              <p className="font-normal text-base">${product?.price}</p>
            </div>

            <div className="flex items-center justify-between border-b pb-3 border-black">
              <p className="font-normal text-base">Subtotal:</p>
              <p className="font-normal text-base">${product?.price}</p>
            </div>
            <div className="flex items-center justify-between border-b pb-3 border-black">
              <p className="font-normal text-base">Shipping:</p>
              <p className="font-normal text-base">Free</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-normal text-base">Total:</p>
              <p className="font-normal text-base">${product?.price}</p>
            </div>
          </div>

          <div className="flex justify-start">
            <Button
              type="submit"
              disabled={loading}
              variant="destructive"
              size="lg"
            >
              {loading ? "Yuborilmoqda..." : "Place Order"}
            </Button>
          </div>
        </div>
      </form>
    </MaxWidth>
  );
};

export default BuyNow;
