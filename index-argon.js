

function getRandColor () {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Component to change to random color on click.
AFRAME.registerComponent('cursor-listener', {
    init: function () {
        this.mouseover = false;
        var self = this;
        this.el.addEventListener('click', function (evt) {
            this.setAttribute('material', 'color', getRandColor());
            console.log('I was clicked at: ', evt.detail.intersection.point);
        });
        this.el.addEventListener('mouseenter', function (evt) {
            self.mouseover = true;
            this.setAttribute('material', 'opacity', 0.5);
        });
        this.el.addEventListener('mouseleave', function (evt) {
            self.mouseover = false;
            this.setAttribute('material', 'opacity', 1.0);
        });
    },

    tick: function () {
        if (this.mouseover) {
            this.el.setAttribute('material', 'color', getRandColor());
        }
    }
});

AFRAME.registerComponent('showdistance', {
    schema: { 
        default: ""
    },

    init: function () {
        this.text = "";
    },

    update: function () {
        this.text = this.data;
    },

    tick: function (t) {
        var object3D = this.el.object3D;
        var camera = this.el.sceneEl.camera;
        if (!camera) {return;}

        var cameraPos = camera.getWorldPosition();
        var thisPos = object3D.getWorldPosition();
        var distance = Math.round(thisPos.distanceTo(cameraPos));

        var cssDiv = this.el.getObject3D('div');
        var msg = this.text + distance + " meters away";
        cssDiv.elements[0].innerHTML = msg;
        cssDiv.elements[1].innerHTML = msg;
    }
});
