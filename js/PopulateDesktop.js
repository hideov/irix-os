// list of objects to create 
var desktopObjects =
[
    {
        type: Launcher,
        options: {
            coords: {
                x: $(window).width() - 130,
                y: 75,
            },
            caption: "Consolez",
            image: "res/launchers/console.png",
            page: "pages/console.html"
          }
    },
    {
        type: Menu,
        options: {
            coords: {
                x: 50,
                y: 50,
            },
            caption: "πDwm",
            entries: [
                {
                    label: "home",
                    page: "pages/home.html"
                },
                {
                    label: "crypto\xa0\xa0\xa0\xa0",
                    page: "pages/crypto.html"
                },
                {
                    label: "design",
                    page: "pages/design.html"
                },
            ]
        }
    }
];

$( function() {

/*
    // retrieve pages from github
    var user = "hideov"
    var repo = "irix-os"
    var subdir = "/pages/"
    $.ajax({
        url: "https://api.github.com/repos/"+user+"/"+repo+"/contents/"+subdir+"/",
        data: undefined,
        success: function (data, status, jqXHR) {
            for (var i = 0; i < data.length; i++) {
                var entry = data[i];
                desktopObjects[1].options.entries.push({
                    label: entry.name.split(".htm")[0],
                    index: i,
                    filename: entry.name
                });
            }
            
            // create all objects
            for (var i = 0; i < desktopObjects.length; i++) {
                var obj = desktopObjects[i];
                new obj.type(obj.options);
            }

            enableDOM();
        },
        dataType: "json"
    });
*/
    
    // create all objects
    for (var i = 0; i < desktopObjects.length; i++) {
        var obj = desktopObjects[i];
        new obj.type(obj.options);
    }

    enableDOM();
} );