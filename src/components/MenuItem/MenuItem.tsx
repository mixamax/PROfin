import style from "./menuItem.module.css";

export interface MenuItemProps {
    svgPath: string;
    text: string;
    alt: string;
}
export function MenuItem({ svgPath, text, alt }: any) {
    return (
        <div className={style.menuItem}>
            <img width={16} src={svgPath} alt={alt} />
            <span className={style["menuItem-text"]}>{text}</span>
            <img
                className={style["menuItem-arrow"]}
                width={16}
                src="src/assets/icons/arrow-down.svg"
                alt={alt}
            />
        </div>
    );
}
