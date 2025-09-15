// Mahsulot uchun asosiy interfeys
export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  oldPrice: number;
  images: string[];
  colours: string[];
  sizes: string[];
  stockStatus: boolean;
  countInStock: number;
  rating: number;
  numReviews: number;
  category: ICategory;
  deliveryOptions: {
    freeDelivery: boolean;
    returnDelivery: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ICategory {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Inputs = {
  name: string;
  price: {
    currentPrice: number;
    originalPrice: number;
  };
  ratings: {
    value: number;
    count: number;
  };
  category: string;
  inStock: boolean;
  description: string;
  imageUrl: string;
  imageUrl2: string;
  imageUrl3: string;
  imageUrl4: string;
  imageUrl5: string;
};

export type CartType = {
  cart: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
    totalPrice: number;
  }[];
};
export type WishListType = {
  wishList: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
    totalPrice: number;
  }[];
};

export interface LoginUserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
}

export interface EditTypeUser {
  username?: string;
  password?: string;
  lastName?: string;
  email?: string;
  address?: string;
}

export interface EditUserRes {
  id: string;
  name: string;
  lastName: string;
  email: string;
  isActivated: boolean;
  role: string;
}

export interface RegisterType {
  username: string;
  email: string;
  password: string;
}

export interface BillingType {
  firstName: string;
  companyName: string;
  address: string;
  townCity: string;
  phoneNumber: string;
  emailAddress: string;
}
