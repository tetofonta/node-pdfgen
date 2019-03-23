import _Layout from "./_Layout"

export default class AbsoluteLayout extends _Layout{

    constructor(basex = 0, basey = 0, width = -1, height = -1) {
        super(basex, basey, width, height);
        this.maxH = 0;
    }

    addComponent(
        cmp
    ) {
        if(this.maxH < cmp.height) this.maxH = cmp.height;
        return super.addComponent(cmp);
    }

    _draw(
        doc
    ) {
        let curx = 0;
        let cury = 0;
        let line = 0;
        this.components.forEach(e =>{

            if(e.width > this.lay_width) throw Error("COMPONENT TOO WIDE");

            if(curx + e.width > this.lay_width){
                curx = 0;
                cury = this.maxH * ++line;
            }
            let c = this.coord_pair(curx, cury + (this.maxH / 2 - e.height/2));
            e._draw(doc, c.x, c.y);
            curx += e.width;
        })
    }
}