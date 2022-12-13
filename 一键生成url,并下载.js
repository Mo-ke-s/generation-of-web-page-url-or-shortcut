// ==UserScript==
// @name         一键生成url,并下载
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  一键生成网页url/快捷方式,并下载到本地。/One-click generation of web page url/shortcut, and download to local。
// @author       M-o-x
// @match        *://*/*
// @grant        none
// @license      MIT
// ==/UserScript==

function download_Blob(_blob, fileName) {
  const _url = URL.createObjectURL(_blob); //创建 _url 的Blob 对象。
  const $a = document.createElement("a"); //定义$a创造一个元素节点<a>.
  $a.setAttribute("href", _url); //setAttribute() 方法定义$a的href属性。
  $a.setAttribute("download", fileName); //setAttribute() 方法定义$a的download属性；变量titli_传值给fileName。
  $a.click(); //模拟点击事件。
  URL.revokeObjectURL(_blob); //释放内存;https://www.cnblogs.com/hello-dummy/p/14734524.html
}
function download_url() {
  var _url = "[InternetShortcut]\nURL=" + document.URL;
  // console.log(_url);
  var _blob = new Blob([_url], { type: "plain/text" });
  // 获取当前日期
  var date = new Date();
  // 获取当前年份
  var year = date.getFullYear();
  // 获取当前月份（注意：JavaScript 的月份是从 0 开始算的，因此这里要加 1）
  var month = date.getMonth() + 1;
  // 获取当前日期
  var day = date.getDate();
  // 拼接成想要的格式（例如：2022-12-11）
  var dateString = year + "-" + month + "-" + day;
  var _title = document.title + "_" + dateString + ".url";
  // console.log(_title);
  download_Blob(_blob, _title);
  _blob = null; //释放_blob内存; https://www.cnblogs.com/hello-dummy/p/14734524.html
}
function handleAltX(event) {
  // 检查Alt键和D键是否被按下
  if (event.altKey == true && event.key === "x") {
    //console.log("Alt+D keys are pressed!");
    download_url(); // 在这里做一些事情，比如触发一个动作或修改页面上的元素
  }
}

(function () {
  "use strict";
  // 为页面上的keydown事件绑定事件处理器
  document.addEventListener("keydown", handleAltX);
})();
