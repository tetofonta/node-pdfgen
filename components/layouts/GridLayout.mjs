import _Layout from "./_Layout"
import PDFDoc from "../../PDFDoc";

export default class GridLayout extends _Layout {

    constructor(drawRect = false, basex = 0, basey = 0, width = -1, height = -1) {
        super(basex, basey, width, height);
        this.grid = [];
        this.drawRect = drawRect;
        this.width = this.lay_width;
    }

    addComponent(
        cmp,
        row,
        col,
        opts = {}
    ) {
        if (cmp.signature === "_Layout") {
            let foodock = new PDFDoc("", "A4");
            cmp._draw(foodock);
            foodock = undefined;
        }
        const rowspan = opts.rowspan || 1;
        const colspan = opts.colspan || 1;
        const valign = opts.valign || "CENTRE";
        const halign = opts.halign || "LEFT";
        const padding = opts.padding || [0, 0];

        if (this.grid[row] && this.grid[row][col] && this.grid[row][col].status === "LOCKED") throw Error("Component already placed here =(");
        if (!this.grid[row]) this.grid[row] = [];
        this.grid[row][col] = {
            cmp: cmp,
            val: valign,
            hal: halign,
            colspan: colspan,
            rowspan: rowspan,
            padding: padding,
            bg: opts.bg,
            border: opts.border,
            border_color: opts.border_color,
            status: "LOCKED"
        };
        for (let i = 1; i < rowspan - 1; i++) {
            for (let j = 1; j < colspan - 1; j++) {
                if (!this.grid[row + i]) this.grid[row + i] = [];
                this.grid[row + i][col + i] = {status: "LOCKED"}
            }
        }
        return this;
    }

    __get_col_number() {
        return this.grid.reduce((a, v) => {
            if (a < v.length) return v.length;
            else return a;
        }, -1)
    }

    static __get_line_h(arr) {
        return arr.reduce((a, v) => {
            if (a < v.cmp.height) return v.cmp.height + v.padding[1];
            else return a;
        }, -1);
    }

    __get_rowspan(row, col) {
        if (row === this.grid.length - 1) return GridLayout.__get_line_h(this.grid[row]) * this.grid[row][col].rowspan;
        let rh = 0;
        for (let i = 0; i < this.grid[row][col].rowspan; i++) {
            let lineh = GridLayout.__get_line_h(this.grid[row + i]);
            if (lineh === -1) {
                lineh = this.grid[row][col].cmp.height;
                this.grid[row + i][col + i].cmp = {height: this.grid[row][col].cmp.height}
            }
            rh += lineh /** this.grid[row][col].rowspan*/;
        }
        return rh;
    }

    static __getOffsets(hal, val, colw, linh, cmw, cmh, px, py) {

        let offsets = [0, 0];

        if (hal === "LEFT") offsets[0] = 0;
        else if (hal === "RIGHT") offsets[0] = colw - cmw;
        else if (hal === "CENTER") offsets[0] = (colw - cmw) / 2;

        if (val === "TOP") offsets[1] = 0;
        else if (val === "BOTTOM") offsets[1] = linh - cmh;
        else if (val === "CENTER") offsets[1] = (linh - cmh) / 2;

        return [offsets[0] + px, offsets[1] + py];
    }

    _draw(
        doc
    ) {
        const colWidth = (this.suggested_w && this.suggested_w !== -1 ? this.suggested_w : this.lay_width) / this.__get_col_number();
        let curY = 0;
        for (let [line, e] of this.grid.entries()) {
            let lineH = 0;
            if(!e) continue;
            for (let [colm, p] of e.entries()) {
                if (p && (p.cmp.signature === "_Component" || p.cmp.signature === "_Layout")) {
                    const offsets = GridLayout.__getOffsets(p.hal, p.val, colWidth * p.colspan, this.__get_rowspan(line, colm), p.cmp.width, p.cmp.height, p.padding[0], p.padding[1]);
                    const component_pos = this.coord_pair(colWidth * colm + offsets[0], curY + offsets[1]);
                    const bindRect_pos = this.coord_pair(colWidth * colm, curY);
                    p.cmp._set_parent_dimension(colWidth, -1);
                    lineH = GridLayout.__get_line_h(e);
                    if (p.cmp.signature === "_Layout") p.cmp._set_parent_coords(component_pos.x, component_pos.y);
                    if (p.bg || p.border) {
                        let rect = doc.rect(bindRect_pos.x, bindRect_pos.y, colWidth * p.colspan, this.__get_rowspan(line, colm)).fillOpacity(0).strokeOpacity(0);
                        if (p.bg) rect.fillOpacity(1).fillColor(p.bg);
                        if (p.border === "FULL") rect.strokeOpacity(1);
                        if (p.border_color) rect.strokeColor(p.border_color);
                        rect.fillAndStroke();
                        doc.makeDefault();
                        if (p.border === "RIGHT")
                            doc.moveTo(bindRect_pos.x + colWidth * p.colspan, bindRect_pos.y)
                                .lineTo(bindRect_pos.x + colWidth * p.colspan, bindRect_pos.y + this.__get_rowspan(line, colm)).stroke();
                        doc.makeDefault();
                    }
                    p.cmp._draw(doc, component_pos.x, component_pos.y);
                    if (this.drawRect) {
                        doc.rect(bindRect_pos.x, bindRect_pos.y, colWidth * p.colspan, this.__get_rowspan(line, colm))
                            .fillColor("#CC0")
                            .fillOpacity(.1)
                            .strokeColor("#000")
                            .fillAndStroke();
                        doc.rect(component_pos.x, component_pos.y, p.cmp.width, p.cmp.height)
                            .fillColor("#AAA")
                            .fillOpacity(.1)
                            .strokeColor("#F00")
                            .fillAndStroke();
                        doc.makeDefault();
                    }
                }
            }
            curY += lineH;
        }
        this.height = curY;
    }
}