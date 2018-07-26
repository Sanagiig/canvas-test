canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight,
  textDom = document.getElementById("text"),
  gravityDom = document.getElementById("gravity"),
  speedDom = document.getElementById("speed"),
  offsetDom = document.getElementById("offset"),
  radiusDom = document.getElementById("radius"),
  durationDom = document.getElementById("duration"),

  text = textDom.value,
  gravity = parseFloat(gravityDom.value),
  speed = parseFloat(speedDom.value),
  offset = parseFloat(offsetDom.value),
  radius = parseFloat(radiusDom.value),
  duration = parseFloat(durationDom.value),

  colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
      '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
      '#FF5722'
  ];

var particle = function (x, y,gravity , speed , offset ,r , duration) {
    this.x = x;
    this.y = y;
    this.orgX = x;
    this.orgY = y;
    this.gravity = gravity || 0;
    this.speed = speed || 0.4;
    this.offset = offset || 0.5;
    this.r = r || 5;
    this.duration = duration || 6;
    this.orgRadius = 1.1;
    // this.newRadius = this.orgRadius + 1;
    this.newRadius = 2 * Math.random() + this.r;
    this.radius = this.orgRadius;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.setOption = function(opt){
        for(var k in opt){
            if(this[k] != undefined){
                this[k] = parseFloat(opt[k]);
            }
        }

    }

    this.draw = function () {
        ctx.beginPath();
        ctx.save();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();

    }

    this.update = function () {
        var gup = this.newRadius - this.orgRadius,
          direct = gup > 0,
          oneTimeChange = direct ? + this.speed :  this.speed * -1;



        //查看步进是否从小到大
        if ((direct && this.radius >= this.newRadius) || (!direct && this.radius <= this.newRadius)) {

            this.orgRadius = this.newRadius;
            this.radius = this.orgRadius;
            this.x = this.orgX;
            this.y = this.orgY;

            if (direct) {
                this.newRadius = 1.1
            } else {
                this.newRadius = 2 * Math.random() + this.r;
            }
        }


        if((!direct && this.gravity != 0) ){
            this.y += this.gravity * 20;
        }

        this.radius += oneTimeChange;
    }
}

var shap = function (x, y, text,gravity,speed,offset,r,duration) {
    var self = this;
    this.x = x;
    this.y = y;
    this.text = text;
    this.points = [];
    this.size = 200;
    this.gridX = duration || 6;
    this.gridY = duration || 6;
    this.runing = false;
    this.gravity = gravity;
    this.speed = speed;
    this.offset = offset;
    this.r = r ;
    this.duration = duration;

    this.setText = function (t) {
        this.text = t;
        this.getValue();
        this.start();
    }

    this.setDuration = function(d){
        this.gridX = parseFloat(d);
        this.gridY = this.gridX;
        this.getValue();
        this.start();
    }

    this.setOption = function(opt){
        for(var k in opt){
            if(this[k] != undefined){
                this[k] = parseFloat(opt[k]);
            }
        }

        for(var i=0;i < this.points.length; i++){
            this.points[i].setOption(opt);
        }

    }

    this.printText = function () {
        this.clearAll();
        ctx.beginPath();
        ctx.textAlign = "center";
        ctx.font = "bold " + this.size + "px arial";
        ctx.fillText(this.text, this.x, this.y);

    }

    this.getValue = function () {
        var idata;
        this.clearAll();
        this.printText();
        idata = new Uint32Array(ctx.getImageData(0, 0, w, h).data.buffer);
        for (var y = 0; y < h; y += this.gridY) {
            for (var x = 0; x < w; x += this.gridX) {
                if (idata[y * w + x]) {
                    this.points.push(new particle(x, y,this.gravity,this.speed,this.offset,this.radius,this.duration));
                }
            }
        }

    }

    this.drawParticle = function () {
        this.clearCtx();
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].draw();
        }

    };

    this.update = function () {
        this.clearCtx();
        for (var i = 0; i < this.points.length; i++) {
            this.points[i].update();
            this.points[i].draw();
        }
    }

    this.start = function () {
        this.runing = true;
        this.run();
    }

    this.stop = function () {
        this.runing = false;
    }

    this.run = function () {
        if (self.runing) {
            self.update();
            requestAnimationFrame(self.run);
        }
    }

    this.clearCtx = function () {
        ctx.clearRect(0, 0, w, h);
    }

    this.clearAll = function () {
        this.points = [];
        this.clearCtx();
    }
}


function changeV() {
    gravity = parseFloat(gravityDom.value);
    speed = parseFloat(speedDom.value);
    radius = parseFloat(radiusDom.value);
    offset = parseFloat(offsetDom.value);

    if(parseFloat(durationDom.value) !== duration){
        duration = parseFloat(durationDom.value);
        s.setDuration(duration);
    }

    s.setOption({
        gravity:gravity,
        speed: speed,
        r:radius,
        offset:offset,
    })
}

function changeText(e){
    var text = e.target.value;
    s.setText(text)
}

var s = new shap(w / 2, h / 2, text,gravity , speed , offset ,radius , duration );

s.printText()
s.getValue();
// s.drawParticle();
s.start();