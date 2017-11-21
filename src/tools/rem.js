/**
 * Created by zhanglongyu on 2017/11/21.
 */
(function (doc, win) {
    let $body = doc.querySelector('body');
    let docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            let clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            clientWidth = clientWidth > 750 ? 750 : clientWidth;//防止被放大保证宽屏效果
            //以宽750px为例子，并扩大100倍，尽可能的保证精度
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            //缩放之后再显示页面，防止缩放过程被观察到，影响体验
            $body.style.visibility = 'visible';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);