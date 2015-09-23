class TMXImageLoadEvent extends egret.Event {
    static IMAGE_COMPLETE: string = "complete";
    static ALL_IMAGE_COMPLETE:string="allComplete";
    texture: egret.Texture;
    constructor(type: string, data: any = null, bubbles: boolean = true, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
        this.texture = data;
    }
} 