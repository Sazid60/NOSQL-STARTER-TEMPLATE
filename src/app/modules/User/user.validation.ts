import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z
        .string({ error: (issue) => issue.input === undefined ? "Name Is Required" : "Not A String" })
        .min(2, { error: "Name must be at least 2 characters long." })
        .max(50, { error: "Name cannot exceed 50 characters." }),
    picture: z.string({ error: (issue) => issue.input === undefined ? "Picture Is Required" : "Not A String" }),
    email: z
        .email({
            error: (issue) =>
                issue.input === undefined ? "Email is required" : "Invalid email address format.",
        }),
    password: z
        .string({
            error: (issue) =>
                issue.input === undefined ? "Password is required" : "Password Must Be String!",
        })
        .min(8, { error: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            error: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            error: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            error: "Password must contain at least 1 number.",
        }),
    phone: z
        .string({ error: "Phone Number must be string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            error: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),
    address: z
        .string({ error: "Address must be string" })
        .max(200, { error: "Address cannot exceed 200 characters." })
        .optional()
})

export const updateUserZodSchema = z.object({
    name: z
        .string({ error: (issue) => issue.input === undefined ? "Name must be provided" : "Not a string" })
        .min(2, { error: "Name must be at least 2 characters long." })
        .max(50, { error: "Name cannot exceed 50 characters." })
        .optional(),
       picture: z.string({ error: (issue) => issue.input === undefined ? "Picture Is Required" : "Not A String" }).optional(),
    password: z
        .string({ error: (issue) => issue.input === undefined ? "Password must be provided" : "Password must be string" })
        .min(8, { error: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, { error: "Password must contain at least 1 uppercase letter." })
        .regex(/^(?=.*[!@#$%^&*])/, { error: "Password must contain at least 1 special character." })
        .regex(/^(?=.*\d)/, { error: "Password must contain at least 1 number." })
        .optional(),
    phone: z
        .string({ error: (issue) => issue.input === undefined ? "Phone number must be provided" : "Phone number must be string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            error: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),
    role: z
        .enum(Object.values(Role) as [string], { error: "Role must be a valid value" })
        .optional(),
    isActive: z
        .enum(Object.values(IsActive) as [string], { error: "isActive must be a valid value" })
        .optional(),
    isDeleted: z
        .boolean({ error: "isDeleted must be true or false" })
        .optional(),
    isVerified: z
        .boolean({ error: "isVerified must be true or false" })
        .optional(),
    address: z
        .string({ error: (issue) => issue.input === undefined ? "Address must be provided" : "Address must be string" })
        .max(200, { error: "Address cannot exceed 200 characters." })
        .optional()
});