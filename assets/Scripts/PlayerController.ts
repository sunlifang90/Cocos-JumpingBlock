import { _decorator, Animation, Component, EventMouse, Input, input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    private jumping = false;
    private jumpTime = 0.3;//0.3s内跳完
    private jumpedTime = 0;//已跳多少时间
    private jumpSpeed = 0;

    @property(Animation)
    private jumpAnimation:Animation = null;

    start() {
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDownEvent, this);
    }

    update(deltaTime: number) {
        if (this.jumping) {
            const position = this.node.position;

            const remainingTime = this.jumpTime-this.jumpedTime;
            if (remainingTime > deltaTime) {
                // 剩余时间还多，没渲染完
                this.jumpedTime+=deltaTime;
                this.node.setPosition(position.x + this.jumpSpeed * deltaTime, position.y, position.z);
            } else {
                // 时间到了
                this.node.setPosition(position.x + this.jumpSpeed * remainingTime, position.y, position.z);
                this.jumping = false;
            }
        }
    }

    protected onDestroy(): void {
        input.off(Input.EventType.MOUSE_DOWN, this.onMouseDownEvent, this);
    }

    private onMouseDownEvent(event: EventMouse) {
        if (this.jumping) {
            return;
        }
        switch(event.getButton()) {
            case EventMouse.BUTTON_LEFT:
                this.jumpStep(1);
                this.jumpAnimation.play("JumpOneStep");
                break;
            case EventMouse.BUTTON_RIGHT:
                this.jumpStep(2);
                this.jumpAnimation.play("JumpTwoStep");
                break;
        }
    }

    private jumpStep(step:number) {
        if (!this.jumping) {
            this.jumping = true;
            this.jumpedTime = 0;
            this.jumpSpeed = step*40/this.jumpTime;
        }
    }
}


