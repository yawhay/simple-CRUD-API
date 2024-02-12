import fs from 'fs';
import { v4 as uuid } from 'uuid';
import * as Path from 'path';

export function getAll() {
  try {
    const path = Path.join(import.meta.dirname, 'db.json');
    const data = fs.readFileSync(path, { encoding: 'utf-8' });
    return { success: true, data: JSON.parse(data).users };
  } catch (e) {
    return { success: false, code: 500, error: `DB error users getting` };
  }
}

function setData(users) {
  try {
    const data = JSON.stringify({ users });
    const path = Path.join(import.meta.dirname, 'db.json');
    fs.writeFileSync(path, data);
    return { success: true };
  } catch (e) {
    return { success: false, code: 500, error: `DB error users getting` };
  }
}

export function getOneById(userId) {
  const usersGettingResult = getAll();

  if (!usersGettingResult.success) {
    return usersGettingResult;
  }

  const user = usersGettingResult.data.find((x) => x.userId === userId);

  if (!user) {
    return { success: false, error: `User with id ${userId} doesn't exist` };
  }

  return { success: true, data: user };
}

export function addOne(params) {
  const user = { userId: uuid(), ...params };
  const usersResult = getAll();

  if (!usersResult.success) {
    return usersResult;
  }

  const users = usersResult.data;
  users.push(user);

  const settingDataResult = setData(users);

  if (!settingDataResult.success) {
    return settingDataResult;
  }

  return { success: true, data: user };
}

export function updateOne(userId, params) {
  const usersResult = getAll();

  if (!usersResult.success) {
    return usersResult;
  }

  const users = usersResult.data;

  const userIndex = users.map((x) => x.userId).indexOf(userId);

  if (userIndex === -1) {
    return { success: false, error: `User with id ${userId} doesn't exist` };
  }

  const user = { ...users[userIndex], ...params };

  users[userIndex] = user;

  const settingDataResult = setData(users);

  if (!settingDataResult.success) {
    return settingDataResult;
  }

  return { success: true, data: user };
}

export function deleteOne(userId) {
  const usersResult = getAll();

  if (!usersResult.success) {
    return usersResult;
  }

  const users = usersResult.data;

  const userIndex = users.map((x) => x.userId).indexOf(userId);

  if (userIndex === -1) {
    return { success: false, error: `User with id ${userId} doesn't exist` };
  }

  users.splice(userIndex, 1);

  const settingDataResult = setData(users);

  if (!settingDataResult.success) {
    return settingDataResult;
  }

  return { success: true };
}
