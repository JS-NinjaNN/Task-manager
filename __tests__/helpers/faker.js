import { faker } from '@faker-js/faker';
import _ from 'lodash';
import encrypt from '../../server/lib/secure.cjs';

const DATA_GENERATORS = {
  user: () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }),
  status: () => ({
    name: faker.word.noun(),
  }),
  label: () => ({
    name: faker.word.noun(),
  }),
  task: () => ({
    name: faker.word.noun(),
    description: faker.lorem.paragraph(),
  }),
};

const generateData = (type, length = 1) => {
  const generator = DATA_GENERATORS[type];

  return faker.helpers.multiple(generator, { count: length });
};

const generateUsers = () => {
  const newUser = generateData('user', 1);
  const users = generateData('user', 3);
  const seeds = users.map((user) => ({
    ..._.omit(user, 'password'),
    passwordDigest: encrypt(user.password),
  }));
  return {
    new: newUser[0],
    existing: {
      creator: users[0],
      executor: users[1],
      forDelete: users[2],
    },
    seeds,
  };
};

const generateStatuses = () => {
  const newStatus = generateData('status', 1);
  const statuses = generateData('status', 2);
  return {
    new: newStatus[0],
    existing: {
      update: statuses[0],
      delete: statuses[1],
    },
    seeds: statuses,
  };
};

const generateLabels = () => {
  const newLabel = generateData('label', 1);
  const labels = generateData('label', 2);
  return {
    new: newLabel[0],
    existing: {
      update: labels[0],
      delete: labels[1],
    },
    seeds: labels,
  };
};

const generateTasks = (users, statuses) => {
  const [creator, executor] = users;
  const [status] = statuses;

  const formTask = (task) => ({
    ...task,
    creatorId: creator.id,
    executorId: executor.id,
    statusId: status.id,
  });

  const newTasks = generateData('task').map(formTask);
  const existingTasks = generateData('task').map(formTask);

  return { new: newTasks[0], existing: existingTasks[0], seeds: existingTasks };
};

const generateTasksLabels = (tasks, labels) => {
  const formTaskLabel = (label) => ({
    taskId: tasks[0].id,
    labelId: label.id,
  });

  const existingTasksLabels = [labels[0]].map(formTaskLabel);

  return { seeds: existingTasksLabels };
};

export {
  generateUsers, generateStatuses, generateTasks, generateLabels, generateTasksLabels,
};
