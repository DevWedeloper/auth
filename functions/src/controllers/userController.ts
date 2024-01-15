import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import * as User from '../models/userModel';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { username, password, email, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      role,
    });
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const users = await User.getAll();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { id } = req.params;
    const { updatedData, userId, role } = req.body;

    const userToUpdate = await User.findById(id);
    const isOwnerOrAdmin =
      userToUpdate._id === userId || role === 'admin';
    if (!isOwnerOrAdmin) {
      return res.status(403).json({ error: 'Permission denied' });
    }

    if (role === 'standard' && updatedData.username) {
      return res.status(403).json({
        error: 'Standard users are not allowed to change their username',
      });
    }

    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    if (
      role === 'admin' &&
      updatedData.username &&
      updatedData.username !== userToUpdate.username
    ) {
      const existingUser = await User.findOneByUsernameOrId({
        username: updatedData.username,
      });
      if (existingUser) {
        return res.status(409).json({ error: 'Username already exists' });
      }
    }

    const user = await User.updateById(id, updatedData);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { userId, role } = req.body;

    const userToDelete = await User.findById(req.params.id);
    const isOwnerOrAdmin =
      userToDelete._id === userId || role === 'admin';
    if (!isOwnerOrAdmin) {
      return res.status(403).json({
        error: 'Standard users are only allowed to delete their own account',
      });
    }

    const deletedUser = await User.deleteById(req.params.id);
    return res
      .status(200)
      .json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    next(error);
  }
};
