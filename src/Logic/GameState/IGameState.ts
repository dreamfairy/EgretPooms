/**
 *
 * @author 
 *
 */
interface IGameState {
    onEnter(): void;
    onExit(): void;
    onUpdate(dt : number);
    toString() : string;
}
