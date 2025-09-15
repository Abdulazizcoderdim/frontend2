import { valueCount } from "@/hooks/useCountStar";
import { cn } from "@/lib/utils";
import { addItem, deleteItem } from "@/redux/cartSlice";
import { addToWishList, deleteWishList } from "@/redux/wishlistSlice";
import { IProduct } from "@/type";
import { Heart } from "lucide-react";
import { BsHeartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProductItem = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux store'dan savatdagi mahsulotlarni olish
  const cartItems = useSelector((state: any) => state.cart.cart);
  // wishlistdagi ma'lumotlar
  const wishlistItems = useSelector((state: any) => state.wishList.wishList);

  // Savatga qo'shish yoki olib tashlash funksiyasi
  const handleCartToggle = (product: IProduct) => {
    const isInCart = cartItems.some(
      (item: IProduct) => item._id === product._id
    );

    if (isInCart) {
      dispatch(deleteItem(product._id)); // Agar mahsulot savatda bo'lsa, olib tashlash
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

  // wishlist add and delete
  const handleWishListToggle = (product: IProduct) => {
    const isInWishList = wishlistItems.some(
      (item: IProduct) => item._id === product._id
    );
    if (isInWishList) {
      dispatch(deleteWishList(product._id));
      toast.success("Product removed from wishlist");
    } else {
      dispatch(
        addToWishList({
          _id: product._id,
          name: product.title,
          price: product.price,
          quantity: 1,
          imageUrl: product.images[0],
        })
      );
      toast.success("Product added to wishlist");
    }
  };

  // const discount = Math.round(
  //   ((product.oldPrice - product.price) / product.oldPrice) * 100
  // );

  const isInCart = cartItems.some((item: IProduct) => item._id === product._id); // Mahsulot savatda ekanligini tekshirish
  const isInWishList = wishlistItems.some(
    (item: IProduct) => item._id === product._id
  );

  return (
    <div className="h-full w-full space-y-3">
      <div className="relative h-[270px] group cursor-pointer rounded-md bg-[#F5F5F5] flex items-center justify-center">
        <div className="h-44 w-44">
          <img
            onClick={() =>
              navigate(`/category/${product.category.slug}/${product.slug}`)
            }
            src={product.images[0]}
            className="object-contain h-full w-full"
            alt="Product image"
          />
        </div>
        {/* <span className="absolute top-3 left-3 bg-red px-3 py-0.5 font-medium rounded-md text-white text-center">
          {discount}%
        </span> */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <span
            onClick={() => handleWishListToggle(product)}
            className="bg-white w-10 h-[34px] flex items-center justify-center cursor-pointer rounded-full text-black"
          >
            {isInWishList ? (
              <BsHeartFill className="w-6 h-6 text-red" />
            ) : (
              <Heart className="w-6 h-6" />
            )}
          </span>
        </div>

        <div className="flex items-center gap-3 absolute scale-0 group-hover:scale-100 transition-all duration-300 rounded-b-md cursor-pointer bottom-0 right-0 left-0">
          <button
            onClick={() => handleCartToggle(product)}
            title={isInCart ? "Remove from cart" : "Add to cart"}
            className={cn(
              "rounded-md w-full bg-black text-white text-center py-2",
              isInCart ? "bg-transparent border border-red text-red" : ""
            )}
          >
            <p className="text-center font-medium text-base">
              {isInCart ? "Remove from Cart" : "Add To Cart"}
            </p>
          </button>
        </div>
      </div>
      <p className="font-medium text-base">{product.title}</p>
      <div className="space-x-3">
        <span className="font-medium text-base text-red">${product.price}</span>
        {product.oldPrice && (
          <span className="line-through font-medium text-base text-zinc-600">
            ${product.oldPrice}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {Array.from({ length: Math.floor(product.rating) }, (_, i) => (
          <FaStar key={i} className="text-star" />
        ))}
        {valueCount(product.rating)}
        <span className="text-zinc-600 font-medium text-base">
          ({product.numReviews})
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
