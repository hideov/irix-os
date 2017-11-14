var _cb = function (self, cb) {
    if (typeof cb === "function") {
        // drop first two arguments
        var args = Array.prototype.slice.call(arguments, 2);
        return cb.apply(self, args);
    }
};

var enableDOM = function () {
    // make all objects resizable/draggable.
    // may mean that after appending more windows, have to rerun :S 
    // could do a general drag/resize each time, or a specific one
    // as we add stuff
    $(".draggable").draggable({ handle: ".drag-handle" });

    $( ".resizable" ).resizable({
        handles: "all",
        minHeight: 96,
        minWidth: 192,
    });
};