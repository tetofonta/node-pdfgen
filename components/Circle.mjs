import _Component from "./_Component";

export default class Line extends _Component {

    /**
     * Create a circle component
     * @param radius raggio della circonferenza
     * @param opts lineWidth (int), dash (bool), fillColor (str), strokeColor (str), opacity (number 0 <= x <= 1), fillOpacity (number 0 <= x < = 1)
     */
    constructor(
        radius,
        opts = {}
    ) {
        super();
        this.rad = radious;
        this.opts = opts;
        this.width = 2 * radius;
        this.height = this.width;
    }

    _draw(
        doc,
        x,
        y
    ) {
        const c = doc.circle(this.rad+x, this.rad+y, this.rad);

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