import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <img
        alt={t("page_not_found")}
        src="notfound.svg"
        className="img-fluid h-25"
      />
      <h1 className="h4 text-muted">{t("page_not_found")}</h1>
      <p className="text-muted">
        {t("you_can_redirect")}
        <a href="/">{t("go_home_page")}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
