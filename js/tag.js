function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  decodeURI(r[2]); return null;
}
function renderList(){
	var tag = GetQueryString("tag");
	if(!tag)return;
	J_tag.innerHTML=tag;
	var articleList="";
	for(var i=0,len=data2[tag].length;i<len;i++){
		articleList+='<li>'+
				'<a href="{{ site.baseurl }}'+data2[tag][i]["url"]+'">'+
					data2[tag][i]["title"]+
				'</a>'+
			'</li>';
	}
	articleList='<ul>'+articleList+'</ul>';
	J_cont.innerHTML=articleList;
	
}
renderList();
