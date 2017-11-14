// Inherit from Obj
var Task = function () {
  Obj.apply(this, arguments);
}
Task.prototype = Object.create(Obj.prototype);
Task.prototype.constructor = Task;

Task.prototype.init = function (options) {
    var self = this;
    self.options = options;
    self.pushed = true;

    self.generateDom(function (domobj) {
        self.domobj = domobj;
        // append to dom
        if ("domparent" in self.options) {
            self.options.domparent.appendChild(domobj);
        } else {
            document.body.appendChild(domobj);
        }
    });
};

Task.prototype.generateDom = function (cb) {
    var self = this;
    
    // example
    /*
    <span class="task-label shown"><!-- or hidden -->
        <span class="task-name">
            File
        </span>
    </span>
    */
    
    // generate the dom object
    var domobj = document.createElement("span");
    domobj.className = "task-label shown";
    var span = document.createElement("span");
    span.className = "task-name";
    span.innerText = self.options.label;
    span.onclick = function () {
        self.click();
    };
    domobj.append(span);
    _cb(self, cb, domobj);
};

Task.prototype.click = function () {
    var self = this;
    self.options.window.toggle();
};

Task.prototype.pop = function () {
    var self = this;
    
    if (!self.pushed) {
        return;
    }
    self.pushed = false;
    self.domobj.className = "task-label hidden";
};

Task.prototype.push = function () {
    var self = this;
    
    if (self.pushed) {
        return;
    }
    self.pushed = true;
    self.domobj.className = "task-label shown";
};

Task.prototype.destroy = function () {
    var self = this;
    
    $(self.domobj).remove();
};