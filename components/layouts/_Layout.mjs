import _Component from "../_Component"

export default class _Layout extends _Component{

    constructor(
        basex,
        basey,
        width = -1,
        height = -1
    ) {
        super();
        this.bx = basex;
        this.by = basey;
        this.w = width;
        this.h = height;
        this.lay_width = this.w;
        this.lay_height = this.h;
        this.signature = "_Layout";
        this.components = [];
    }

    _register(doc, id){
        super._register(doc, id);
        if(this.w === -1) this.lay_width = this.doc_width;
        if(this.h === -1) this.lay_height = this.doc_height;
    }

    coord_pair(
        x,
        y
    ){
        return {x: x + this.bx, y: y + this.by}
    }


    addComponent(
        cmp
    ){
        this.components.push(cmp);
        return this;
    }

    _set_parent_coords(x, y){
        this.bx = x;
        this.by = y;
    }

    _draw(
        doc
    ){
        throw Error("DRAW IS UNDEFINED FOR THIS CLASS");
    }
}