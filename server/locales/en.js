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
      },
      status: {
        create: {
          success: 'Статус успешно создан',
        },
        edit: {
          success: 'Статус успешно отредактирован',
        },
        delete: {
          status: 'Статус успешно удален',
        },
      },
      authError: 'Access denied! Please login',
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
