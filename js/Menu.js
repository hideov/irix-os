// Inherit from Obj
var Menu = function () {
  Obj.apply(this, arguments);
}
Menu.prototype = Object.create(Obj.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.generateDom = function (cb) {
    var self = this;
    
    // example
    /*
    <div class="menu draggable">
    <span class="drag-handle">main menu</span>
    <ul>
        <li><a href="#/?asd">asd</a></li>
        <li><a href="#/?lol">lol</a></li>
        <li><a href="#/?simpsonwave">simpsonwave</a></li>
    </ul>
    </div>
    */
    
    // generate the dom object
    var domobj = document.createElement("div");
    domobj.className = "menu draggable";
    domobj.style.left = self.options.coords.x+"px";
    domobj.style.top = self.options.coords.y+"px";
    var span = document.createElement("span");
    span.className = "drag-handle";
    span.innerText = self.options.caption;
    var ul = document.createElement("ul");
    
    for (var i = 0; i < self.options.entries.length; i++) {
        var ent = self.options.entries[i];
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.className = "a"
        a.innerText = ent.label;
        a.href = ent.page;
        a.onclick = function (ev) {
            ev.preventDefault();
            // open a page
            new Window({
                title: ent.label,
                 page: ent.page,
                index: ent.index,
                status: ""
            });
        };
        li.appendChild(a);
        ul.appendChild(li);
    }
    
    domobj.append(span);
    domobj.append(ul);
    _cb(self, cb, domobj);
};