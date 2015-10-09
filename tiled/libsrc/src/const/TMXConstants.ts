module tiled{
	export class TMXConstants {
		static TMX_FLIP_H: number           = 0x80000000;
		static TMX_FLIP_V: number           = 0x40000000;
		static TMX_FLIP_AD: number          = 0x20000000;
		static TMX_CLEAR_BIT_MASK: number   = ~(0x80000000 | 0x40000000 | 0x20000000);

		static LAYER: string                = "layer";
		static OBJECT_GROUP: string         = "objectgroup";
		static PROPERTIES: string           = "properties";
		static DATA: string                 = "data";
		static OBJECT: string               = "object";
		static IMAGE: string                = "image";
		static IMAGE_LAYER: string          = "imagelayer";

		static TILE_SET: string             = "tileset";
		static TILE: string                 = "tile";
		static TILE_OFFSET: string          = "tileoffset";
		static ANIMATION: string            = "animation";

		//默认颜色
		static DEFAULT_COLOR: number        = 0xa0a0a4;
		static DRAWORDER_INDEX: string      = "index";

		static POLYGON: string              = "polygon";
		static POLYLINE: string             = "polyline";
		static ELLIPSE: string              = "ellipse";

		static TILE_OBJECT_GROUP: string 	= "tileobjectgroup";

		//正交
		static ORIENTATION_ORTHOGONAL: string = "orthogonal";
		//等矩
		static ORIENTATION_ISOMETRIC: string = "isometric";
		//交错
		static ORIENTATION_STAGGERED: string = "staggered";
		//六角
		static ORIENTATION_HEXAGONAL: string = "hexagonal";
	} 
}
