import { Label } from "@/components/ui/label";
import { IUser } from "@/interfaces";
import { cn } from "@/lib/utils";
import { editUser } from "@/service/user";
import { authStore } from "@/store/auth.store";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";
import MaxWidth from "../max-width";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

const MyAccount = () => {
  const { user, isLoading, setIsUser } = authStore();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field?: "currentPassword" | "newPassword" | "confirmNewPassword"
  ) => {
    const { name, value } = e.target;

    if (field) {
      setFormData((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);

      let parol;
      if (
        formData.password.newPassword.trim() ===
        formData.password.confirmNewPassword.trim()
      ) {
        parol = formData.password.confirmNewPassword;
      }

      // 🔑 faqat o‘zgargan maydonlarni yig‘amiz
      const editInfo: Partial<
        IUser & { currentPassword?: string; newPassword?: string }
      > = {};

      if (formData.firstName && formData.firstName !== user.firstName) {
        editInfo.firstName = formData.firstName;
      }
      if (formData.lastName && formData.lastName !== user.lastName) {
        editInfo.lastName = formData.lastName;
      }
      if (formData.email && formData.email !== user.email) {
        editInfo.email = formData.email;
      }
      if (formData.address && formData.address !== user.address) {
        editInfo.address = formData.address;
      }
      if (formData.password.currentPassword && parol) {
        editInfo.currentPassword = formData.password.currentPassword;
        editInfo.newPassword = parol;
      }

      // agar hech narsa o‘zgarmagan bo‘lsa
      if (Object.keys(editInfo).length === 0) {
        toast.info("Hech qanday o‘zgarish topilmadi");
        setLoading(false);
        return;
      }

      const res = await editUser(editInfo);

      if (!res) {
        throw new Error("User updating error!!");
      }

      setIsUser(res as IUser);
      toast.success("User updated successfully");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        password: {
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        },
      });
    } catch (error) {
      toast.error("Xatolik yuz berdi");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <MaxWidth className="py-20">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <Link to={"/"} className="font-normal text-sm text-zinc-400">
            Home
          </Link>{" "}
          /{" "}
          <span className="text-black font-normal text-sm cursor-pointer">
            My Account
          </span>
        </div>
        <p className="flex items-center font-normal gap-2 text-sm">
          Welcome!{" "}
          <span className="text-red">
            {isLoading ? (
              <Skeleton className="w-10 h-5 rounded-md"></Skeleton>
            ) : (
              user.username
            )}
          </span>
          <span>
            {user.lastName && (
              <span className="text-red"> {user.lastName}</span>
            )}
          </span>
        </p>
      </div>
      <div className="py-10 flex max-md:flex-col justify-between gap-10">
        <div className="md:w-1/3">
          <div className="space-y-5">
            <h1 className="font-medium text-base">Manage My Account</h1>
            <ul className="pl-5 space-y-2 text-zinc-400">
              <li
                className={cn(
                  "text-base cursor-pointer font-normal",
                  pathname === "/account" && "text-red"
                )}
              >
                <Link to={"/account"}>My Profile</Link>
              </li>
              <li
                className={cn(
                  "text-base cursor-pointer font-normal",
                  pathname === "/address-book" && "text-red"
                )}
              >
                <Link to={"#"}>Address Book</Link>
              </li>
              <li
                className={cn(
                  "text-base cursor-pointer font-normal",
                  pathname === "/my-payment-options" && "text-red"
                )}
              >
                <Link to={"#"}>My Payment Options</Link>
              </li>
            </ul>
            <h1 className="font-medium text-base">My Orders</h1>
            <ul className="pl-5 space-y-2 text-zinc-400">
              <li
                className={cn(
                  "text-base cursor-pointer font-normal",
                  pathname === "/my-returns" && "text-red"
                )}
              >
                <Link to={"#"}>My Returns</Link>
              </li>
              <li
                className={cn(
                  "text-base cursor-pointer font-normal",
                  pathname === "/my-cancellations" && "text-red"
                )}
              >
                <Link to={"#"}>My Cancellations</Link>
              </li>
            </ul>
            <h1 className="font-medium text-base">My WishList</h1>
          </div>
        </div>
        <div className="w-full shadow-lg px-10 py-5">
          <form onSubmit={onSubmit} className="space-y-4">
            <h1 className="font-medium text-xl text-red">Edit Your Profile</h1>
            <div className="flex max-md:flex-col items-center gap-10">
              <div className="space-y-1 w-full">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={user.firstName}
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="border border-zinc-400 px-4 py-2 rounded-md"
                />
              </div>
              <div className="space-y-1 w-full">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="border border-zinc-400 px-4 py-2 rounded-md"
                />
              </div>
            </div>
            <div className="flex max-md:flex-col items-center gap-10">
              <div className="space-y-1 w-full">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={user.email}
                  type="email"
                  name="email"
                  id="email"
                  className="border border-zinc-400 px-4 py-2 rounded-md"
                />
              </div>
              <div className="space-y-1 w-full">
                <Label htmlFor="address">Address</Label>
                <Input
                  value={formData.address}
                  onChange={handleChange}
                  type="text"
                  name="address"
                  id="address"
                  className="border border-zinc-400 px-4 py-2 rounded-md"
                />
              </div>
            </div>
            <div className="space-y-4">
              <Label htmlFor="passwordChanges">Change Password</Label>
              <Input
                value={formData.password.currentPassword}
                onChange={(e) => handleChange(e, "currentPassword")}
                type="password"
                id="passwordChanges"
                placeholder="Current Password"
              />
              <Input
                value={formData.password.newPassword}
                onChange={(e) => handleChange(e, "newPassword")}
                type="password"
                id="password"
                placeholder="New Password"
              />
              <Input
                value={formData.password.confirmNewPassword}
                onChange={(e) => handleChange(e, "confirmNewPassword")}
                type="password"
                id="confirmPassword"
                placeholder="Confirm New Password"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button type="button" variant={"ghost"} size={"lg"}>
                Cancel
              </Button>

              <Button
                disabled={loading}
                type="submit"
                variant={"destructive"}
                size={"lg"}
              >
                {loading ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MaxWidth>
  );
};

export default MyAccount;
