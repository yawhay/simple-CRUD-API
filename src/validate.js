import { resSend } from './index.js';

export const userIdValidator = (userId) => {
  return /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
    userId,
  );
};

export function getUsersValidator(func) {
  return (req, res) => {
    const userId = req.params?.userId;

    if (userId) {
      const userIdValidate = userIdValidator(userId);

      if (!userIdValidate) {
        return resSend(res, 400, { error: `${userId} is not uuid` });
      }
    }
    func(req, res);
  };
}

export function addUserValidator(func) {
  return (req, res) => {
    const requiredFields = ['username', 'age'];

    const bodyKeys = Object.keys(req.body);

    const exclude = requiredFields.filter((x) => !bodyKeys.includes(x));

    if (!bodyKeys.includes('hobbies') || !Array.isArray(req.body.hobbies)) {
      req.body.hobbies = [];
    }

    if (exclude.length) {
      return resSend(res, 400, {
        error: `${exclude.join(', ')} are required fields`,
      });
    } else {
      func(req, res);
    }
  };
}

export function userIsUuidValidator(func) {
  return (req, res) => {
    const userId = req.params.userId;

    if (userId) {
      const userIdValidate = userIdValidator(userId);

      if (!userIdValidate) {
        return resSend(res, 400, { error: `${userId} is not uuid` });
      } else {
        return func(req, res);
      }
    }

    return resSend(res, 400, { error: `userId is required` });
  };
}
