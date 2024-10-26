import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <img
        alt={t("pageNotFound")}
        src="notfound.svg"
        className="img-fluid h-25"
      />
      <h1 className="h4 text-muted">{t("pageNotFound")}</h1>
      <p className="text-muted">
        {"Но вы можете перейти "}
        <a href="/">{t("toMainPage")}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
