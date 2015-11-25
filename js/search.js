dataSearch=dataSearch.replace(/\s/g,'');// 过滤空白字符
dataSearch=JSON.parse(dataSearch);// 格式化字符串为json

// 取url参数
function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  decodeURI(r[2]); return null;
}
// 遍历数组，根据关键字得到结果数组
function search(){
	var keyword = GetQueryString("keyword"),data=[];
	for(var i=0,len=dataSearch.length;i<len;i++){
		if(dataSearch[i]['title'].indexOf(keyword)!=-1
			||dataSearch[i]['content'].indexOf(keyword)!=-1){
			data.push(dataSearch[i]);
		}
	}
	return data;
}
// 将搜索结果拼接渲染到页面
function renderList(){
	var wrap = document.querySelector('.search-result'),htmlStr='';
	var data = search();
	var keyword = GetQueryString("keyword"),img,res;
	for(var i=0,len=data.length;i<len;i++){
		res = getImg(data[i]['content']);
		if(res){
			img  = '<img src="'+res+'" width="100" class="fl search-pic">';
		}else{
			img ='';
		}

		htmlStr+='<ul class="underline">\
               <li class="search-result-li">\
               		<a href="'+data[i]['url']+'" class="color-00f fw">'+highlight(data[i]['title'],keyword)+'</a>\
               		<div class="oh">\
               			'+img+'\
               			<span>'+getSummary(data[i]['content'],keyword)+'</span>\
               		</div>\
               </li>\
			</ul>';
	}
	wrap.innerHTML = htmlStr;
}
renderList();
// 给关键字高亮
function highlight(str,keyword){
	var reg = new RegExp(keyword,'g');
	if(str.indexOf(keyword)!=-1){
		return str.replace(reg,'<span class="search-result-keyword">'+keyword+'</span>');
	}else{
		return str;
	}
	
}
// 获取概要
function getSummary(str,keyword){
	var reg1Str = '[。,！,？]*([^。,！,？]*'+keyword+')';
	var reg1 = new RegExp(reg1Str),strReturn;
	var b=str.replace(reg1,function(word){
	    var last = 50- arguments[1].length;
	    var c = str.split(arguments[1]);
	    if(c[1].length>last){
	        var str1 = c[1].substr(0,last);
	        var str2 = arguments[1].replace(keyword,'<span>'+keyword+'</span>')+str1+'...';
	        strReturn=str2;
	    }else{
	    	strReturn=str;
	    }
	});
	if(strReturn){ // 主体内容有关键字的情况
		strReturn=highlight(strReturn,keyword);
	}else{ // 主体内容无关键字
		if(str.length>50){
			strReturn=str.substr(0,50)+'...';
		}else{
			strReturn=str;
		}
		
	}
	strReturn = delHtml(strReturn);
	return strReturn;
}
// 从content主体内容中被转义的img标签中找到图片地址
function getImg(str){
	var reg = /([^\/]+)\.jpg/;
	var res = str.match(reg);
	if(res){
		return '/img/'+res[1]+'.jpg';
	}else{
		return false;
	}
}
// 过滤掉content主体内容中已经转义的html标签
function delHtml(str){
	var reg = /&lt;\/[a-z]*&gt;|&lt;[a-z]*&gt;/g;
	var res=str.replace(reg,'');
	return res;
}