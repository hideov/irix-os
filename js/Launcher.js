// Inherit from Obj
var Launcher = function () {
  Obj.apply(this, arguments);
}
Launcher.prototype = Object.create(Obj.prototype);
Launcher.prototype.constructor = Launcher;

Launcher.prototype.generateDom = function (cb) {
    var self = this;
    
    // example
    /*
    <div class="launcher draggable">
    <img class="drag-handle" src="res/launchers/console.png"/>
    <hr>
    <span><a href="#?/console">Console</a></span>
    </div>
    */
    
    // generate the dom object
    var domobj = document.createElement("div");
    domobj.className = "launcher draggable";
    domobj.style.left = self.options.coords.x+"px";
    domobj.style.top = self.options.coords.y+"px";
    var img = document.createElement("img");
    img.className = "drag-handle";
    img.src = self.options.image;
    var hr = document.createElement("hr");
    var span = document.createElement("span");
    var a = document.createElement("a");
    a.innerText = self.options.caption;
    a.href = "#/?"+self.options.caption;
    a.onclick = function (ev) {
        ev.preventDefault();
        self.click();
    };
    span.appendChild(a);
    domobj.appendChild(img);
    domobj.appendChild(hr);
    domobj.append(span);
    _cb(self, cb, domobj);
};

Launcher.prototype.click = function () {
    var self = this;
    // open a page
    new Window({
        title: self.options.caption,
        page: self.options.page,
        status: ""
    });
    enableDOM();
};