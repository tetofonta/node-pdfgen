export default class _Component {

    constructor() {
        this.id = -1;
        this.document = null;
        this.width = undefined;
        this.height = undefined;
        this.cmp = this;
        this.signature = "_Component"
    }

    _register(doc, id) {
        this.document = doc;
        this.id = id;
        this.doc_width = doc.size[0];
        this.doc_height = doc.size[1];
    }

    delete() {
        this.document.remove(this.id);
    }

    move(
        dir
    ) {
        this.document.move(dir, this.id);
    }

    _draw(
        doc,
        x,
        y
    ) {
        throw Error("DRAW IS UNDEFINED FOR THIS CLASS");
    }

    _set_parent_dimension(w, h){
        this.suggested_w = w;
        this.suggested_h = h;
    }
}