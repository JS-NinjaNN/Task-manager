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
        edit: {
          success: 'User successfully edited',
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
      statuses: {
        title: 'Статусы',
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        action: {
          create: 'Создать статус',
          delete: 'Удалить',
          change: 'Изменить',
        },
        form: {
          create: 'Создать',
        },
        edit: {
          title: 'Изменение статуса',
        },
      },
      labels: {
        title: 'Метки',
        createBtn: 'Создать метку',
        table: {
          id: 'ID',
          name: 'Наименование',
          createdAt: 'Время создания',
          action: {
            change: 'Изменить',
            delete: 'Удалить',
          },
        },
        new: {
          title: 'Создание метки',
          submit: 'Создать',
        },
        edit: {
          title: 'Изменение метки',
          submit: 'Изменить',
        },
      },
      form: {
        placeholders: {
          email: 'Email',
          password: 'Пароль',
          name: 'Наименование',
          firstName: 'Имя',
          lastName: 'Фамилия',
          description: 'Описание',
          statusId: 'Статус',
          executorId: 'Исполнитель',
          labels: 'Метки',
        },
        filter: {
          status: 'Статус',
          executor: 'Исполнитель',
          isCreatorUser: 'Только мои задачи',
          submit: 'Показать',
          label: 'Метка',
        },
      },
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        id: 'ID',
        firstName: 'Имя',
        lastName: 'Фамилия',
        fullName: 'Полное имя',
        email: 'Email',
        createdAt: 'Дата создания',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        action: {
          change: 'Изменить',
          delete: 'Удалить',
        },
        title: 'Пользователи',
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
      tasks: {
        title: 'Задачи',
        createBtn: 'Создать задачу',
        edit: {
          title: 'Изменение задачи',
          submit: 'Изменить',
        },
        table: {
          action: {
            change: 'Изменить',
            delete: 'Удалить',
          },
          id: 'ID',
          name: 'Наименование',
          status: 'Статус',
          author: 'Автор',
          executor: 'Исполнитель',
          createdAt: 'Дата создания',
        },
        new: {
          title: 'Создание задачи',
          submit: 'Создать',
        },
        page: {
          action: {
            change: 'Изменить задачу',
            delete: 'Удалить задачу',
          },
          creator: 'Создатель',
          executor: 'Исполнитель',
          createdAt: 'Дата создания',
        },
      },
      actions: 'Actions',
    },
  },
};
