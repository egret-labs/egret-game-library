declare class ComboBoxItem extends eui.ItemRenderer {
    private bg;
    private content;
    constructor();
    protected partAdded(partName: string, instance: any): void;
    protected childrenCreated(): void;
    protected dataChanged(): void;
    private onTouchEnd(event);
}
declare class ComboBox extends eui.Component {
    private bg;
    private titleLabel;
    private Scroller;
    private DataGroup;
    private isPullDown;
    static onClick: string;
    private data;
    constructor(data?: any);
    protected childrenCreated(): void;
    private updateData(key, value);
    private initPullView();
    private onRightIconBg(event);
    getTitleLabe(): eui.Label;
    /**
     * Set the item width of the comboBox
     *
     */
    setItemWidth(width: any): void;
    /**
     * Set the item height of the comboBox
     *
     */
    setItemHeight(height: any): void;
    /**
     * Set the title fontSize of the comboBox
     */
    setItemFontSize(number?: number): void;
    /**
     * Set the title height of the comboBox
     *
     */
    setTitleHeight(height: any): void;
    /**
     * Set the title background of the comboBox
     * example:"reource/picture.png"
     */
    setTitleBackground(src: any): void;
    /**
     * Set the title fontSize of the comboBox
     */
    setTitleFontSize(number: any): void;
    /**
     * Show the comboBox
     */
    show(): void;
    /**
     * Hidden the comboBox
     */
    hide(): void;
    /**
     * TextAlign:"left";"center";"right"
     */
    setItemTextAlign(align: any): void;
}
