import { _decorator, Component, director, instantiate, Label, Node, Prefab } from 'cc';
import { PlayerController } from './PlayerController';
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
    
    @property(PlayerController)
    private playerController:PlayerController = null;

    @property(Node)
    private startMenu:Node = null;

    @property(Label)
    private stepLabel:Label = null;

    start() {
        GameManager._instance = this;
        this.setGameStatus(GameStatus.MENU);

        director.on("PlayerJumped", this.onJumped, this);
    }

    public static get instance(): GameManager {
        return this._instance;
    }

    private onJumped(value:number) {
        this.stepLabel.string = value.toString();
        this.checkResult(value);
    }

    private checkResult(step:number) {
        if (step >= this.blocks.length) {
            // 胜利
            this.setGameStatus(GameStatus.MENU);
            return;
        } else {
            const blockType = this.blocks[step];
            if (blockType === BolckType.NONE) {
                // 失败
                this.setGameStatus(GameStatus.MENU);
                return;
            }
        }
    }

    /**
     * 设置游戏状态
     * @param gameStatus 
     */
    public setGameStatus(gameStatus:GameStatus) {
        if (gameStatus === GameStatus.PLAYING) {
            // 开始游戏
            this.initBlocks();
            this.playerController.init();
            this.gameStatus = GameStatus.PLAYING;
            this.startMenu.active = false;
        } else if (gameStatus === GameStatus.MENU) {
            // 返回菜单
            this.gameStatus = GameStatus.MENU;
            this.startMenu.active = true;
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


