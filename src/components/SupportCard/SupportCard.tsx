import style from "./supportCard.module.css";

const items = [
    "Пользовательское соглашение",
    "Политика конфиденциальности",
    "Юридическая информация",
    "Публичная оферта",
];

export function SupportCard() {
    return (
        <div className={style.supportCard}>
            <h3 className={style["supportCard-title"]}>
                Техническая поддержка
            </h3>
            <div className={style["support-details-container"]}>
                <div className={style["support-detail-wrapper"]}>
                    <span className={style["support-detail-title"]}>
                        Номер поддержки:
                    </span>
                    <span className={style["support-detail-value"]}>
                        8(999) 999 99 99
                    </span>
                </div>
                <div className={style["support-detail-wrapper"]}>
                    <span className={style["support-detail-title"]}>
                        Почта поддержки:
                    </span>
                    <span className={style["support-detail-value"]}>
                        pf1@werthesest.ru
                    </span>
                </div>
            </div>
            <div className={style["support-detail-wrapper"]}>
                <span className={style["support-detail-title"]}>
                    Часы работы:
                </span>
                <span className={style["support-detail-value"]}>
                    Пн-Пт: с 9:00 до18:00 мск
                </span>
            </div>
            <div className={style["support-link-container"]}>
                {items.map((item) => (
                    <div key={item} className={style["support-link-wrapper"]}>
                        <a className={style["support-link"]}>{item}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}
