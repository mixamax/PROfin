import type { GetRef, InputRef } from "antd";
import type { Ref } from "react";
import { Form, Input } from "antd";

import {
    createContext,
    useRef,
    useState,
    useEffect,
    useContext,
    forwardRef,
} from "react";

type FormInstance<T> = GetRef<typeof Form<T>>;

const EditableContext = createContext<FormInstance<any> | null>(null);

interface Item {
    key: string;
    barcode: number;
    product_brand: string;
    product_name: string;
    product_quantity: number;
    price: number;
}

interface EditableRowProps {
    index: number;
}

export const EditableRow = forwardRef(
    ({ index, ...props }: EditableRowProps, ref) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false} ref={ref as Ref<any>}>
                <EditableContext.Provider value={form}>
                    <div {...props} />
                </EditableContext.Provider>
            </Form>
        );
    }
);

export interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
    children: React.ReactNode;
    changeCellValue: (
        barcode: number,
        value: string,
        cellType: "product_quantity" | "price"
    ) => void;
}

export const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    changeCellValue,
    ...restProps
}: EditableCellProps) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            changeCellValue(
                record.barcode,
                values[dataIndex],
                dataIndex as "price" | "product_quantity"
            );
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0, padding: "0 20px 0 0" }}
                name={dataIndex}
                rules={[{ required: true, message: `${title} is required.` }]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingInlineEnd: 24 }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <div {...restProps}>{childNode}</div>;
};
