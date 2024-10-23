import httpStatus from 'http-status';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import { userService } from '../services';
import { userValidation } from '../validations';
import z from 'zod';

const createUser = catchAsync(async (req, res) => {
  const { email, password, name, role } = req.body as z.infer<typeof userValidation.createUser.body>;
  const user = await userService.createUser(email, password, name, role);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById((req.params as z.infer<typeof userValidation.getUser.params>).userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById((req.params as z.infer<typeof userValidation.updateUser.params>).userId, (req.body as z.infer<typeof userValidation.updateUser.body>));
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById((req.params as z.infer<typeof userValidation.deleteUser.params>).userId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
