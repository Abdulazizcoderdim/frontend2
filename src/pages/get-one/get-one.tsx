import MaxWidth from "@/components/max-width";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { valueCount } from "@/hooks/useCountStar";
import $axios from "@/http";
import { cn } from "@/lib/utils";
import { addToWishList, deleteWishList } from "@/redux/wishlistSlice";
import { IProduct } from "@/type";
import { Heart, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { BsHeartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import Reletaed from "./related";

const GetOne = () => {
  const [loading, setLoading] = useState(false);
  const [sizes, setSizes] = useState("");
  const [quantitry, setQuantitry] = useState<number>(1);
  const [oneProduct, setOneProduct] = useState<IProduct>();
  const dispatch = useDispatch();
  const [image, setImage] = useState<string>();
  const [color, setColor] = useState("");

  const { slug } = useParams();

  // wishlistdagi ma'lumotlar
  const wishlistItems = useSelector((state: any) => state.wishList.wishList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(false);
        const res: { data: IProduct } = await $axios.get(`/products/${slug}`);
        if (!res.data) return;

        setOneProduct(res.data as IProduct);

        setImage(res.data.images[0]);
      } catch (error) {
        console.log("get one product errorrr", error);
      } finally {
        setLoading(true);
      }
    };
    fetchData();
  }, [slug]);

  const handleItemQuantityChange = (type: string) => {
    if (type === "increase") {
      setQuantitry(quantitry + 1);
    } else if (type === "decrease") {
      setQuantitry(quantitry - 1);
      if (quantitry <= 1) {
        setQuantitry(1);
      }
    }
  };

  // wishlist add and delete
  const handleWishListToggle = () => {
    const isInWishList = wishlistItems.some(
      (item: IProduct) => item._id === oneProduct?._id
    );
    if (isInWishList) {
      dispatch(deleteWishList(oneProduct?._id));
      toast.success("Product removed from wishlist");
    } else {
      dispatch(
        addToWishList({
          _id: oneProduct?._id,
          title: oneProduct?.title,
          price: oneProduct?.price,
          quantity: 1,
          imageUrl: oneProduct?.images[0],
        })
      );
      toast.success("Product added to wishlist");
    }
  };

  const isInWishList = wishlistItems.some(
    (item: IProduct) => item._id === oneProduct?._id
  );

  return (
    <div>
      <MaxWidth className="py-20">
        <div className="flex items-center gap-3 mb-20">
          <Link to={"/"} className="font-normal text-sm text-zinc-400">
            Account
          </Link>{" "}
          /{" "}
          <Link
            to={"/category/" + oneProduct?.category.slug}
            className="font-normal text-sm text-zinc-400"
          >
            {oneProduct?.category.name}
          </Link>
          /
          <span className="text-black font-normal text-sm cursor-pointer">
            {oneProduct?.title}
          </span>
        </div>
        <div className="flex max-md:flex-col justify-between gap-5 min-h-[580px]">
          {loading ? (
            <div className="flex max-md:flex-col w-full gap-10">
              {oneProduct?.images && oneProduct?.images.length > 1 && (
                <div className="md:max-w-[170px] w-full flex md:flex-col gap-4">
                  {oneProduct?.images.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => setImage(item)}
                      className={cn(
                        "bg-[#F5F5F5] cursor-pointer border-blue-500 hover:border-2 sm:h-[138px] h-[70px] flex items-center justify-center p-3 rounded-md",
                        item === image && "border-2"
                      )}
                    >
                      <img
                        className="object-contain h-full w-full"
                        src={item}
                        alt={oneProduct?.title || ""}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="h-full w-full p-5 rounded-md bg-[#F5F5F5]">
                <div className="sm:h-[550px] h-72">
                  <img
                    src={image}
                    className="object-contain h-full w-full"
                    alt={oneProduct?.title || ""}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-10 max-sm:flex-col">
              <div className="flex sm:flex-col gap-2">
                <Skeleton className="h-full w-[170px] flex items-center justify-center p-3" />
                <Skeleton className="h-full w-[170px] flex items-center justify-center p-3" />
                <Skeleton className="h-full w-[170px] flex items-center justify-center p-3" />
                <Skeleton className="h-full w-[170px] flex items-center justify-center p-3" />
              </div>
              <div className="h-full p-5 rounded-md">
                <Skeleton className="w-[500px] h-full" />
              </div>
            </div>
          )}
          <div className="space-y-4 flex flex-col justify-between md:w-1/3">
            <h1 className="font-semibold text-2xl">{oneProduct?.title}</h1>
            <div className="flex items-center gap-2">
              {Array.from(
                { length: Math.floor(oneProduct?.rating as number) },
                (_, i) => (
                  <FaStar key={i} className="text-star" />
                )
              )}
              {valueCount(oneProduct?.rating as number)}
              <p className="font-normal text-sm text-zinc-400">
                ({oneProduct?.numReviews} Reviews)
              </p>
              |
              <p>
                {oneProduct?.stockStatus ? (
                  <span className="text-sm text-[#00FF66] font-normal">
                    In Stock
                  </span>
                ) : (
                  <span className="text-sm font-normal">Out of Stock</span>
                )}
              </p>
            </div>
            <p className="text-2xl font-normal">
              ${Number(oneProduct?.price) * quantitry}.00
            </p>
            <p className="font-normal text-sm">
              {oneProduct?.description && oneProduct?.description}
            </p>
            <p className="h-0.5 w-full bg-zinc-600" />
            {oneProduct?.colours && (
              <div className="flex items-center gap-5">
                <p className="font-normal text-xl">Colours: </p>
                <div className="flex items-center gap-1">
                  {oneProduct?.colours.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => setColor(item)}
                      className={`bg-${item} cursor-pointer ${
                        color === item && "border-blue-500 border-2"
                      } border w-5 h-5 rounded-md`}
                    />
                  ))}
                </div>
              </div>
            )}
            {oneProduct?.sizes && (
              <div className="flex items-center gap-5">
                <p className="font-normal text-xl">Size: </p>
                <div className="flex items-center gap-3">
                  {oneProduct?.sizes.map((item, i) => (
                    <button
                      key={i}
                      className={cn(
                        "border rounded-md w-8 h-8 flex items-center justify-center text-sm font-medium",
                        sizes === item && "bg-red text-white"
                      )}
                      onClick={() => setSizes(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pb-5">
              <div className="border rounded-md w-40 h-11 flex items-center justify-between">
                <button
                  onClick={() => handleItemQuantityChange("decrease")}
                  className="p-2 border-r hover:bg-red transition hover:text-white rounded-l-md"
                  title="minus"
                >
                  <Minus />
                </button>
                <span className="font-medium text-xl">{quantitry}</span>
                <button
                  onClick={() => handleItemQuantityChange("increase")}
                  className="p-2 border-l hover:bg-red transition hover:text-white rounded-r-md"
                  title="plus"
                >
                  <Plus />
                </button>
              </div>
              <Button asChild size={"lg"} variant={"destructive"}>
                <Link to={`/checkout/${oneProduct?.slug}`}>Buy Now</Link>
              </Button>
              <Button
                onClick={() => handleWishListToggle()}
                size={"icon"}
                variant={"outline"}
              >
                {isInWishList ? (
                  <BsHeartFill className="w-6 h-6 text-red" />
                ) : (
                  <Heart className="w-6 h-6" />
                )}
              </Button>
            </div>
            <div className="space-y-3 border-2 border-zinc-600 rounded-md">
              {oneProduct?.deliveryOptions.freeDelivery && (
                <div className="p-2 flex items-center gap-2">
                  <img src="/id.png" className="w-10 h-10" alt="" />
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-base">Free Delivery</p>
                    <Link className="font-medium text-xs underline" to={"#"}>
                      Enter your postal code for Delivery Availability
                    </Link>
                  </div>
                </div>
              )}
              <p className="h-0.5 w-full bg-zinc-600" />
              {oneProduct?.deliveryOptions.returnDelivery && (
                <div className="p-2 flex items-center gap-2">
                  <img src="/id2.png" className="w-10 h-10" alt="" />
                  <div className="flex flex-col gap-3">
                    <p className="font-medium text-base">Return Delivery</p>
                    <Link className="font-medium text-xs " to={"#"}>
                      Free 30 Days Delivery Returns.
                      <span className="underline">Details</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* sd */}
        <Reletaed slug={oneProduct?.category.slug} />
      </MaxWidth>
    </div>
  );
};

export default GetOne;
