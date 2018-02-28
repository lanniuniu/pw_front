/**
 * Created by 懒牛牛 on 2018/2/27.
 */
function adapt() {
    let clientWidth = document.body.clientWidth;
    document.querySelector("html").style.fontSize = `${clientWidth/100}px`;
}
adapt();

window.addEventListener("resize",function () {
    adapt();
});
