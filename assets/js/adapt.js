/**
 * Created by 懒牛牛 on 2018/2/27.
 */
export default function () {
    let clientWidth = document.body.clientWidth;
    document.querySelector("html").style.fontSize = `${clientWidth / 100}px`;
    window.addEventListener("resize", function () {
        let clientWidth = document.body.clientWidth;
        document.querySelector("html").style.fontSize = `${clientWidth / 100}px`;
    });
}
