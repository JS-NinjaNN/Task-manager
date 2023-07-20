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
          success: 'Пользователь успешно удален',
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
      actions: 'Действия',
    },
    email: 'Email',
    password: 'Пароль',
  },
};
