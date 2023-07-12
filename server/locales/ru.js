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
      },
      statuses: {
        create: {
          success: 'Статус успешно создан',
        },
        edit: {
          success: 'Статус успешно отредактирован',
        },
        delete: {
          success: 'Статус успешно удален',
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
        createdAt: 'Дата создания',
        new: {
          title: 'Создание задачи',
          submit: 'Создать',
        },
        edit: {
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
