import { EditableRow, EditableCell } from "./RowAndCell";
import type { TableProps } from "antd";
import { Table, ConfigProvider } from "antd";
import { IData } from "../../Models/data";
import { EditableCellProps } from "./RowAndCell";

interface TableBlockProps {
    DATA: IData[];
    changeCellValue: (
        barcode: number,
        value: string,
        cellType: "product_quantity" | "price"
    ) => void;
}

type ColumnTypes = Exclude<TableProps["columns"], undefined>;

const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
})[] = [
    {
        title: "Баркод",
        dataIndex: "barcode",
        key: "barcode",
        sorter: (a, b) => a.barcode - b.barcode,
    },
    {
        title: "Бренд",
        dataIndex: "product_brand",
        key: "product_brand",
        sorter: (a, b) => a.product_brand.localeCompare(b.product_brand),
    },
    {
        title: "Название",
        dataIndex: "product_name",
        key: "product_name",
        sorter: (a, b) => a.product_name.localeCompare(b.product_name),
    },
    {
        title: "Количество",
        dataIndex: "product_quantity",
        key: "product_quantity",
        sorter: (a, b) => a.product_quantity - b.product_quantity,
        editable: true,
    },
    {
        title: "Цена",
        dataIndex: "price",
        key: "price",
        sorter: (a, b) => a.price - b.price,
        editable: true,
    },
];

const columns = defaultColumns.map((col) => {
    if (!col.editable) {
        return col;
    }
    return {
        ...col,
        onCell: (record: IData) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
        }),
    };
});

export function TableBlock({ DATA, changeCellValue }: TableBlockProps) {
    const totalQuantity = DATA.reduce(
        (acc, item) => acc + item.product_quantity,
        0
    );
    const totalPrice = DATA.reduce(
        (acc, item) => acc + item.price * item.product_quantity,
        0
    );
    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: { headerBg: "transparent", rowHoverBg: "#657193" },
                },
            }}
        >
            <Table
                components={{
                    body: {
                        row: EditableRow,
                        cell: (props: EditableCellProps) => {
                            return EditableCell({ ...props, changeCellValue });
                        },
                    },
                }}
                style={{
                    width: "1100px",
                    marginTop: "20px",
                    borderRadius: "80px",
                    fontSize: "20px",
                }}
                rowClassName={(_, index) => (index % 2 === 0 ? "odd" : "even")}
                columns={columns as ColumnTypes}
                dataSource={DATA}
                virtual
                pagination={false}
                scroll={{ x: 1200, y: 300 }}
                rowKey="id"
                onChange={(pagination, filters, sorter, extra) => {
                    console.log("params", pagination, filters, sorter, extra);
                }}
                summary={() => (
                    <Table.Summary fixed>
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0}>
                                Итого:
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1} colSpan={2} />
                            <Table.Summary.Cell index={3}>
                                {totalQuantity}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={4} colSpan={4}>
                                {"Сумма: " +
                                    totalPrice.toLocaleString("ru-RU", {
                                        style: "currency",
                                        currency: "RUB",
                                    })}
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </Table.Summary>
                )}
            />
        </ConfigProvider>
    );
}
