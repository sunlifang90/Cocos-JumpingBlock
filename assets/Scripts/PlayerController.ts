import { _decorator, Component, EventMouse, Input, input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    start() {
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDownEvent, this);
    }

    update(deltaTime: number) {
        
    }

    protected onDestroy(): void {
        input.off(Input.EventType.MOUSE_DOWN, this.onMouseDownEvent, this);
    }

    private onMouseDownEvent(event: EventMouse) {
        switch(event.getButton()) {
            case EventMouse.BUTTON_LEFT:
                this.jumpOneStep();
                break;
            case EventMouse.BUTTON_RIGHT:
                this.jumpTwoSteps();
                break;
        }
    }

    private jumpOneStep() {
        const position = this.node.position;
        this.node.setPosition(position.x + 40, position.y, position.z);
    }

    private jumpTwoSteps() {
        const position = this.node.position;
        this.node.setPosition(position.x + 80, position.y, position.z);
    }
}


