
function HashHistory(vm){ 
  this.router = vm;
  window.addEventListener('hashchange', () => {
    this.transitionTo(this.getCurrentLocation())
  });
	this.current = {
	  path: '/',
    name: '',
    route: vm.routes
	}
}
HashHistory.prototype = { 
	   /**
   * 路由转换
   * @param target 目标路径
   * @param cb 成功后的回调
   */
  transitionTo: function(target, cb) {
    // 通过对比传入的 routes 获取匹配到的 targetRoute 对象
    var targetRoute = match(target, this.router.routes); 
    this.current.route = targetRoute
    this.current.name = targetRoute.name
    this.current.path = targetRoute.path  
  },  
  getCurrentLocation: function() {
	  var href = window.location.hash || '#/'; 
	  return href.replace('#', '');
	}
}
 
function match(path, routeMap) {
  var match = {}; 
    for(var route of routeMap) {  
      if (route.path === path) {
        match = route
      }
    } 
  return match
} 

function router(options){
  this.container = options.id; 
  this.routes = options.routes;
  this.history = new HashHistory(this);
    this.init();
}
router.prototype = {
   render:function() {
      var i = this.history.current; 
      if (i && (i = i.route) && (i = i.component)) {
        document.getElementById(this.container).innerHTML = i;
        console.log(i)
      }
    },

  init() {
    var history = this.history
    new Observer(this.history.current);
    new Watcher(this.history.current, 'route', this.render.bind(this))
    history.transitionTo(history.getCurrentLocation())
  }
}