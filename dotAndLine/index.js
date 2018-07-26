(function(){

    resize();
    window.onresize = resize;

    function resize(){
        canvas.width = window.innerWidth ||
          document.getElement.clientWidth ||
          document.body.clientWidth;
        canvas.height = (window.innerHeight ||
          document.getElement.clientHeight ||
          document.body.clientHeight) - 200;
        //为了在底部留出一段距离
    }


    //注意：在书写的时候，内部千万不要加 ；

    window.onmousemove = function(e){
        e = e || window.event;

        warea.x = e.clientX;
        warea.y = e.clientY;
    };
    window.onmouseout = function(e){
        warea.x = null;
        warea.y = null;
    };





    // 延迟100秒开始执行动画，如果立即执行有时位置计算会出错
    setTimeout(function(){
        animate();
    }, 100);

    // 每一帧循环的逻辑
    function animate(){
        ctx.clearRect(0,0,canvas.width, canvas.height);

        // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
        var ndots  = [warea].concat(dots);

        dots.forEach(function(dot){

            // 粒子位移
            dot.x += dot.xa;
            dot.y += dot.ya;

            // 遇到边界将加速度反向
            dot.xa *= (dot.x > canvas.width || dot.x < 0)? -1:1;
            dot.ya *= (dot.y > canvas.height || dot.y < 0)? -1:1;

            // 绘制点
            ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);

            // 将已经计算过的粒子从数组中删除
            ndots.splice(ndots.indexOf(dot), 1);
        });
        var RAF = (function(){
            return window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame||
              window.mozRequestAnimationFrame||
              window.oRequestAnimationFrame ||
              window.msRequestAnimationFrame ||
              function (callback) {
                  window.setTimeout(callback, 1000 / 60);
              }
        })();

        RAF(animate);
    }

    var canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d');

    //获取鼠标活动时的鼠标坐标
    var warea = {
        x:null,
        y:null,
        max:20000
    };

    //添加粒子
    //x  , y  为  粒子坐标
    //xa , ya 为  粒子 xy 轴加速度
    //max     为  连线的最大距离
    var dots = [];
    for(var i = 0; i < 300; i++){
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var xa = Math.random() * 2 - 1;
        var ya = Math.random() * 2 - 1;

        dots.push({
            x : x,
            y : y,
            xa : xa,
            ya : ya,
            max : 6000
        })
    }
})()