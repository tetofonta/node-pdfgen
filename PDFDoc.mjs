import PDFDocument from "pdfkit"
import fs from "fs"
import variables from './cjs';
const {__dirname} = variables;

const defaultSize = 11;

export default class PDFDoc extends PDFDocument{

    constructor(
        file,
        size,
        opts = {}
    ){
        super({
            size: size,
            layout: opts.orientation,
            autoFirstPage: false
        });
        this.addPage({margin: 0});
        this.file = file;
        this.components = [];
        this.size = [this.page.width, this.page.height];

        this.default_fontcolor = opts.fontColor || "#000";
        this.default_font = opts.font || __dirname + "/assets/fonts/Roboto-Regular.ttf";
        this.default_fontsize = opts.fontSize || 11;
        this.default_stroke = opts.strokeColor || "#000";
        this.page = 1;
        this.makeDefault()
    }

    makeDefault(){
        this.font(this.default_font).fontSize(this.default_fontsize).fillColor(this.default_fontcolor);
        this.moveTo(0,0).strokeColor(this.default_stroke).fillColor("#FFF").opacity(1).fillOpacity(1).strokeOpacity(1).dash(5, {space: 0}).lineWidth(0)
    }

    addComponent(
        cmp
    ){
        this.components.push(cmp);
        cmp._register(this, this.components.length - 1);
        return this;
    }

    remove(
        id
    ){
        this.components.forEach((e, i, a) => {
            if(e.id === id) a.splice(i, a)
        })
    }

    _invert(
        a,
        b
    ){
        let c = this.components[a];
        this.components[a] = this.components[b];
        this.components[b] = c;
    }

    move(
        dir,
        id
    ){
        let component = -1;
        for(let i = 0, len = this.components.length; i < len; i++) if(this.components[i].id === id) component = i;
        if(component === -1) throw new Error("NO COMPONENT IN ARRAY");

        switch (dir){
            case "UP":
                if(component === this.components.length - 1) break;
                this._invert(component, component + 1);
                break;
            case "DOWN":
                if(component === 0) break;
                this._invert(component, component - 1);
                break;
            case "FG":
                this._invert(component, this.components.length - 1);
                break;
            case "BG":
                this._invert(component, 0);
                break;
            default:
                throw Error("UNKNOWN DIRECTION")
        }
    }

    draw(){
        this.pipe(fs.createWriteStream(this.file));
        for (let e of this.components){
            e._draw(this);
            this.makeDefault();
        }
        this.end()
    }

    addDocPage(opt = {}){
        if(!opt.margin) opt.margin = 0;
        this.page += 1;
        this.components.push({_draw: (doc) => doc.addPage(opt)});
        return this;
    }
}
