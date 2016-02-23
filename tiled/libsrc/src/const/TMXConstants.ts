module tiled{
    
	/**
	 * TMX常量数据
	 */
	export class TMXConstants {
    	/**
		 * @version Egret 3.0.3
		 */
		static TMX_FLIP_H: number               = 0x80000000;
		/**
		 * @version Egret 3.0.3
		 */
		static TMX_FLIP_V: number               = 0x40000000;
		/**
		 * @version Egret 3.0.3
		 */
		static TMX_FLIP_AD: number              = 0x20000000;
		/**
		 * @version Egret 3.0.3
		 */
		static TMX_CLEAR_BIT_MASK: number       = ~(0x80000000 | 0x40000000 | 0x20000000);

		
		/**
		 * 图层
		 * @version Egret 3.0.3
		 */
		static LAYER: string                    = "layer";
		
		/**
		 * 对象组
		 * @version Egret 3.0.3
		 */
		static OBJECT_GROUP: string             = "objectgroup";
		/**
		 * 属性
		 * @version Egret 3.0.3
		 */
		static PROPERTIES: string               = "properties";
		
		/**
		 * 数据
		 * @version Egret 3.0.3
		 */
		static DATA: string                     = "data";
		
		/**
		 * 对象
		 * @version Egret 3.0.3
		 */
		static OBJECT: string                   = "object";
		
		/**
		 * 图像
		 * @version Egret 3.0.3
		 */
		static IMAGE: string                    = "image";
		
		/**
		 * 图像层
		 * @version Egret 3.0.3
		 */
		static IMAGE_LAYER: string              = "imagelayer";
        
		/**
		 * Tile设置
         * @version Egret 3.0.3
         */
		static TILE_SET: string                 = "tileset";
		
		/**
		 * Tile
		 * @version Egret 3.0.3
		 */
		static TILE: string                     = "tile";
		
		/**
		 * Tile偏移
		 * @version Egret 3.0.3
		 */
		static TILE_OFFSET: string              = "tileoffset";
		
		/**
		 * 动画
		 * @version Egret 3.0.3
		 */
		static ANIMATION: string                = "animation";

		/**
		 * 默认颜色
		 * @version Egret 3.0.3
		 */
		static DEFAULT_COLOR: number            = 0xa0a0a4;
		
		/**
		 * 绘图索引
		 * @version Egret 3.0.3
		 */
		static DRAWORDER_INDEX: string          = "index";
        
		/**
         * 多边形
         * @version Egret 3.0.3
         */
		static POLYGON: string                  = "polygon";
		
		/**
		 * 折线
		 * @version Egret 3.0.3
		 */
		static POLYLINE: string                 = "polyline";
		
		/**
		 * 椭圆
		 * @version Egret 3.0.3
		 */
		static ELLIPSE: string                  = "ellipse";
        
		/**
         * tile对象组
         * @version Egret 3.0.3
         */
		static TILE_OBJECT_GROUP: string 	      = "tileobjectgroup";

		/**
		 * 正交
		 * @version Egret 3.0.3
		 */
		static ORIENTATION_ORTHOGONAL: string   = "orthogonal";
		
		/**
		 * 等矩
		 * @version Egret 3.0.3
		 */
		static ORIENTATION_ISOMETRIC: string    = "isometric";		
		
		/**
		 * 交错
		 * @version Egret 3.0.3
		 */
		static ORIENTATION_STAGGERED: string    = "staggered";		
		
		/**
		 * 六角
		 * @version Egret 3.0.3
		 */
		static ORIENTATION_HEXAGONAL: string    = "hexagonal";
	} 
}
