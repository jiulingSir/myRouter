function Dep(){
   this.subs = [];
}
Dep.prototype = {
  addSub: function(sub){
  	this.subs.push(sub);
  },
  notify: function(){
  	this.subs.forEach(function(sub){
  		sub.update();
  	})
  }
}; 
function Observer(value){
  this.walk(value);
}
Observer.prototype = {
  walk: function(obj) {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object') {
        this.walk(obj[key])
      }
      this.defineReactive(obj, key, obj[key])
    })
  },
  defineReactive: function(obj, key, value) {
	  var dep = new Dep()
	  Object.defineProperty(obj, key, {
	    get: function(){ 
	      if (Dep.target) {
	        dep.addSub(Dep.target)
	      }
	      return value
	    },
	    set: function(newValue) {
	      value = newValue
	      dep.notify()
	    }
	  })
	}
}
