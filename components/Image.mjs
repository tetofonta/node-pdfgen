import _Component from "./_Component";
import size from "image-size";

export default class Image extends _Component {

    /**
     * Creates an image compoent
     * @param image file di immagine o dati in formato url
     * @param opts width (int), height (int), scale ([scale x, scale y]), fit ([fit x, fit y]), stretch ([x, y])
     */
    constructor(
        image,
        opts = {}
    ) {
        super();
        this.image = image;

        const dim = size(this.image);
        this.options = {width: dim.width, height: dim.height};

        if (opts.scale) this.options.scale = opts.scale;
        if (opts.fit) {
            this.options.fit = opts.fit;
            this.width = this.options.fit[0];
            this.height = this.options.fit[1];
        } else if (opts.stretch) {
            if (opts.stretch[0] !== -1) {
                this.options.width = opts.stretch[0];
                this.width = opts.stretch[0];
            }
            if (opts.stretch[1] !== -1) {
                this.options.height = opts.stretch[1];
                this.height = opts.stretch[1]
            }
        }


        this.width = this.width || dim.width;
        this.height = this.height || dim.height;
    }

    _draw(
        doc,
        x,
        y
    ) {
        doc.image(this.image, x, y, this.options);
        doc.makeDefault();
    }

}