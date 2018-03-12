/**
 * 根据ID获取标签
 * @param id
 * @returns {*}
 */
function $(id) {
    return typeof id ==='string'?document.getElementById(id):null;
}

/**
 * 获取滚动的头部距离和左边距离
 * scroll().left scroll().top
 * @returns {*}
 */
function scroll() {
    if (window.pageYOffset !== null) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset
        }
    } else if (document.compatMode === "CSS1Compat") {
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }
    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }
}

