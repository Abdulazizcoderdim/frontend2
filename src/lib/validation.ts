import { z } from "zod";

// const productSchema = z.object({
//   name: z.string(),
//   price: z.object({
//     currentPrice: z.number(),
//     originalPrice: z.number(),
//   }),
//   ratings: z.object({
//     value: z.number().min(0).max(5),
//     count: z.number(),
//   }),
//   inStock: z.boolean().default(true),
//   colors: z.array(z.string()).nonempty('At least one color is required'),
//   sizes: z.array(z.string()).nonempty('At least one size is required'),
//   //   quantity: z.number(),
//   description: z.string(),
//   imageUrl: z.string().url(),
//   //   isFavorite: z.boolean().default(false),
//   //   isViewed: z.boolean().default(false),
//   createdAt: z.date().default(() => new Date()),
//   updatedAt: z.date().default(() => new Date()),
// });

// type Product = z.infer<typeof productSchema>;

// export { productSchema, type Product };

export const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(30),
});
// phoneNumber: z.string().optional(),

export const editUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  password: z
    .object({
      currentPassword: z.string().min(3).max(30).optional(),
      newPassword: z.string().min(3).max(30).optional(),
      confirmNewPassword: z.string().min(3).max(30).optional(),
    })
    .optional(),
});

export const registerSchema = z.object({
  username: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const billingSchema = z.object({
  billingDetails: z.object({
    firstName: z.string().min(1, "First name is required"),
    streetAddress: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    phone: z.string().min(5, "Phone number is required"),
    email: z.string().email("Invalid email address"),
  }),
  couponCode: z.string().optional(),
});
