import { Role } from '@prisma/client';
import { z } from 'zod';
import { password } from './custom.validation';

const createUser = {
  body: z.object({
    email: z.string().email(),
    password: z.string().superRefine(password),
    name: z.string(),
    role: z.enum([Role.USER, Role.ADMIN])
  })
};

const getUsers = {
  query: z.object({
    name: z.string(),
    role: z.string(),
    sortBy: z.string(),
    limit: z.number().int(),
    page: z.number().int()
  })
};

const getUser = {
  params: z.object({
    userId: z.number().int()
  })
};

const updateUser = {
  params: z.object({
    userId: z.number().int()
  }),
  body: z
    .object({
      email: z.string().email(),
      password: z.string().superRefine(password),
      name: z.string()
    }).refine(data => Object.keys(data).length > 0, {
      message: 'At least one field is required.'
    })
};

const deleteUser = {
  params: z.object({
    userId: z.number().int()
  })
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
