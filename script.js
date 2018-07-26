var a=200,
  b=100,
  radius=30;
window.onload=function(){
    var canvas=document.getElementById('canvas');
    canvas.height=668;
    canvas.width=1024;
    var cxt=canvas.getContext('2d');
    cxt.beginPath();
    cxt.arc(300,300,10,0,2*Math.PI,true)
    cxt.closePath();
    cxt.fill();
    route(cxt,300,300,200,100);
};

//椭圆路线绘制
function route(context,x,y,a,b){
    //max是等于1除以长轴值a和b中的较大者
    //i每次循环增加1/max，表示度数的增加
    //这样可以使得每次循环所绘制的路径（弧线）接近1像素
    var step = (a > b) ? 1 / a : 1 / b;
    context.beginPath();
    context.moveTo(x + a, y); //从椭圆的左端点开始绘制
    for (var i = 0; i < 2 * Math.PI; i += step)
    {
        //参数方程为x = a * cos(i), y = b * sin(i)，
        //参数为i，表示度数（弧度）
        context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    context.closePath();
    context.stroke();
}