module tiled{
    
	export class TMXImageLoadEvent extends egret.Event {
    	/**
    	 * 单张图片加载完成
    	 * @version Egret 3.0.3
    	 */
		static IMAGE_COMPLETE: string       = "complete";
		/**
		 * 所有图片加载完成
		 * @version Egret 3.0.3
		 */
		static ALL_IMAGE_COMPLETE:string    = "allComplete";
		/**
		 * 当前图片加载完成的纹理
		 * @version Egret 3.0.3
		 */
		texture: egret.Texture;
		
		/**
		 * Tile中图片加载完成事件
		 * @param type 事件的类型，可以作为 TMXImageLoadEvent.type 访问。
		 * @param texture 事件在IMAGE_COMPLETE完成后所带的纹理
		 * @param bubbles 确定 TMXImageLoadEvent 对象是否参与事件流的冒泡阶段。默认值为 false。
		 * @param cancelable 确定是否可以取消 TMXImageLoadEvent 对象。默认值为 false。
		 * @version Egret 3.0.3
		 */
        constructor(type: string,texture: egret.Texture = null,bubbles: boolean = true,cancelable: boolean = false) {
			super(type, bubbles, cancelable);
            this.texture = texture;
		}
	} 
}

