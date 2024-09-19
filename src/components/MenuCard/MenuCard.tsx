import { MenuItem } from "../MenuItem/MenuItem";
import style from "./menuCard.module.css";

const items = [
    {
        svgPath: "src/assets/icons/settings.svg",
        text: "Настройки",
        alt: "настройки",
    },
    {
        svgPath: "src/assets/icons/docpen.svg",
        text: "Внесение данных",
        alt: "внесение данных",
    },
    {
        svgPath: "src/assets/icons/notyfication.svg",
        text: "Отчеты",
        alt: "отчеты",
    },
    {
        svgPath: "src/assets/icons/copybook.svg",
        text: "База знаний",
        alt: "база знаний",
    },
];

export function MenuCard() {
    return (
        <menu className={style.menuCard}>
            <div className={style["menuCard-title-block"]}>
                <h2 className={style["menuCard-title"]}>
                    <span className={style["with-background"]}>ФИН</span>
                    <span> Контроль</span>
                </h2>
                <button className={style["title-button"]}>
                    <span className={style["title-button-text"]}>Меню</span>
                    <img width={16} src="src/assets/icons/cross.svg"></img>{" "}
                </button>
            </div>
            {items.map((item) => (
                <MenuItem
                    svgPath={item.svgPath}
                    text={item.text}
                    alt={item.alt}
                    key={item.text}
                />
            ))}
        </menu>
    );
}
