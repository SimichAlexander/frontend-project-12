import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export default i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: {
        hexletChat: "Hexlet Chat",
        login: "Войти",
        logout: "Выйти",
        username: "Ваш ник",
        password: "Пароль",
        confirmPassword: "Подтвердите пароль",
        chat: "Чат",
        channels: "Каналы",
        send: "Отправить",
        noAccount: "Нет аккаунта?",
        registration: "Регистрация",
        register: "Зарегистрироваться",
        toMainPage: "на главную страницу",
        canGo: "Но вы можете перейти",
        pageNotFound: "Страница не найдена",
        channels: "Каналы",
        enterYourMessage: "Введите ваше сообщение",
      },
    },
  },
  lng: "ru",
  fallbackLng: "ru",

  interpolation: {
    escapeValue: false,
  },
});
