import { Button } from "antd";
import { MenuCard } from "../MenuCard/MenuCard";
import { SupportCard } from "../SupportCard/SupportCard";
import style from "./aside.module.css";
export function Aside() {
    return (
        <div className={style.aside}>
            <MenuCard />
            <SupportCard />
            <Button
                type="primary"
                icon={<img width={20} src="src/assets/icons/msg.svg"></img>}
                style={{
                    height: "70px",
                    borderRadius: "20px",
                    fontSize: "18px",
                }}
            >
                Связаться с нами
            </Button>
        </div>
    );
}
