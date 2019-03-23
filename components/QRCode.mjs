import _Component from "./_Component";
import QRC from "qrcode-generator";
import svgPath from "svg-path"

export default class QRCode extends _Component {

    constructor(
        text,
        scale,
        opts = {}
    ) {
        super();
        this.text = text;
        this.ec = opts.errorCorrection || 'M';
        this.scale = scale;
    }

    _draw(
        doc,
        x,
        y
    ) {
        this.width = 100;
        this.height = 100;
        let qr = QRC(0, this.ec);
        qr.addData(this.text);
        qr.make();
        let svg = qr.createSvgTag();
        svg = svg.substring(208, svg.length - 44);
        let path = svgPath(svg);
        path.abs();
        path.matrix(this.scale, 0, 0, this.scale, x, y);
        doc.path(path.toString()).fillColor("#000").fillAndStroke();
        doc.makeDefault();
    }

}
