function Robot(step, width, height, color)
{
    this.step = step;
    let container = document.createElement('div');
    setContainer(300, 300);  

    this.elem =  document.createElement("div");
    setRobot.call(this.elem, width, height, color);
    //setRobot(width, height, color,this.elem);
    
    container.appendChild(this.elem); 
    document.body.appendChild(container);

    function setContainer( width, height)
    {
        container.style.position = "relative";
        container.style.width = width + "px";
        container.style.height = height + "px";
    }
    function setRobot(width, height, color)
    {
        this.style.position = "absolute";
        this.style.width = width + "px";
        this.style.height = height + "px";
        this.style.background = color;
        this.style.margin = "10px";
        this.style.padding = "10px";
    }
}
 
Robot.prototype.up = function()
{
    this.elem.style.top = this.elem.offsetTop - this.step + "px";
}
Robot.prototype.down = function()
{
    this.elem.style.top = this.elem.offsetTop + this.step + "px";
}
Robot.prototype.right = function()
{
    this.elem.style.left = this.elem.offsetLeft + this.step + "px";
}

Robot.prototype.left = function()
{
    this.elem.style.left = this.elem.offsetLeft - this.step + "px";
}

$(function()
{
    let robot = new Robot(30, 20, 20, "red");

    let upBtn = document.getElementById('up');
    let downBtn = document.getElementById('down');
    let rightBtn = document.getElementById('right');
    let leftBtn = document.getElementById('left');

    upBtn.addEventListener('click', function(){ robot.up() });
    downBtn.addEventListener('click', function(){ robot.down() });
    rightBtn.addEventListener('click', function(){ robot.right() });
    leftBtn.addEventListener('click', function(){ robot.left() });
    // robot.right();
    // robot.right();
    // robot.down();
    // robot.up();
    // robot.up();
})