module tiled{
	export class TMXObjectGroup extends egret.Sprite {
		private _name: string;
		private _z: number;
		private _objects: Array<tiled.TMXObject>;
		private _objectHash:any;
		private _opacity: number;
		private _draworder: string;
		private _color: number;
		private _orientaion: string;
		private _childrens: Array<any>;
		private _tilesets: tiled.TMXTilesetGroup;
		type: string;
		constructor(tmxObjGroupData: any, orientation: string, tilesets: tiled.TMXTilesetGroup, z: number) {
			super();

			this._name          = tmxObjGroupData.attributes.name;
			this._opacity       = (typeof tmxObjGroupData.attributes.opacity !== "undefined") ? +tmxObjGroupData.attributes.opacity : 1;
			this._draworder     = tmxObjGroupData.attributes.draworder;
			this._color         = tmxObjGroupData.attributes.color ? (tiled.TMXUtils.color16ToUnit(tmxObjGroupData.attributes.color)) : tiled.TMXConstants.DEFAULT_COLOR;
			this._orientaion    = orientation;
			this._tilesets      = tilesets;
			this._z             = z;
			this.visible         = (typeof tmxObjGroupData.attributes.visible !== "undefined") ? Boolean(+tmxObjGroupData.attributes.visible) : true;
			this._objects       = [];
			this._objectHash	= {};
			this._childrens     = tmxObjGroupData.children;
		}

		get name() {
			return this._name;
		}

		draw() {
			if (this._childrens) {
				for (var i: number = 0; i < this._childrens.length; i++) {
					var object: tiled.TMXObject 	= new tiled.TMXObject(this._childrens[i], this._orientaion, this._tilesets, this._z, this._color);
					object.alpha 			= this._opacity;
					this._objects[i] 		= object;
					this.addChild(object);
					this._objectHash[object.id]=object;
				}
			}
		}

		render(): void {

		}

		destory(): void {
			this._objects = null;
		}
		
		getObjectById(id:number):tiled.TMXObject{
			return this._objectHash[id];
		}
		
		removeObjectById(id:number):void{
			var object:tiled.TMXObject=this.getObjectById(id);
			if(object&&object.parent)
				object.parent.removeChild(object);
		}
		
		showObjectById(id:number):void{
			var object:tiled.TMXObject=this.getObjectById(id);
			if(object)
				object.visible=true;
		}
		
		hideObjectById(id:number):void{
			var object:TMXObject=this.getObjectById(id);
			if(object)
				object.visible=false;
		}

		getObjectCount(): number {
			return this._objects.length;
		}

		getObjectByIndex(index: number): tiled.TMXObject {
			return this._objects[index];
		}
		
		removeObjectByIndex(index:number):void{
			var object:tiled.TMXObject=this.getObjectByIndex(index);
			if(object&&object.parent)
				object.parent.removeChild(object);
		}
	} 
}
