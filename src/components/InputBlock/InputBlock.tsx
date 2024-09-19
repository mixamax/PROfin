import { useState } from "react";
import style from "./inputBlock.module.css";
import { Button, Flex, Typography, Input, Select } from "antd";
import { IData } from "../../Models/data";
import { downloadAsFile } from "../../utils/downloadAsFile";

interface InputBlockProps {
    options: {
        value: string;
        label: string;
    }[];
    importData: () => void;
    filterData: (
        barcode: string,
        productName: IData["product_name"],
        productBrand: IData["product_brand"]
    ) => void;
    DATA: IData[];
}
export function InputBlock({
    options,
    importData,
    filterData,
    DATA,
}: InputBlockProps) {
    const [barcode, setBarcode] = useState("");
    const [productName, setProductName] = useState("");
    const [productBrand, setProductBrand] = useState("");

    const changeBarcode = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBarcode(e.target.value);
    };

    const changeProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value);
    };

    const changeProductBrand = (value: string) => {
        if (value === "Все бренды") {
            setProductBrand("");
            return;
        }
        setProductBrand(value);
    };

    return (
        <Flex vertical style={{ marginTop: "20px" }}>
            <Flex align="center" gap={10}>
                <Typography.Title
                    level={1}
                    style={{
                        color: "var(--secondary-color)",
                        fontSize: "30px",
                        fontWeight: "400",
                    }}
                >
                    Остатки сформированы на 01.04.2024 г.
                </Typography.Title>
                <Button type="primary" className={style["button-instructions"]}>
                    <img
                        src="src/assets/icons/copybook.svg"
                        width={20}
                        alt="инструкции"
                    />
                    Инструкции
                </Button>
            </Flex>
            <Flex gap={10} style={{ marginTop: "10px" }}>
                <CustomInput
                    text="Баркод"
                    width={150}
                    placeholder="123456789"
                    changeValue={changeBarcode}
                    type="number"
                />
                <CustomInput
                    text="Наименование"
                    width={150}
                    placeholder="бренд"
                    changeValue={changeProductName}
                    type="text"
                />
                <CustomSelect
                    options={options}
                    changeProductBrand={changeProductBrand}
                />
            </Flex>
            <Flex gap={10} style={{ marginTop: "8px" }}>
                <Button
                    style={{ height: "40px", borderRadius: "20px" }}
                    type="primary"
                    onClick={() =>
                        filterData(barcode, productName, productBrand)
                    }
                >
                    Сформировать
                </Button>
                <Button
                    style={{
                        height: "40px",
                        borderRadius: "20px",
                        backgroundColor: "var(--secondary-color)",
                    }}
                    type="primary"
                    onClick={() => downloadAsFile(DATA)}
                >
                    <img
                        src="src/assets/icons/share.svg"
                        width={16}
                        alt="экспорт"
                    />
                    Экспорт
                </Button>
            </Flex>
            <DounloadBlock importData={importData} />
        </Flex>
    );
}

interface CustomInputProps {
    text: string;
    width: number;
    placeholder: string;
    changeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
}

function CustomInput({
    text,
    width,
    placeholder,
    type,
    changeValue,
}: CustomInputProps) {
    return (
        <Flex
            align="center"
            gap={10}
            style={{
                height: "60px",
                backgroundColor: "var(--primary-color)",
                padding: "0 10px",
                borderRadius: "15px",
            }}
        >
            <Typography.Text style={{ color: "var(--secondary-color)" }}>
                {text}
            </Typography.Text>
            <Input
                style={{
                    height: "40px",
                    backgroundColor: "var(--light-row-bg-color)",
                    width,
                    borderRadius: "15px",
                    border: "none",
                }}
                placeholder={placeholder}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    changeValue(e)
                }
                type={type}
            />
        </Flex>
    );
}

interface CustomSelectProps {
    options: {
        value: string;
        label: string;
    }[];
    changeProductBrand: (value: string) => void;
}
function CustomSelect({ options, changeProductBrand }: CustomSelectProps) {
    return (
        <Flex
            align="center"
            vertical
            gap={5}
            style={{
                height: "60px",
                backgroundColor: "var(--primary-color)",
                padding: "0 10px",
                borderRadius: "15px",
            }}
        >
            <Typography.Text style={{ color: "var(--secondary-color)" }}>
                Бренд
            </Typography.Text>
            <Select
                defaultValue="Все бренды"
                style={{ width: 120, border: "none" }}
                variant="borderless"
                onChange={(value) => changeProductBrand(value)}
                options={options}
                suffixIcon={
                    <img
                        width={20}
                        alt="стрелка выбора бренда"
                        src="src/assets/icons/arrow-down.svg"
                    />
                }
            />
        </Flex>
    );
}

function DounloadBlock({ importData }: Pick<InputBlockProps, "importData">) {
    return (
        <Flex
            align="center"
            justify="space-between"
            style={{
                borderTop: "1px solid var(--border-gray-color)",
                borderBottom: "1px solid var(--border-gray-color)",
                padding: "10px 0",
                maxWidth: "800px",
                marginTop: "26px",
                paddingLeft: "6px",
                height: "42px",
            }}
        >
            <Flex gap={26}>
                <Button type="text" onClick={importData}>
                    <Flex gap={6} style={{ cursor: "pointer" }}>
                        <img
                            src="src/assets/icons/foldermove.svg"
                            alt="иконка загрузки"
                            width={18}
                        />
                        <Typography.Text
                            style={{ color: "var(--secondary-color)" }}
                        >
                            Загрузить данные из csv
                        </Typography.Text>
                    </Flex>
                </Button>
                <Flex gap={6} align="center">
                    <img
                        src="src/assets/icons/add-folder.svg"
                        alt="иконка папка с плюсом"
                        width={18}
                    />
                    <Typography.Text
                        style={{ color: "var(--secondary-color)" }}
                    >
                        Изменить данные
                    </Typography.Text>
                </Flex>
            </Flex>
            <Button type="text">
                <Typography.Text style={{ color: "var(--secondary-color)" }}>
                    Очистить
                </Typography.Text>
                <img width={20} src="src/assets/icons/cross.svg"></img>{" "}
            </Button>
        </Flex>
    );
}
