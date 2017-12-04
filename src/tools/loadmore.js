/**
 * Created by zhanglongyu on 2017/12/4.
 */
export const Load = {};
Load.loadMore = (dom, fn) => {
    dom.addEventListener('scroll', function () {
        let viewHeight = this.documentElement.clientHeight,
            contentHeight = this.documentElement.scrollHeight,
            scrollTop = this.documentElement.scrollTop;
        if (contentHeight - scrollTop - viewHeight === 0) {
            fn();
        }
    })
};
let divParent = document.createElement('div'),
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    div3 = document.createElement('div');
divParent.className = 'spinner';
div1.className = 'bounce1';
div2.className = 'bounce2';
div3.className = 'bounce3';
divParent.appendChild(div1);
divParent.appendChild(div2);
divParent.appendChild(div3);

Load.refresh = () => {

}