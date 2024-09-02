import { z } from 'zod';

export const nameSchema = z
  .string()
  .min(5, 'Длина имени должна быть не менее 5 символов');

export const passwordSchema = z
  .string()
  .min(8, 'Длина пароля должна быть не менее 8 символов');

export const emailSchema = z.string().email({
  message: 'некорректный email, проверте на соответствие test@mail.com',
});

export const idSchema = z.string();

export const UserSchema = z.object({
  username: nameSchema.optional(),
  email: emailSchema,
  password: passwordSchema,
});

export const ResponseFetchMeSchema = z.object({
  username: nameSchema,
  email: emailSchema,
  id: idSchema,
});

export type User = z.infer<typeof UserSchema>;
export type ResponseFetchMe = z.infer<typeof ResponseFetchMeSchema>;
