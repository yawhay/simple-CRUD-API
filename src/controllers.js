import { addOne, deleteOne, getAll, getOneById, updateOne } from './models.js';

export function userGettingController(userId) {
  if (userId) {
    return getOneById(userId);
  }
  return getAll();
}

export function userAddingController(params) {
  return addOne(params);
}

export function userUpdatingController(userId, params) {
  return updateOne(userId, params);
}

export function userDeletingController(userId) {
  return deleteOne(userId);
}
