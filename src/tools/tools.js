/**
 * Created by zhanglongyu on 2017/12/4.
 */
export const Tool = {};

//滚动条滚动高度
function getDocumentTop() {
    let scrollTop, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

//可视窗口高度
function getWindowHeight() {
    let windowHeight;
    if (document.compatMode === "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

//文档高度
function getScrollHeight() {
    let scrollHeight, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

Tool.loadMore = async (dom, fn) => { //到底加载更多  @param dom 上拉元素  @param fn 回调方法
    dom.onscroll = function () {
        if (getDocumentTop() + getWindowHeight() === getScrollHeight()) {
            fn();
        }
    };
};

Tool.refresh = (dom, fn) => { //下拉下载更多  @param dom 滑动组件  @param fn 回调方法
    let pageY_start = 0;
    let refreshY = 0;
    dom.style.transform = `translate3d(0,${refreshY}px,0)`;
    dom.addEventListener('touchstart', function (event) {
        let touch = event.targetTouches[0];
        pageY_start = touch.pageY;
    });
    dom.addEventListener('touchmove', function (event) {
        let touch = event.targetTouches[0];
        if (getDocumentTop() === 0) {
            refreshY = refreshY + touch.pageY - pageY_start;
            if (refreshY > 0) {   //当处于下拉刷新时上推不影响滚动条
                event.preventDefault();
            }
            dom.style.transform = `translate3d(0,${refreshY}px,0)`;
            pageY_start = touch.pageY;
        }
    });
    dom.addEventListener('touchend', function () {
        if (refreshY < 70) {
            refreshY = 0;
            dom.style.transform = `translate3d(0,${refreshY}px,0)`;
        } else {
            refreshY = 70;
            fn();
            setTimeout(function () {
                refreshY = 0;
                dom.style.transform = `translate3d(0,${refreshY}px,0)`;
            }, 1500);
            dom.style.transform = `translate3d(0,${refreshY}px,0)`;
        }
    })
};

Tool.getTimeDiff = function (time) {   //就近时间格式化，@param '2017-07-21 21:10:11'
    let publish_time = new Date(time).getTime();
    let nowTime = new Date().getTime();
    let diffTime = (nowTime - publish_time) / (60 * 1000 * 60 * 24);
    let showTime = '';
    if (diffTime < 1) {
        diffTime = (nowTime - publish_time) / (60 * 1000 * 60);
        if (diffTime > 12) {
            showTime = '半天前'
        } else {
            if (diffTime < 1) {
                showTime = '刚刚';
            } else {
                showTime = `${Math.floor(diffTime)}小时前`
            }
        }
    } else if (diffTime < 20 && diffTime > 1) {
        showTime = `${Math.floor(diffTime)}天前`
    } else {
        showTime = time.split(' ')[0];
    }
    return showTime
};