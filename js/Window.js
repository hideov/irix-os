// Inherit from Obj
var Window = function () {
  Obj.apply(this, arguments);
}
Window.prototype = Object.create(Obj.prototype);
Window.prototype.constructor = Window;

Window.prototype.init = function (options) {
    var self = this;
    self.options = options;

    self.generateDom(function (domobj) {
        // append to dom
        self.domobj = domobj;
        if ("domparent" in self.options) {
            self.options.domparent.appendChild(domobj);
        } else {
            document.body.appendChild(domobj);
        }
        
        // enable dragging
        enableDOM();
        // click itself to go on top
        setTimeout(function () {
            self.domobj.click();            
        }, 50);
        self.visible = true;
        self.task = new Task({
            domparent: document.getElementById("taskbar"),
            window: self,
            label: self.options.title
        });
    });
};

Window.prototype.generateDom = function (cb) {
    var self = this;
    
    // example
    /*
     <div class="window draggable resizable">
         <div class="title-bar">
             <span class="roll-up">
                 <svg class="rest" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                     <rect height="2" width="14" y="11" x="4" stroke-width="0" stroke="#fff" fill="#000"/>
                     <rect  height="3" width="14" y="8.5" x="2.5" stroke="#000" fill="none"/>
                     <rect height="2" width="2" y="10" x="16" stroke-width="0" stroke="#fff" fill="#000"/>
                 </svg>
                 <svg class="clicked" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                     <rect  height="3" width="14" y="9.5" x="3.5" stroke="#000" fill="none"/>
                 </svg>
             </span>
             <span class="title drag-handle">window title</span>
             <span class="minimise">
                 <svg class="rest" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                     <rect height="2" width="3" y="11" x="10" stroke-width="0" stroke="#fff" fill="#000"/>
                     <rect height="3" width="3" y="8.5" x="8.5" stroke="#000" fill="none"/>
                     <rect height="2" width="2" y="10" x="11" stroke-width="0" stroke="#fff" fill="#000"/>
                 </svg>
                 <svg class="clicked" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                     <rect height="3" width="3" y="9.5" x="9.5" stroke="#000" fill="none"/>
                 </svg>
             </span>
             <span class="close">
                 <svg class="rest" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                     <rect height="2" width="12" y="15" x="5" stroke-width="0" stroke="#fff" fill="#000"/><!-- bot shadow -->
                     <rect height="12" width="12" y="3.5" x="3.5" stroke="#000" fill="none"/><!-- box -->
                     <rect height="12" width="2" y="5" x="15" stroke-width="0" stroke="#fff" fill="#000"/><!-- right shadow -->
                 </svg>
                 <svg class="clicked" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                     <rect height="12" width="12" y="4.5" x="4.5" stroke="#000" fill="none"/><!-- box -->
                 </svg>
             </span>
         </div>
         <div class="menu-bar">
             <span class="menu-item">File<ul><li>asd</li><li>lol</li></ul></span>
             <span class="menu-item">Edit</span>
             <span class="menu-item">Help</span>
         </div>
         <div class="content"><iframe src="pages/consolez.html"></iframe></div>
         <div class="status-bar">last edit: 00-00-00</div>
     </div>
    */
    
    // generate the dom object
    
    // base object
    var domobj = document.createElement("div");
    domobj.className = "window draggable resizable";
    if ("coords" in self.options && "w" in self.options.coords) {
        domobj.style.top = self.options.size.y+"px";
    } else {
        domobj.style.top = (100 + 20*(Math.random()-0.5))+"px";
    }
    if ("coords" in self.options && "h" in self.options.coords) {
        domobj.style.left = self.options.size.x+"px";
    } else {
        domobj.style.left = (200 + 20*(Math.random()-0.5))+"px";
    }

    if ("size" in self.options) {
        if ("w" in self.options.size) {
            domobj.style.width = self.options.size.w+"px";
        }
        if ("h" in self.options.size) {
            domobj.style.height = self.options.size.h+"px";
        }
    }
    domobj.onclick = function (ev) {
        self.focus();
    };
    
    // window bar
    var windowbar = document.createElement("div");
    windowbar.className = "title-bar";
    var rollup = document.createElement("span");
    rollup.className = "roll-up btncontainer";
    
    rollup.innerHTML = '<svg class="rest" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect height="2" width="3" y="11" x="10" stroke-width="0" stroke="#fff" fill="#000"/><rect height="3" width="3" y="8.5" x="8.5" stroke="#000" fill="none"/><rect height="2" width="2" y="10" x="11" stroke-width="0" stroke="#fff" fill="#000"/></svg><svg class="clicked" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect height="3" width="3" y="9.5" x="9.5" stroke="#000" fill="none"/></svg>';
    
    rollup.onclick = function (ev) {
        var wind = $(ev.target).parent().parent();
        var content = wind.find(".content");
        var menu = wind.find(".menu-bar");
        var status = wind.find(".status-bar");

        if (content.is(":visible")) {
            wind.data("ht", wind.height());
            wind.height("unset");
            wind.resizable( "option", "handles", "e, w" );

            menu.hide();
            content.hide();
            status.hide();
        } else {
            menu.show();
            content.show();
            status.show();

            wind.height(wind.data("ht"));
            wind.resizable( "option", "handles", "all" );
        }
    };
    
    var title = document.createElement("span");
    title.className = "title drag-handle";
    title.innerText = self.options.title;
    var minimise = document.createElement("span");
    minimise.className = "minimise btncontainer";
    minimise.innerHTML = '<svg class="rest" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect height="2" width="14" y="11" x="4" stroke-width="0" stroke="#fff" fill="#000"/><rect  height="3" width="14" y="8.5" x="2.5" stroke="#000" fill="none"/><rect height="2" width="2" y="10" x="16" stroke-width="0" stroke="#fff" fill="#000"/></svg><svg class="clicked" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect  height="3" width="14" y="9.5" x="3.5" stroke="#000" fill="none"/></svg>';
    
    minimise.onclick = function () {
        // minimise
        self.hide();
    };
    
    var close = document.createElement("span");
    close.className = "close btncontainer";
    close.innerHTML = '<svg class="rest" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect height="2" width="12" y="15" x="5" stroke-width="0" stroke="#fff" fill="#000"/><!-- bot shadow --><rect height="12" width="12" y="3.5" x="3.5" stroke="#000" fill="none"/><!-- box --><rect height="12" width="2" y="5" x="15" stroke-width="0" stroke="#fff" fill="#000"/><!-- right shadow --></svg><svg class="clicked" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect height="12" width="12" y="4.5" x="4.5" stroke="#000" fill="none"/><!-- box --></svg>';
    
    close.onclick = function (ev) {
        self.close();
    };
    
    windowbar.appendChild(rollup);
    windowbar.appendChild(title);
    windowbar.appendChild(minimise);
    windowbar.appendChild(close);
    
    // menu bar
    var menu = document.createElement("div");
    menu.className = "menu-bar";

    // file menu
    var file = document.createElement("span");
    file.classList = "menu-item";
    file.innerText = "File";
    var file_ul = document.createElement("ul");
    // mouseleave works, but I don't want it
    // $(file_ul).mouseleave(function () {
    //     $(file_ul).hide();
    // });
    var file_ul_close = document.createElement("li");
    file_ul_close.innerText = "Close";
    file_ul_close.onclick = function () {
        self.close();
    };
    file_ul.appendChild(file_ul_close);
    file.appendChild(file_ul);
    menu.appendChild(file);

    // edit menu
    var edit = document.createElement("span");
    edit.classList = "menu-item";
    edit.innerText = "Edit";
    var edit_ul = document.createElement("ul");
    var edit_ul_copy = document.createElement("li");
    edit_ul_copy.innerText = "Copy";
    if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
        // not working on firefox
        edit_ul.appendChild(edit_ul_copy);
    }
    var edit_ul_select_all = document.createElement("li");
    edit_ul_select_all.innerText = "Select all";
    edit_ul.appendChild(edit_ul_select_all);
    edit.appendChild(edit_ul);
    menu.appendChild(edit);

    // help menu
    var help = document.createElement("span");
    help.classList = "menu-item";
    help.innerText = "Help";
    var help_ul = document.createElement("ul");
    var help_ul_about = document.createElement("li");
    help_ul_about.innerText = "About";
    help_ul_about.onclick = function () {
        // about os window
        new Window({
            title: "About",
            page: "pages/about.html",
            status: ""
        });
    };
    help_ul.appendChild(help_ul_about);
    help.appendChild(help_ul);
    menu.appendChild(help);
    
    // content and status
    
    var content = document.createElement("div");
    content.className = "content";
    var iframe = document.createElement("iframe");
    if (self.options.page) {
        iframe.src = self.options.page;
    } else if (self.options.index) {
        // fetch page from github and reconstruct dom
        // retrieve pages from github
        var user = "hideov"
        var repo = "irix-os"
        var subdir = "/pages/"
        $.ajax({
            url: "https://api.github.com/repos/"+user+"/"+repo+"/contents/"+subdir+"/"+self.options.filename,
            data: undefined,
            success: function (data, status, jqXHR) {
                var html = atob(data.content);
                iframe.contentDocument.body.innerHTML += html; // nasty, strip non body part and handle head
            },
            dataType: "json"
        });
    }
    iframe.onload = function () {
        // inject javascript to the iframe that takes care of z-indices
        iframe.contentDocument.body.onclick = function (ev) {
            self.focus();
        };
        
        iframe.contentDocument.designMode = "on";
//        iframe.contentWindow.pidwmCopy = function () {
//            console.log(this.document);
//            console.log(this.document.designMode);
//            console.log(this.document.execCommand("Copy"));
//        };
        
        // inject css for styling agnostic page
        var cssLink = document.createElement("link") 
        cssLink.href = "../css/page.css"; 
        cssLink .rel = "stylesheet"; 
        cssLink .type = "text/css"; 
        iframe.contentDocument.body.appendChild(cssLink);
    };
    content.appendChild(iframe);
    
    var status = document.createElement("div");
    status.className = "status-bar";
    status.innerText = self.options.status;
    
    
    // some specific menu action
//    var editFunction = function () {
//        return $.Deferred().resolve().promise();
//    };
//    
//    edit_ul_copy.onclick = function () {
//        editFunction().then(function () {
//            // copy selected code to clipboard
//            console.log("copy")
//            iframe.contentDocument.execCommand("copy");
//        });    
//    };
    
//    function copy() {
//        iframe.contentDocument.execCommand("copy");
//    }
//    edit_ul_copy.addEventListener("click", copy);
    
    edit_ul_copy.onclick = function () {
//        iframe.contentWindow.pidwmCopy();
        iframe.contentDocument.execCommand("copy");
    };
    
    edit_ul_select_all.onclick = function () {
        // copy selected code to select all inside iframe
        var select = function (element) {
            // https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
            var doc = iframe.contentDocument;
            var win = iframe.contentWindow;
            var text = element, range, selection
            ;    
            if (doc.body.createTextRange) {
                range = doc.body.createTextRange();
                range.moveToElementText(text);
                range.select();
            } else if (win.getSelection) {
                selection = win.getSelection();        
                range = doc.createRange();
                range.selectNodeContents(text);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        };
        select(iframe.contentDocument.body);
    };
    var hideMenuses = function (ev) {
        if (ev.target.className.indexOf("menu-item") > -1) {
            return;
        }
        self.menu_active = false;
        $(file_ul).hide();
        $(edit_ul).hide();
        $(help_ul).hide();
        $(document).off("click");
        $(iframe.contentDocument).off("click");
    };
    file.onclick = function () {
        if (self.menu_active) {
            $(file_ul).hide();
            self.menu_active = false;
        } else {
            $(file_ul).show();
            self.menu_active = true;
        }
//        $(file_ul).toggle();
        $(edit_ul).hide();
        $(help_ul).hide();
//        self.menu_active = true;
        setTimeout(function () {
            $(document).on('click', hideMenuses);
            $(iframe.contentDocument).on('click', hideMenuses);
        }, 100);
    };
    file.onmouseover = function () {
        if (!self.menu_active) {
            return;
        }
        $(file_ul).show();
        $(edit_ul).hide();
        $(help_ul).hide();
    };
    edit.onclick = function () {
        if (self.menu_active) {
            $(edit_ul).hide();
            self.menu_active = false;
        } else {
            $(edit_ul).show();
            self.menu_active = true;
        }
        $(file_ul).hide();
        $(help_ul).hide();
        setTimeout(function () {
            $(document).on('click', hideMenuses);
            $(iframe.contentDocument).on('click', hideMenuses);
        }, 100);
    };
    edit.onmouseover = function () {
        if (!self.menu_active) {
            return;
        }
        $(edit_ul).show();
        $(file_ul).hide();
        $(help_ul).hide();
    };
    help.onclick = function () {
        if (self.menu_active) {
            $(help_ul).hide();
            self.menu_active = false;
        } else {
            $(help_ul).show();
            self.menu_active = true;
        }
        $(file_ul).hide();
        $(edit_ul).hide();
        setTimeout(function () {
            $(document).on('click', hideMenuses);
            $(iframe.contentDocument).on('click', hideMenuses);
        }, 100);
    };
    help.onmouseover = function () {
        if (!self.menu_active) {
            return;
        }
        $(help_ul).show();
        $(file_ul).hide();
        $(edit_ul).hide();
    };
    
    domobj.appendChild(windowbar);
    domobj.appendChild(menu);
    domobj.appendChild(content);
    domobj.appendChild(status);
    
    _cb(self, cb, domobj);
};

Window.prototype.show = function () {
    var self = this;
    
    if (self.visible) {
        return;
    }
    // click itself to go on top
    self.domobj.click();
    self.visible = true;
    // show the obj 
    $(self.domobj).show();
    // toggle task style
    self.task.push();
};

Window.prototype.hide = function () {
    var self = this;
    
    if (!self.visible) {
        return;
    }
    self.visible = false;
    // hide the obj 
    $(self.domobj).hide();
    // toggle task style
    self.task.pop();   
};

Window.prototype.toggle = function () {
    var self = this;
    
    if (self.visible) {
        self.hide();
    } else {
        self.show();
    }
};

Window.prototype.close = function () {
    var self = this;
    
    self.task.destroy();
    $(self.domobj).remove();
};

Window.prototype.focus = function () {
    var self = this;
    
    // maybe could force a show here, maybe not.
    
    var largestZ = 1;
    $(".window").each(function (i) {
        var currentZ = parseInt($(this).css("zIndex"));
        largestZ = currentZ > largestZ ? currentZ : largestZ;
    });
    self.domobj.style.zIndex = (largestZ+1);
};