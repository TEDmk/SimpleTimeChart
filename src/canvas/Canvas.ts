enum MouseState {
    Drag = 2,
    Up = 1,
    Down = 0,
}

export enum Direction {
    UP = 1,
    DOWN = 2,
}

export class Position {
    x: number;
    y: number;
}

export abstract class Canvas {
    protected canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;

    protected boundingRect;
    protected mouseDownPos: Position;

    protected mouseState: MouseState;

    protected screenPosition: Position;

    constructor(width: number, height: number) {
        let ratio = 2;
        this.canvas = <HTMLCanvasElement>document.createElement("canvas");
        this.context = this.canvas.getContext("2d");

        this.canvas.width = ratio * width;
        this.canvas.height = ratio * height;
        this.canvas.style.width = width.toString() + "px";
        this.canvas.style.height = height.toString() + "px";
        
        this.context.scale(ratio,ratio);
        this.context.imageSmoothingEnabled = false;
        this.context.textBaseline = "middle"; 

        this.mouseState = MouseState.Up;
 
        this.boundingRect = this.canvas.getBoundingClientRect();
        this.canvas.style.cursor = "pointer";
        this.screenPosition = {x: 0, y: 0};
        this.canvas.addEventListener("mousedown", e => {this.onMouseChangeState(MouseState.Down, e);});
        this.canvas.addEventListener("mouseup", e => {this.onMouseChangeState(MouseState.Up, e);});
        this.canvas.addEventListener("mousemove", e => {this.onMouseMove(e);});
        this.canvas.addEventListener('wheel',e => {
            if(e.deltaY < 0)
                this.onScroll(Direction.UP)
            if(e.deltaY > 0)
                this.onScroll(Direction.DOWN)
            event.preventDefault();
        });
    }
    
    abstract draw(): any;

    getCanvas(): HTMLCanvasElement {
        return this.canvas
    }

    protected drawLine(points: Array<Position>, color: string = "#fff", opacity: number = 1, thickness: number = 1) {
        this.context.save();
        this.context.lineWidth = thickness;
        this.context.globalAlpha = opacity;
        this.context.strokeStyle = color
        this.context.beginPath();
        this.context.translate(0.5, 0.5);
        this.context.moveTo(points[0].x, points[0].y);
        for(let point of points.slice(1, points.length))
            this.context.lineTo(point.x, point.y);
        this.context.stroke();
        this.context.translate(-0.5, -0.5);
        this.context.restore();
    }

    protected drawPolygon(points: Array<Position>, color: string = "#fff", opacity: number = 1) {
        this.context.save();
        this.context.globalAlpha = opacity;
        this.context.fillStyle = color
        this.context.beginPath();
        this.context.translate(0.5, 0.5);
        this.context.moveTo(points[0].x, points[0].y);
        for(let point of points.slice(1, points.length))
            this.context.lineTo(point.x, point.y);
        this.context.fill();
        this.context.translate(-0.5, -0.5);
        this.context.restore();
    }

    protected drawBox(topLeft: Position, bottomRight: Position, strokeColor: string = null, backgroundColor: string = null, opacity: number = 1) {
        this.context.save();
        this.context.globalAlpha = opacity;
        this.context.beginPath();
        this.context.translate(0.5, 0.5);
        if(backgroundColor)
            this.context.fillStyle = backgroundColor;
            this.context.fillRect(topLeft.x, topLeft.y, bottomRight.x-topLeft.x, bottomRight.y-topLeft.y);
        if(strokeColor){
            this.context.beginPath();
            this.context.strokeStyle = strokeColor;
            this.context.rect(topLeft.x, topLeft.y, bottomRight.x-topLeft.x, bottomRight.y-topLeft.y);
            this.context.stroke();
        }
        this.context.translate(-0.5, -0.5);
        this.context.restore();
    }

    protected drawText(text: string, pos: Position, color: string = "#fff", font: string = "10px Arial", align: string = "left") {
        this.context.textAlign = <CanvasTextAlign>align;
        this.context.fillStyle = color
        this.context.font = font;
        this.context.fillText(text, pos.x, pos.y);
    }

    private onMouseChangeState(state: MouseState, e: MouseEvent) {
        let x = e.clientX - this.boundingRect.left;
        let y = e.clientY - this.boundingRect.top;

        // Getting a Click = UP -> DOWN -> UP
        if (state == MouseState.Up && this.mouseState == MouseState.Down){
                this.onClick({x: x, y: y});
        }
        
        // Record position of Mouse Down in case of drag
        if (state == MouseState.Up) {
            this.mouseDownPos = null;
            this.canvas.style.cursor = "pointer";
        }
        if (state == MouseState.Down) {
            this.mouseDownPos = {x: x, y: y};
        }

        if (!(this.mouseState == MouseState.Drag && state == MouseState.Down)) {
            this.mouseState = state;
        }        
    }

    private onMouseMove(e: MouseEvent) {
        let x = e.clientX - this.boundingRect.left;
        let y = e.clientY - this.boundingRect.top;
        if(this.mouseState == MouseState.Down || this.mouseState == MouseState.Drag) {
            this.mouseState = MouseState.Drag;
            this.canvas.style.cursor = "grab";
            this.onDrag(this.mouseDownPos, {x:x, y:y})
            this.mouseDownPos = {x:x, y:y};
        }

    }

    onDrag(previousPos: Position, currentPos: Position) : any {
        this.screenPosition = {x:this.screenPosition.x+currentPos.x-previousPos.x, y:this.screenPosition.y+currentPos.y-previousPos.y};
        this.mouseDownPos = currentPos;
    }

    onScroll(direction: Direction) {
        
    }

    onClick(pos: Position) : any {
        console.log("CLICK")
    }

}
