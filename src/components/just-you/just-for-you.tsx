import { valueCount } from "@/hooks/useCountStar";
import { cn } from "@/lib/utils";
import { addItem, deleteItem } from "@/redux/cartSlice";
import { IProduct } from "@/type";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { PiShoppingCartThin } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "swiper/css";
import "swiper/css/navigation";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../ui/button";

const JustForYou = () => {
  const [todayProduct, setTodayProduct] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state: any) => state.cart.cart);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_PUBLIC_API_URL + "/product/get-products"
        );
        if (!response.ok) {
          throw new Error("Ma'lumotlarni olishda xatolik yuz berdi");
        }
        const data: IProduct[] = await response
          .json()
          .then((data) => data.reverse());
        setTodayProduct(data);
        setLoading(false);
      } catch (error: any) {
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCartToggle = (product: IProduct) => {
    const isInCart = cartItems.some(
      (item: IProduct) => item._id === product._id
    );

    if (isInCart) {
      dispatch(deleteItem(product._id));
      toast.success("Product removed from cart");
    } else {
      dispatch(
        addItem({
          _id: product._id,
          name: product.title,
          price: product.price,
          quantity: 1,
          imageUrl: product.images[0],
        })
      );
      toast.success("Product added to cart");
    }
  };

  return (
    <div className="pt-10">
      <div className="flex items-center justify-between gap-2 pb-16">
        <div className="flex items-center gap-3">
          <div className="w-[20px] h-[40px] rounded-md bg-red" />
          <p className="text-red font-semibold text-base">Just For You</p>
        </div>

        <Button size={"lg"} variant={"outline"}>
          See All
        </Button>
      </div>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
        }}
        className="min-h-[350px]"
      >
        {loading && <p>Loading...</p>}
        {todayProduct.map((product, i) => {
          const isInCart = cartItems.some(
            (item: IProduct) => item._id === product._id
          );

          return (
            <SwiperSlide key={i} className="min-h-[350px]">
              <div className="h-full w-full space-y-3">
                <div className="relative h-[270px] cursor-pointer rounded-md bg-[#F5F5F5] min-h-[250px] flex items-center justify-center">
                  <div className="h-44 w-44">
                    <img
                      onClick={() => navigate(`/products/${product._id}`)}
                      src={product.images[0]}
                      className="object-contain h-full w-full"
                      alt="Product image"
                    />
                  </div>
                  {/* <span className="absolute top-3 left-3 bg-green-500 px-3 py-0.5 font-medium rounded-md text-white text-center">
                    new
                  </span> */}

                  <button
                    onClick={() => handleCartToggle(product)}
                    title={isInCart ? "Remove from cart" : "Add to cart"}
                    className={cn(
                      "absolute transition-all duration-300 rounded-b-md cursor-pointer bottom-0 right-0 left-0 w-full bg-black text-white text-center py-2",
                      isInCart
                        ? "bg-transparent border border-red text-red"
                        : ""
                    )}
                  >
                    <p className="text-center flex justify-center font-medium text-base">
                      {isInCart ? (
                        "Remove from Cart"
                      ) : (
                        <span className="flex items-center gap-2">
                          <PiShoppingCartThin className="w-8 h-8" />
                          Add To Cart
                        </span>
                      )}
                    </p>
                  </button>
                </div>
                <p className="font-medium text-base">{product.title}</p>
                <div className="space-x-3">
                  <span className="font-medium text-base text-red">
                    ${product.price}
                  </span>
                  <span className="line-through font-medium text-base text-zinc-600">
                    ${product.oldPrice}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: Math.floor(product.rating) },
                    (_, i) => (
                      <FaStar key={i} className="text-star" />
                    )
                  )}

                  {valueCount(product.rating)}
                  <span className="font-medium text-base">
                    ({product.numReviews})
                  </span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default JustForYou;
