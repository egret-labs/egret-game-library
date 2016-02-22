module tiled {

	export class TMXLayerBase extends egret.Sprite implements ILayer {
    	protected _tilemap:tiled.TMXTilemap;
        protected _data:any;
        protected _z:number;
        
        /**
         * 图层基类
         * @param tilemap TMXTilemap实例
         * @param data
         * @param z 图层层深
         * @version Egret 3.0.3
         */
        public constructor(tilemap: tiled.TMXTilemap,data: any,z: number) {
    		super();
            this._tilemap   = tilemap;
            this._data      = data;
            this._z         = z;
		}
		
		/**
         * 获取TMXTilemap实例
         * @version Egret 3.0.3
         */
        get tilemap() {
            return this._tilemap;
        }
        
        /**
         * 获取图层所在的层深
         * @version Egret 3.0.3
         */
        get z() {
            return this._z;
        }
		
        /**
         * 实现ILayer绘制<code>draw</code>接口
         * @param rect 绘制的矩形区域
         * @version Egret 3.0.3
         */
        draw(rect: egret.Rectangle):void{
            
        }
	}
}
