import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

enum BolckType {
    NONE,
    WRITE
}

@ccclass('GameManager')
export class GameManager extends Component {
    
    @property(Prefab)
    private block:Prefab = null;

    // 方块数量
    private blockNumber:number = 50;
    // 方块数据
    private blocks:BolckType[] = [];
    
    start() {
        this.initBlocks();
    }

    update(deltaTime: number) {
        
    }

    private initBlocks() {
        this.node.removeAllChildren();
        this.blocks = [];

        // 初始化方块数据
        this.blocks.push(BolckType.WRITE);

        for (let i = 1; i < this.blockNumber; i++) {
            const block = this.blocks[i-1];
            if (block === BolckType.NONE) {
                this.blocks.push(BolckType.WRITE);
            } else {
                this.blocks.push(Math.round(Math.random()));
            }

        }
        for (let i = 1; i < this.blockNumber; i++) {
            const block = this.blocks[i];
            if (block === BolckType.NONE) {
                // TODO 显示空方块
            } else {
                // TODO 显示实心方块
                const blockNode = instantiate(this.block);
                blockNode.setPosition(i*40, 0, 0);
                this.node.addChild(blockNode);
            }
        }
    }
}


