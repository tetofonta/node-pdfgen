import _Component from "./_Component";

export default class Line extends _Component {

    /**
     * CRea una linea
     * @param length lunghezza
     * @param angle angolo (rads)
     * @param opts @see pdfkit
     */
    constructor(
        length,
        angle,
        opts = {}
    ) {
        super();
        this.length = length;
        this.angle = angle;
        this.opts = opts;
        this.width = this.length*Math.cos(this.angle);
        this.height = this.length*Math.sin(this.angle);
    }

    _draw(
        doc,
        x,
        y
    ) {
        const line = doc.moveTo(x, y).lineTo(x + this.length*Math.cos(this.angle), y + this.length*Math.sin(this.angle));

        Object.keys(this.opts).forEach(e => {
            switch (e){
                case "lineWidth":
                    line.lineWidth(this.opts[e]);
                    break;
                case "lineCap":
                    line.lineCap(this.opts[e]);
                    break;
                case "dash" && this.opts['dash']:
                    line.dash(5, {space: 10});
                    break;
                case "strokeColor":
                    line.strokeColor(this.opts[e]);
                    break;
                case "opacity":
                    line.opacity(this.opts[e]);
                    break;
            }
        });

        line.stroke();

        doc.makeDefault();
    }

}