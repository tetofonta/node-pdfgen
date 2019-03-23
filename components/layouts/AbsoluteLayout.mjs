import _Layout from "./_Layout"

export default class AbsoluteLayout extends _Layout{

    /**
     * Class constructor.
     * L'aggiunta del componente avviene ovunque in base alle coordinate decise.
     * @param basex
     * @param basey
     * @param width
     * @param height
     */
    constructor(basex = 0, basey = 0, width = -1, height = -1) {
        super(basex, basey, width, height);
        this.width = 0;
        this.height = 0;
    }

    /**
     * Aggiunge un componente al layout
     * @param cmp il componente (? super _Component)
     * @param x coordinata x
     * @param y coordinata y
     * @return this
     */
    addComponent(
        cmp,
        x,
        y
    ) {
        return super.addComponent({cmp: cmp, x: x, y: y});
    }

    _draw(
        doc
    ) {
        this.components.forEach(e =>{
            let c = this.coord_pair(e.x, e.y);
            e.cmp._draw(doc, c.x, c.y);
            if(e.x + e.cmp.width > this.width) this.width = e.x + e.cmp.width;
            if(e.y + e.cmp.height > this.height) this.height = e.y + e.cmp.height;
        })
    }
}