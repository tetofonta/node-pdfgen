import GridLayout from "./layouts/GridLayout";
import Line from "./Line";
import List from "./List";
import Label from "./Label";

export default class SimpleTable extends List{

    static _col(array, int){
        let acc = 0;
        for(let i = 0; i < int; i++) acc += (array[i] ? array[i] : 1);
        return acc;
    }

    constructor(table, opts = {}, w = -1, h = -1 ){
        const arr = [];
        const coloredRows = opts.coloredRows || false;
        const coloredCols = opts.coloredCols || false;
        const coloredColor = opts.coloredColor;
        const header = opts.header;
        let weights = opts.weights || [];
        if(header) {
            let headerG = new GridLayout();
            header.forEach((e, i) => {
                let l = new Label(e, opts);
                l.height += 5;
                headerG.addComponent(l, 0, SimpleTable._col(weights, i), {border: "FULL", border_color: "#000", colspan: weights[i]})
            });
            arr.push(headerG);
        }
        table.forEach((e, row) => {
            let line = new GridLayout();
            e.forEach((q, col) => {
                let l = new Label(q, opts);
                l.height += 5;
                line.addComponent(l, row, SimpleTable._col(weights, col), Object.assign({colspan: weights[col]}, opts, ((coloredRows && row % 2 === 0) || (coloredCols && col % 2 === 0)) ? {bg: coloredColor} : {}));
            });
            arr.push(line);
        });
        super(arr, opts, w, h);
    }
}