import { Button, Space, Flex, Typography } from "antd";
import style from "./userInfo.module.css";

export function UserInfo() {
    return (
        <div className={style.userInfo}>
            <img src="src/assets/icons/user.svg" width={26} alt="аватар" />
            <Typography.Text className={style["userInfo-text"]}>
                Иванов И.И.
            </Typography.Text>
            <Flex className={style["date"]} align="center">
                <img
                    src="src/assets/icons/calendar.svg"
                    width={20}
                    alt="календарь"
                />
                <Typography.Text className={style["date-text"]}>
                    Тариф до 15.04.2024
                </Typography.Text>
            </Flex>
            <Space size={8} style={{ marginLeft: "auto" }}>
                <Button className={style["userInfo-button"]}>Выйти</Button>
                <Button
                    type="primary"
                    className={`${style["userInfo-button"]} ${style["orange-bg"]}`}
                >
                    О нас
                </Button>
            </Space>
        </div>
    );
}
