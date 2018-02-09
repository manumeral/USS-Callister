'use strict';

let TextUtil = {
    createText: function (game, obj) {
        let textStyle = {
            font: obj.font,
            fontSize: obj.fontSize,
            align: obj.align,
            fill: obj.fill,
            fontWeight: obj.fontWeight,
            wordWrapWidth: obj.wordWrapWidth,
            backgroundColor: obj.backgroundColor
        };

        let _anchorX = (obj.anchorX === undefined) ? 0 : obj.anchorX;
        let _anchorY = (obj.anchorY === undefined) ? 0 : obj.anchorY;

        let text = game.add.text(obj.positionX, obj.positionY, obj.message, textStyle);
        text.anchor.setTo(_anchorX, _anchorY);
        text.wordWrap = obj.wordWrap || false;
        text.useAdvancedWrap = obj.wordWrap || false;
        obj.wordWrap && text.padding.set(20,20);
        return text;
    },
    countLines: function(obj) {
        return obj.precalculateWordWrap(obj.text).length;
    }
};

export default TextUtil;