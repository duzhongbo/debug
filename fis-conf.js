// 目录规范与域名配置
fis.config.set('roadmap.path',[
    // _site目录文件不编译
    {
        reg : /^\/_site\/[\S+\/]*.*/i,
        useCompile :false,
        useHash : false
    },
	//定义html的产出路径
	{
		reg : '**.html',
		release : '/duzhongbo.github.io$&'
	},
	//定义js的产出路劲
	{
		reg : '**.js',
        url : '$&',
		release : '/duzhongbo.github.io$&'
	},
    //定义css的产出路劲
    {
        reg : '**.css',
        url : '$&',
        release : '/duzhongbo.github.io$&'
    },
     // 所有img目录下的.png，.gif文件
    {
        reg : /^\/img\/(.*\.(?:png|gif|jpg))/i,
        //访问这些图片的url是 '/m/xxxx?log_id=123'
        url : '$&',
        //发布到/static/pic/xxx目录下
        release : '/duzhongbo.github.io$&'
    },

]);