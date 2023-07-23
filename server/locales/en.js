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
          error: 'Something went wrong',
        },
      },
      users: {
        create: {
          success: 'User registered successfully',
          error: 'Failed to register',
        },
        edit: {
          success: 'User successfully edited',
          error: 'Failed to edit',
          wrongUser: 'Access denied! You cannot edit or delete another user.',
        },
        delete: {
          success: 'User successfully deleted',
          error: 'Failed to delete user',
          wrongUser: 'Access denied! You cannot edit or delete another user.',
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
          wrongUser: 'A task can be deleted only by its author',
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
        RU: 'RU',
        EN: 'EN',
        createStatus: 'Create a status',
        createTask: 'Create a task',
        createLabel: 'Create a label',
      },
    },
    views: {
      statuses: {
        title: 'Statuses',
        id: 'ID',
        name: 'Title',
        createdAt: 'CreatedAt',
        action: {
          create: 'Create a status',
          delete: 'Delete',
          change: 'Edit',
        },
        form: {
          create: 'Submit',
        },
        edit: {
          title: 'Change the status',
        },
      },
      labels: {
        title: 'Labels',
        createBtn: 'Create a label',
        table: {
          id: 'ID',
          name: 'Title',
          createdAt: 'Created at',
          action: {
            change: 'Edit',
            delete: 'Delete',
          },
        },
        new: {
          title: 'Create a label',
          submit: 'Submit',
        },
        edit: {
          title: 'Change the label',
          submit: 'Submit',
        },
      },
      form: {
        placeholders: {
          email: 'Email',
          password: 'Password',
          name: 'Title',
          firstName: 'First name',
          lastName: 'Last name',
          description: 'Description',
          statusId: 'Status',
          executorId: 'Executor',
          labels: 'Labels',
        },
        filter: {
          status: 'Status',
          executor: 'Executor',
          isCreatorUser: 'Only my tasks',
          submit: 'Submit',
          label: 'Label',
        },
      },
      session: {
        new: {
          signIn: 'Sign in',
          submit: 'Submit',
        },
      },
      users: {
        id: 'ID',
        firstName: 'First name',
        lastName: 'Last name',
        fullName: 'Full name',
        email: 'Email',
        createdAt: 'Created at',
        new: {
          submit: 'Submit',
          signUp: 'Sign up',
        },
        action: {
          change: 'Edit',
          delete: 'Delete',
        },
        title: 'Users',
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Practical programming courses',
          more: 'Learn More',
        },
      },
      tasks: {
        title: 'Tasks',
        createBtn: 'Create a task',
        edit: {
          title: 'Change the task',
          submit: 'Submit',
        },
        table: {
          action: {
            change: 'Edit',
            delete: 'Delete',
          },
          id: 'ID',
          name: 'Title',
          status: 'Status',
          author: 'Creator',
          executor: 'Executor',
          createdAt: 'Created at',
        },
        new: {
          title: 'Create a task',
          submit: 'Submit',
        },
        page: {
          action: {
            change: 'Edit',
            delete: 'Delete',
          },
          creator: 'Creator',
          executor: 'Executor',
          createdAt: 'Created at',
        },
      },
      actions: 'Actions',
    },
  },
};
