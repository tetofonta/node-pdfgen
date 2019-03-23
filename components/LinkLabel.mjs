import _Component from "./_Component";
import Label from "./Label";

export default class LinkLabel extends Label{

    constructor(
        text,
        to,
        opts = {}
    ){
        super(text, opts);
        this.fillc = opts.fillColor || "#00F";
        this.to = to;
        this.under = opts.underlined || true;
    }

    _draw(
        doc,
        x,
        y
    ){
        super._draw(doc, x, y);
        doc.link(x, y, this.width, this.height, this.to);
        if(this.under) doc.underline(x, y, this.width, this.height, {color: this.fillc});
        doc.makeDefault();
    }

}