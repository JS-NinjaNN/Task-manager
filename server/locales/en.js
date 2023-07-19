// @ts-check

export default {
  translation: {
    appName: 'Task Manager',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        delete: {
          success: 'User successfully deleted',
          error: 'Failed to delete user',
        },
      },
      statuses: {
        create: {
          success: 'Status successfully created',
          error: 'Failed to create a status',
        },
        edit: {
          success: 'Status successfully edited',
        },
        delete: {
          status: 'Status successfully deleted',
          error: 'Failed to delete status',
        },
      },
      tasks: {
        create: {
          success: 'Task sucсessfully created',
          error: 'Failed to create a task',
        },
        edit: {
          success: 'The task has been successfully modified',
          error: 'Failed to change the task',
        },
        delete: {
          success: 'Task successfully deleted',
          error: 'A task can be deleted only by its author',
        },
      },
      labels: {
        create: {
          success: 'Label successfully created',
          error: 'Failed to create a label',
        },
        edit: {
          success: 'The label has been successfully modified',
          error: 'Failed to change the label',
        },
        delete: {
          success: 'Label successfully deleted',
          error: 'Failed to delete the label',
        },
      },
      authError: 'Access denied! Please login',
      wrongUserError: 'Access denied! You cannot edit or delete another user.',
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
        statuses: 'Statuses',
        labels: 'Labels',
        tasks: 'Tasks',
        createStatus: 'Create a status',
        createTask: 'Create a task',
        createLabel: 'Create a label',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Login',
          submit: 'Login',
        },
      },
      user: {
        id: 'ID',
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Email',
        createdAt: 'Created at',
        password: 'Password',
        new: {
          submit: 'Save',
          signUp: 'Sign Up',
        },
        edit: {
          submit: 'Edit',
        },
        delete: {
          submit: 'Delete',
        },
      },
      status: {
        id: 'ID',
        name: 'Title',
        createdAt: 'Created at',
        new: {
          title: 'Create a status',
          submit: 'Create',
        },
        edit: {
          title: 'Changing the status',
          submit: 'Edit',
        },
        delete: {
          submit: 'Delete',
        },
      },
      task: {
        id: 'ID',
        name: 'Title',
        description: 'Description',
        status: 'Status',
        statusId: 'Status',
        creator: 'Creator',
        executor: 'Executor',
        executorId: 'Executor',
        labels: 'Labels',
        createdAt: 'Created at',
        new: {
          title: 'Create a task',
          submit: 'Create',
        },
        edit: {
          title: 'Changing the task',
          submit: 'Edit',
        },
        delete: {
          submit: 'Delete',
        },
      },
      label: {
        id: 'ID',
        name: 'Title',
        createdAt: 'Created at',
        new: {
          title: 'Create a label',
          submit: 'Create',
        },
        edit: {
          title: 'Changing the label',
          submit: 'Edit',
        },
        delete: {
          submit: 'Delete',
        },
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
      actions: 'Actions',
    },
    email: 'Email',
    password: 'Password',
  },
};
