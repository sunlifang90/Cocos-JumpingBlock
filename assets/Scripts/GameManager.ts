import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

enum BolckType {
    NONE,
    WRITE
}

enum GameStatus{
    MENU,
    PLAYING
}

@ccclass('GameManager')
export class GameManager extends Component {

    private static _instance: GameManager = null;

    @property(Prefab)
    private block:Prefab = null;

    // 方块数量
    private blockNumber:number = 50;
    // 方块数据
    private blocks:BolckType[] = [];
    private gameStatus:GameStatus = GameStatus.MENU;
    
    @property(Node)
    private menuUI:Node = null;

    start() {
        GameManager._instance = this;
        this.setGameStatus(GameStatus.MENU);
    }

    public static get instance(): GameManager {
        return this._instance;
    }

    /**
     * 设置游戏状态
     * @param gameStatus 
     */
    public setGameStatus(gameStatus:GameStatus) {
        if (gameStatus === GameStatus.PLAYING) {
            // 开始游戏
            this.initBlocks();
            this.gameStatus = GameStatus.PLAYING;
            this.menuUI.active = false;
        } else if (gameStatus === GameStatus.MENU) {
            // 返回菜单
            this.gameStatus = GameStatus.MENU;
            this.menuUI.active = true;
        }
    }

    public startGame() {
        this.setGameStatus(GameStatus.PLAYING);
    
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

    public isPlaying():boolean {
        return this.gameStatus === GameStatus.PLAYING;
    }
}


