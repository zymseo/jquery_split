/*
* Description: jQuery部分源码拆分学习，持续更新中
*
*/
(function(){
		// jQuery构造函数
		function jQuery(str){
			this.obj = this.init(str);
		}

		// 初始化init方法，用于操作dom元素
		jQuery.prototype.init = function (str) {
			var firstC = str.charAt(0);
			var selector = '';
			var arr = [];
			if(firstC == '#'){
				selector = str.substring(1);
				arr[0] = document.getElementById(selector);
				return arr;
			}else if(firstC == '.'){
				selector = str.substring(1);
				if(document.getElementsByClassName){
					return document.getElementsByClassName(selector);
				}
				var tag = document.getElementsByTagName('*');
				var tagLen = tag.length;
				var reg = new RegExp('\\b' + selector + '\\b');
				for(var i=0; i<tag.length; i++){
					if(reg.test(tag[i].className)){
						arr.push(tag[i]);
					}
				}
				return arr;
			}else{
				return document.getElementsByTagName(str);
			}
		};

		// each方法
		jQuery.prototype.each = function(fn){
			var obj = this.obj;
			var objLen = obj.length;
			for(var i=0; i<objLen; i++){
				fn.call(this.obj[i]);
			}
			return this;
		};

		// css方法
		jQuery.prototype.css = function (opt) {
			var opt = opt;
			for (var prop in opt) {
				this.each(function () {
					this.style[prop] = opt[prop];
				});
			}
		};

		// 设置或获取attr属性
		jQuery.prototype.attr = function (key, value) {
			var attr = null;
			if (value) {
				this.each(function () {
					this.setAttribute(key, value);
				});
				return this;
			} else {
				this.each(function () {
					attr = this.getAttribute(key);
				});
				return attr;
			}
		};

		// addClass添加css类
		jQuery.prototype.addClass = function (str) {
			var tmpArry = str.split(' '),
				tmpArryLen = tmpArry.length;
				
			this.each(function () {
				var _classes = this.className.split(' ');
				for (var i = 0; i < tmpArryLen; i++) {
					_classes.push(tmpArry[i]);
				}
				this.className = _classes.join(' ').trim();
			});
			return this;
		};

		// removeClass移除css类
		jQuery.prototype.removeClass = function (str) {
			var tmpArry = str.split(' '),
				tmpArryLen = tmpArry.length;

			this.each(function () {
				var _classes = this.className.split(' '),
					_classesLen = _classes.length;
				for (var i = 0; i < _classesLen; i++) {
					for (var j = 0; j < tmpArryLen; j++) {
						if (_classes[i] === tmpArry[j]) {
							_classes[i] = '';
							break;
						}
					}
				}
				this.className = _classes.join(' ').trim();
			});
			return this;
		};
		
		// $函数，实际上是return一个jQuery实例对象
		function $(str){
			return new jQuery(str);
		}
		window.$ = $;
	})();