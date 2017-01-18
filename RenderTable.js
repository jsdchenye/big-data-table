(function(){
	var data = [];
	//创建一万条示例数据
	for (var i = 0; i < 10000; i++) {
		var row = { id: i, text: "text" + i };
		data.push(row);
	}
	
	//创建滚动条
	var scrbar = new Scrollbar();
	window.onload = function() {
		scrbar.CreateAt("divScroll");
		scrbar.setOptions({ total: 10000,size:300 });
		scrbar.onScroll = function(pos) {
			ShowData(pos);
		};
		
		//获取模板
		var items = scrbar.getPageItems();
		var tpl = document.getElementById("trTpl");
		tpl.parentNode.removeChild(tpl);
		
		//仅创建所看到的几十行表格，所以自然快得多
		var list = document.getElementById("tblList");
		for (var i = 0; i < data.length && i < items; i++) {
			var nr = tpl.cloneNode(true);   //从模板行复制新行
			list.appendChild(nr);
		}
		ShowData(scrbar.getPos());
	};
	
	//根据滚动条，展示数据
	function ShowData(pos) {
		var n=scrbar.getPageItems();
		var rows=document.getElementById("tblList").rows;
		for (var i = 0; i < n; i++) {
			var row = rows[i];
			var item = data[i + pos];
			row.cells["tdID"].innerHTML = item["id"];
			row.cells["tdText"].innerHTML = item["text"];
		}
	}
})();