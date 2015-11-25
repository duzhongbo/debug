// 轮换背景
function changeBg(){
	var data=changeBg.data;
	var first= data.shift();
	data.push(first);
	document.getElementsByTagName('body')[0].className="bg-000 "+data[0];
}
changeBg.data=[
'bg0','bg1','bg2'
];
// 给标题绑定点击事件
var handleTitle = document.querySelector('.index-title');
handleTitle.onclick=function(){
	changeBg();
}