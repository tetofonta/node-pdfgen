import GridLayout from "./layouts/GridLayout";
import _Component from "./_Component";
import Line from "./Line";

export default class List extends _Component{
    constructor(componentList, opts = {}, w = -1, h = -1 ){
        super();
        this.list = componentList;
        this.w = w;
        this.h = h;
        this.width = 0;
        this.height = h === -1 ? 0 : h;
        this.opts = opts;
        this.frameborder = opts.frameborder || "NONE";
    }

    _draw(doc, x, y){
        if(this.w < 0) this.w = this.suggested_w;
        this.width = this.w;
        let g = new GridLayout(false, x, y, this.w);
        let list = [];
        this.list.forEach(e => {
            list.push(e);
            if(this.frameborder === "FULL")
                list.push(new Line(g.width, 0))
        });
        list.forEach((e, i) =>{
            g.addComponent(e.cmp, i, 0, Object.assign({}, e.opts, this.opts));
            doc.makeDefault();
        });
        g._set_parent_dimension(this.suggested_w, -1);
        g._draw(doc);

        if(this.frameborder === "FRAME" || this.frameborder === "FULL") {
            console.log(x, y, g.width, g.height);
            doc.rect(x, y, this.w, this.h && this.h !== -1 ? this.h : g.height).strokeColor("#000").stroke();
        }
        this.height = g.height;
    }

}