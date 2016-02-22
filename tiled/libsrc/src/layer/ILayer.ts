module tiled {
	export interface ILayer {
    	  /**
    	   * 图层绘制的公用接口
    	   * @see tiled.TMXLayerBase#draw
    	   * @see tiled.TMXImageLayer#draw
    	   * @see tiled.TMXLayer#draw
    	   */ 
        draw(rect: egret.Rectangle): void;
	}
}
