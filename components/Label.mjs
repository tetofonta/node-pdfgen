import _Component from "./_Component";
import opentype from "opentype.js"
import Canvas from 'canvas'
import variables from '../cjs';
const {__dirname} = variables;

export default class Label extends _Component {

    /**
     * Crea un etichetta
     * @param text testo dell'etichetta
     * @param opts font (font path str), size (int), fillColor (str)
     *
     * @bug Non supporta testi multilinea
     */
    constructor(
        text,
        opts = {}
    ) {
        super();
        this.text = text;
        this.font = opts.font || __dirname + "/assets/fonts/Roboto-Regular.ttf";
        this.size = opts.size || 11;
        this.fillc = opts.fillColor || "#000000";
        const canvas = new Canvas.Canvas(100, 100);
        const ctx = canvas.getContext('2d');
        let font = opentype.loadSync(this.font);

        let ascent = 0,
            descent = 0,
            width = 0,
            scale = 1 / font.unitsPerEm * this.size,
            glyphs = font.stringToGlyphs(this.text);

        for (let i = 0, len = glyphs.length; i < len; i++) {
            let glyph = glyphs[i];
            if (glyph.advanceWidth)
                width += glyph.advanceWidth * scale;
            if (i < glyphs.length - 1) {
                let kerningValue = font.getKerningValue(glyph, glyphs[i + 1]);
                width += kerningValue * scale;
            }

            let _glyph$getMetrics = glyph.getMetrics();

            let yMin = _glyph$getMetrics.yMin;
            let yMax = _glyph$getMetrics.yMax;

            ascent = Math.max(ascent, yMax);
            descent = Math.min(descent, yMin);
        }
        this.width = width;
        this.height = this.size / .75
    }

    _draw(
        doc,
        x,
        y
    ) {
        doc.font(this.font).fontSize(this.size).fillColor(this.fillc).text(this.text, x, y);
        doc.makeDefault();
    }

}