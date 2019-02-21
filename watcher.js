function Watcher(vm, exp, cb)  {
  this.$vm = vm;
  this.exp = exp;
  this.callbacks = [];
  this.callbacks.push(cb);
  this.value = this.get();
}
Watcher.prototype = {
  update: function(){
    this.run();
  },
  run: function(){
   this.callbacks.forEach(function(cb) {
      cb();
    })
  },
  get: function(){
    Dep.target = this;
    var val = this.$vm; 
    this.exp.split('.').forEach(function(key){
      val = val[key];
    }); 
    Dep.target = null;
    return val;
  }
} 