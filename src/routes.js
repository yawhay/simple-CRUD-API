import {
  userAddingController,
  userDeletingController,
  userGettingController,
  userUpdatingController,
} from './controllers.js';
import { resSend } from './index.js';
import {
  addUserValidator,
  getUsersValidator,
  userIsUuidValidator,
} from './validate.js';

export const routesList = {
  '/api/users': {
    GET: getUsersValidator(getUsersRoute),
    POST: addUserValidator(addUserRoute),
    PUT: userIsUuidValidator(updateUserRoute),
    DELETE: userIsUuidValidator(deleteUserRoute),
  },
};

export function getUsersRoute(req, res) {
  const userId = req.params.userId;

  const result = userGettingController(userId);

  if (result.success && result.data) {
    resSend(res, 200, result.data);
  } else {
    resSend(res, result.code || 404, { error: result.error });
  }
}

export function addUserRoute(req, res) {
  const { username, age, hobbies } = req.body;

  const result = userAddingController({ username, age, hobbies });

  if (result.success && result.data) {
    resSend(res, 201, result.data);
  } else {
    resSend(res, result.code || 404, { error: result.error });
  }
}

export function updateUserRoute(req, res) {
  const { userId } = req.params;
  const { username, age, hobbies } = req.body;

  const result = userUpdatingController(userId, { username, age, hobbies });

  if (result.success && result.data) {
    resSend(res, 200, result.data);
  } else {
    resSend(res, result.code || 404, { error: result.error });
  }
}

export function deleteUserRoute(req, res) {
  const { userId } = req.params;

  const result = userDeletingController(userId);

  if (result.success) {
    resSend(res, 204);
  } else {
    resSend(res, result.code || 404, { error: result.error });
  }
}
