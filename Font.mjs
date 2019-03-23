import variables from './cjs.js';
const {__dirname} = variables;

export default function (fontname) {
    return __dirname + "/assets/fonts/" + fontname;
}