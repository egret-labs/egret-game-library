class TMXObjectGroup extends egret.Sprite {
    private _name: string;
    private _z: number;
    private _objects: Array<TMXObject>;
    private _opacity: number;
    private _draworder: string;
    private _color: number;
    private _orientaion: string;
    private _childrens: Array<any>;
    private _tilesets: TMXTilesetGroup;
    type: string;
    constructor(tmxObjGroupData: any, orientation: string, tilesets: TMXTilesetGroup, z: number) {
        super();

        this._name          = tmxObjGroupData.attributes.name;
        this._opacity       = (typeof tmxObjGroupData.attributes.opacity !== "undefined") ? +tmxObjGroupData.attributes.opacity : 1;
        this._draworder     = tmxObjGroupData.attributes.draworder;
        this._color         = tmxObjGroupData.attributes.color ? (TMXUtils.color16ToUnit(tmxObjGroupData.attributes.color)) : TMXConstants.DEFAULT_COLOR;
        this._orientaion    = orientation;
        this._tilesets      = tilesets;
        this._z             = z;
        
        this._objects       = [];
        this._childrens     = tmxObjGroupData.children;
    }

    get name() {
        return this._name;
    }

    draw() {
        if (this._childrens) {
            for (var i: number = 0; i < this._childrens.length; i++) {
                var object: TMXObject = new TMXObject(this._childrens[i], this._orientaion, this._tilesets, this._z, this._color);
                object.alpha = this._opacity;
                object.visible = this.visible;
                this._objects[i] = object;
                this.addChild(object);
            }
        }
    }
    

    render(): void {

    }

    

    destory(): void {
        this._objects = null;
    }

    getObjectCount(): number {
        return this._objects.length;
    }

    getObjectByIndex(index: number): TMXObject {
        return this._objects[index];
    }
    
} 