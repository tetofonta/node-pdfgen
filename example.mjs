import PDFDoc from "pdfgen/PDFDoc"
import Label from "pdfgen/components/Label";
import Image from "pdfgen/components/Image";
import Line from "pdfgen/components/Line";
import GridLayout from "pdfgen/components/layouts/GridLayout";
import SimpleTable from "pdfgen/components/SimpleTable";
import QRCode from "pdfgen/components/QRCode"
import F from "pdfgen/Font.mjs"

let doc = new PDFDoc("ciao.pdf", "A4")
    .addComponent(new GridLayout(false, 10, 10, 588)
        .addComponent(
            new GridLayout()
                .addComponent(new Image("/home/stefano/Pictures/evil.png", {stretch: [75, 75]}), 0, 0, {halign: "left", valign: "CENTER", rowspan: 2, padding: [50, 0]})
                .addComponent(new Label("TETOFONTA s.r.l.", {size: "28", font: F("Roboto-Bold.ttf")}), 0, 1, {valign: "CENTER", halign:"RIGHT"})
                .addComponent(new GridLayout()
                        .addComponent(new Label("FATTURA N.ro", {size: "16"}), 0, 0, {colspan: 2})
                        .addComponent(new Label("255/2019", {size: "16", font: F("Roboto-Bold.ttf")}), 0, 2, {halign: "RIGHT"})
                        .addComponent(new Label("Emessa in data", {size: "12"}), 1, 1, {padding: [0, 10]})
                        .addComponent(new Label("31/04/2015", {size: "12", font: F("Roboto-Bold.ttf")}), 1, 2, {halign: "RIGHT", padding: [0, 10]})
                        .addComponent(new Label("Stato", {size: "12"}), 2, 1)
                        .addComponent(new Label("SOSPESO", {size: "12", font: F("Roboto-Bold.ttf")}), 2, 2, {halign: "RIGHT"})
                ,1, 1)
                .addComponent(new Line(380, 0), 2, 0, {colspan: 2, halign: "RIGHT"})
        ,0, 0)
        .addComponent(new GridLayout()
                .addComponent(new Label("*255/2019*", {font: F("fre3of9x.ttf"), size: 50}), 0, 0, {halign: "CENTER"})
                .addComponent(new SimpleTable([
                    ["Dati cliente:"],
                    ["Nome e Cognome:", "STEFANO FONTANA"],
                    ["Codice Fiscale/PI:", "NONEILMIOCODICE"],
                    ["Inidrizzo:", "Via f.lli Bonardi 3"],
                    ["Nazione:", "ITALY"],
                ]), 0, 1, {colspan: 2, bg: "#EEE"})
            , 1, 0, {padding: [0, 20]})
        .addComponent(new SimpleTable([
            ["006587410", "Servizio riparazione pc tre anni", "1", "115.00", "115.00"],
            ["006587410", "Servizio riparazione pc tre anni", "1", "115.00", "115.00"],
            ["006587410", "Servizio riparazione pc tre anni", "1", "115.00", "115.00"],
            ["006587410", "Servizio riparazione pc tre anni", "1", "115.00", "115.00"],
        ], {coloredCols: true, coloredColor: "#DDD", weights: [1, 5, 1, 1, 1], header: ["CODICE", "DESCRIZIONE", "QTA", "PREZZO", "TOTALE P."], frameborder: "FRAME"}, -1, 300), 2, 0, {padding: [0, 50]})
        .addComponent(new GridLayout()
                .addComponent(new SimpleTable([
                    ["Totale imponibile:", "460.00"],
                    ["IVA:", "22.-%"],
                    ["IVA ammontare:", "101.20"],
                    ["Spedizione:", "30.80"],
                    ["Sconto:", "-50.00"]
                ], {weights: [2, 1], frameborder: "FULL", border: "RIGHT"}), 0, 1)
                .addComponent(new QRCode("Thisisacommonqrcodewithdata", 1.1, {errorCorrection: "H"}), 0, 0, {rowspan: 2})
                .addComponent(new Label("TOTALE: 542.00 EUR", {size: 24, font: F("Roboto-Bold.ttf")}), 1, 1, {halign: "CENTER"})
        ,3, 0)
        .addComponent(new Line(590, 0), 4, 0)
        .addComponent(new GridLayout()
            .addComponent(new Label("Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nCurabitur id tempus magna, luctus aliquet arcu. Cras posuere mi lorem, commodo viverra augue malesuada quis.\nPraesent dignissim hendrerit lobortis. Nunc sodales, metus sed commodo interdum, sapien nulla convallis diam, eu varius sapien ex a ante. ", {size: 9}), 0, 0, {colspan: 9})
            .addComponent(new Label("1/1"), 0, 10)
        , 5, 0)
    );

doc.draw();