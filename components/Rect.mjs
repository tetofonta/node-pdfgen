import _Component from "./_Component";

export default class Line extends _Component {

    constructor(
        w,
        h,
        opts = {}
    ) {
        super();
        this.w = w;
        this.h = h;
        this.opts = opts;
        this.width = w;
        this.height = h;
    }

    _draw(
        doc,
        x,
        y
    ) {
        const c = doc.rect(x, y, this.w, this.h);

        Object.keys(this.opts).forEach(e => {
            switch (e){
                case "lineWidth":
                    c.lineWidth(this.opts[e]);
                    break;
                case "dash":
                    c.dash(5, {space: 10});
                    break;
                case "fillColor":
                    c.fillColor(this.opts[e]);
                    break;
                case "strokeColor":
                    c.strokeColor(this.opts[e]);
                    break;
                case "opacity":
                    c.opacity(this.opts[e]);
                    break;
                case "fillOpacity":
                    c.fillOpacity(this.opts[e]);
                    break;
            }
        });

        c.fillAndStroke();

        doc.makeDefault();
    }

}