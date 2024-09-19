import { IData } from "../Models/data";

export function downloadAsFile(data: IData[]) {
    let json = JSON.stringify(data);
    let a = document.createElement("a");
    let file = new Blob([json], { type: "application/json" });
    a.href = URL.createObjectURL(file);
    a.download = "table.json";
    a.click();
}
