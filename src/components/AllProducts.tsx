import $axios from "@/http";
import { t } from "@/lib/translate";
import { IPagination, IProduct } from "@/type";
import { useEffect, useState } from "react";
import MaxWidth from "./max-width";
import ProductItem from "./product-item/ProductItem";
import ProductSkeleton from "./ProductSkeleton";
import { Button } from "./ui/button";

const AllProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchProducts(pagination.page);
  }, []);

  const fetchProducts = async (page: number = 1) => {
    try {
      setLoading(true);
      const { data }: { data: { data: IProduct[]; pagination: IPagination } } =
        await $axios.get(`/products?page=${page}&limit=10`);

      if (!data) {
        throw new Error("Ma'lumotlar olishda xatolik yuz berdi");
      }

      setProducts(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.log("get one product errorrr", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchProducts(page);
  };

  return (
    <MaxWidth className="md:py-16 py-10">
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)}

        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>

      {pagination.page < pagination.pages && (
        <div className="flex justify-center mt-10">
          <Button
            type="button"
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            {t({
              uz: "Ko‘proq mahsulotlar",
              ru: "Больше товаров",
              en: "More Products",
            })}
          </Button>
        </div>
      )}
    </MaxWidth>
  );
};

export default AllProducts;
