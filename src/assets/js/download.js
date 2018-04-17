/**
 * Created by 懒牛牛 on 2018/3/30.
 */

const download = function (fileName, content) {
    let link = document.createElement('a');
    let blob = new Blob([content]);
    let event = document.createEvent("MouseEvents");
    event.initEvent("click", false, false);
    link.download = fileName + ".md";
    link.href = URL.createObjectURL(blob);
    link.dispatchEvent(event);
};
export default download;