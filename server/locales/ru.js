// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный Email или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        delete: {
          error: 'Не удалось удалить пользователя',
        },
      },
      statuses: {
        create: {
          success: 'Статус успешно создан',
          error: 'Не удалось создать статус',
        },
        edit: {
          success: 'Статус успешно отредактирован',
        },
        delete: {
          success: 'Статус успешно удален',
          error: 'Не удалось удалить статус',
        },
      },
      tasks: {
        create: {
          success: 'Задача успешно создана',
          error: 'Не удалось создать задачу',
        },
        edit: {
          success: 'Задача успешно изменена',
          error: 'Не удалось изменить задачу',
        },
        delete: {
          success: 'Задача успешно удалена',
          error: 'Задачу может удалить только её автор',
        },
      },
      labels: {
        create: {
          success: 'Метка успешно создана',
          error: 'Не удалось создать метку',
        },
        edit: {
          success: 'Метка успешно изменена',
          error: 'Не удалось изменить метку',
        },
        delete: {
          success: 'Метка успешно удалена',
          error: 'Не удалось удалить метку',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
      wrongUserError: 'Доступ запрещен! Нельзя редактировать или удалять другого пользователя.',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
        statuses: 'Статусы',
        labels: 'Метки',
        tasks: 'Задачи',
        createStatus: 'Создать статус',
        createTask: 'Создать задачу',
        createLabel: 'Создать метку',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      user: {
        id: 'ID',
        firstName: 'Имя',
        lastName: 'Фамилия',
        email: 'Email',
        createdAt: 'Дата создания',
        password: 'Пароль',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        edit: {
          submit: 'Редактировать',
        },
        delete: {
          submit: 'Удалить',
        },
      },
      status: {
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        new: {
          title: 'Создание статуса',
          submit: 'Создать',
        },
        edit: {
          title: 'Изменение статуса',
          submit: 'Редактировать',
        },
        delete: {
          submit: 'Удалить',
        },
      },
      task: {
        id: 'ID',
        name: 'Наименование',
        description: 'Описание',
        status: 'Статус',
        statusId: 'Статус',
        creator: 'Автор',
        executor: 'Исполнитель',
        executorId: 'Исполнитель',
        labels: 'Метки',
        createdAt: 'Дата создания',
        new: {
          title: 'Создание задачи',
          submit: 'Создать',
        },
        edit: {
          title: 'Изменение задачи',
          submit: 'Изменить',
        },
        delete: {
          submit: 'Удалить',
        },
      },
      label: {
        id: 'ID',
        name: 'Наименование',
        createdAt: 'Дата создания',
        new: {
          title: 'Создание метки',
          submit: 'Создать',
        },
        edit: {
          title: 'Изменение метки',
          submit: 'Изменить',
        },
        delete: {
          submit: 'Удалить',
        },
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
      actions: 'Действия',
    },
    email: 'Email',
    password: 'Пароль',
  },
};
