declare class TreeViewItem extends eui.ItemRenderer {
    private rootNode;
    private bgRect;
    private itemBgRect;
    private arrowiconBg;
    private arrowicon;
    private foldericon;
    private content;
    private DataGroup;
    private myHeight;
    constructor();
    protected partAdded(partName: string, instance: any): void;
    protected childrenCreated(): void;
    protected dataChanged(): void;
    private update();
    private itemBgRectOnTouchEnd(event);
    private popEvent();
    private onTouchEnd(event);
}
declare class TreeView extends eui.Component implements eui.UIComponent {
    /**
     *  Scroller Control
     */
    private Scroller;
    /**
     * 	DataGroup
     */
    private DataGroup;
    /**
     * items: treeView data
     */
    private items;
    /**
     * is selected
     */
    static isSelectName: string;
    static onClick: string;
    /**
     * you can refresh data by eui.ArrayCollection
     */
    private itemDataCollection;
    /**
     * 	item data
     */
    constructor(items?: any);
    protected partAdded(partName: string, instance: any): void;
    protected childrenCreated(): void;
    /**
     * TreeView Width
     */
    setWidth(width: any): void;
    /**
     * TreeView Height
     */
    setHeight(height: any): void;
    /**
     * set treeview item height
     */
    setItemHeight(itemHeight: any): void;
    /**
     * set treeview item width
     */
    setItemWidth(itemWidth?: number): void;
    /**
     * item BackgroundColor
     */
    setBgColor(color: any): void;
    /**
     * treeview item selected color
     */
    setSelectedColor(color: any): void;
    /**
     * treeview item content fontSize
     */
    setFontSize(size: any): void;
    private loopData(items, key, value);
}
