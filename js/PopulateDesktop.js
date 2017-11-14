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
            caption: "main menuz",
            entries: [
                {
                    label: "asd",
                    page: "pages/simpsonwave.html"
                },
                {
                    label: "lol",
                    page: "pages/simpsonwave.html"
                },
                {
                    label: "simpsonwave",
                    page: "pages/simpsonwave.html"
                },
            ]
        }
    }
];

$( function() {
    
    // create all objects
    for (var i = 0; i < desktopObjects.length; i++) {
        var obj = desktopObjects[i];
        new obj.type(obj.options);
    }
    
    enableDOM();
} );