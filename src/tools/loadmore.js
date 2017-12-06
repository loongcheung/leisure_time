/**
 * Created by zhanglongyu on 2017/12/4.
 */
export const Load = {};

Load.loadMore = async (dom, fn) => {
    dom.addEventListener('scroll', function () {
        let viewHeight = this.documentElement.clientHeight,
            contentHeight = this.documentElement.scrollHeight,
            scrollTop = this.documentElement.scrollTop;
        if (contentHeight - scrollTop - viewHeight === 0) {
            fn();
        }
    })
};

Load.refresh = (dom, fn) => {
    let pageY_start = 0;
    let refreshY = 0;
    dom.style.transform = `translate3d(0,${refreshY}px,0)`;
    dom.addEventListener('touchstart', function (event) {
        let touch = event.targetTouches[0];
        pageY_start = touch.pageY;
    });
    dom.addEventListener('touchmove', function (event) {
        let touch = event.targetTouches[0];
        refreshY = refreshY + touch.pageY - pageY_start;
        dom.style.transform = `translate3d(0,${refreshY}px,0)`;
        pageY_start = touch.pageY;
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