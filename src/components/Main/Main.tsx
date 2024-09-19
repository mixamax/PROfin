import { InputBlock } from "../InputBlock/InputBlock";
import { UserInfo } from "../UserInfo/UserInfo";
import style from "./main.module.css";
import DATADTO from "../../DATA.json";
import { TableBlock } from "../Table/Table";
import { useState } from "react";
import { IData } from "../../Models/data";

const options = [
    { value: "Все бренды", label: "Все бренды" },
    ...Array.from(new Set(DATADTO.map((item) => item.product_brand))).map(
        (item) => ({ value: item, label: item })
    ),
];

export function Main() {
    const [Data, setData] = useState<IData[]>([]);

    const importData = () => {
        setData(DATADTO);
    };

    const changeCellValue = (
        barcode: number,
        value: string,
        cellType: "product_quantity" | "price"
    ) => {
        if (isNaN(Number(value)) || value.trim() === "") {
            return;
        }
        const newData = Data.map((item) => {
            if (item.barcode === barcode) {
                return { ...item, [cellType]: Number(value) };
            }

            return item;
        });

        setData(newData);
    };

    const filterData = (
        barcode: string,
        productName: IData["product_name"],
        productBrand: IData["product_brand"]
    ) => {
        const filteredData = DATADTO.filter((item) => {
            const barcodeMatch = barcode
                ? item.barcode === Number(barcode)
                : true;
            const productNameMatch = productName
                ? item.product_name.includes(productName)
                : true;
            const productBrandMatch = productBrand
                ? item.product_brand === productBrand
                : true;
            return barcodeMatch && productNameMatch && productBrandMatch;
        });

        setData(filteredData);
    };
    return (
        <div className={style.main}>
            <UserInfo />
            <InputBlock
                options={options}
                importData={importData}
                filterData={filterData}
                DATA={Data}
            />
            <TableBlock DATA={Data} changeCellValue={changeCellValue} />
        </div>
    );
}
