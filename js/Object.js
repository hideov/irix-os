var Obj = function () {
    var self = this;
    self.init.apply(self, arguments);
};

Obj.prototype.init = function (options) {
    var self = this;
    self.options = options;

    self.generateDom(function (domobj) {
        // append to dom
        if ("domparent" in self.options) {
            self.options.domparent.appendChild(domobj);
        } else {
            document.body.appendChild(domobj);
        }
    });
};

Obj.prototype.generateDom = function (cb) {
    var self = this;
    // generate the dom object
    var domobj = {};
    _cb(self, cb, domobj);
};
