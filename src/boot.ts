import {game} from "./game";
class Boot extends Phaser.State
{
    public constructor()
    {
        super();
    }
    public init() : void
    {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
    }
    public preload() : void
    {
        this.load.image("preloadBar","assets/preloadbar.png");
    }
    public create() : void
    {
        game.state.start("Preloader");
    }
}
export let boot : Boot = new Boot();