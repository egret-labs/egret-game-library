/*
 * @Author: fan.li 
 * @Date: 2018-10-18 10:44:49 
 * @Last Modified by: fan.li
 * @Last Modified time: 2018-10-18 18:46:50
 * 
 * 聊天UI中元素渲染，IM消息和Tip提示消息
 */

namespace youme {

  /**
   * 自定义的消息呈现器，用于呈现数据到eui.List中
   *
   * @export
   * @class MessageRenderer
   * @extends {eui.Component}
   * @implements {eui.IItemRenderer}
   */
  export class MessageRenderer extends eui.Component implements eui.IItemRenderer {
    private label: eui.Label;

    public constructor() {
      super();
    }

    /**
     * 当数据改变时，更新视图。
     *
     * @protected
     * @memberof MessageRenderer
     */
    protected dataChanged(): void {
      const data = <youme.Tip | MessageObject>this.data;

      if (data instanceof youme.Tip) {
        this.label = new eui.Label();
        this.label.size = 18;
        this.label.textColor = 0x000000;
        this.addChild(this.label);
        this.label.text = data.text;  
      } else {
        const message = new youme.ImMessage(data);
        this.addChild(message);
      }
    }

    private _data: any = null;
    private _selected: boolean = false;
    
    /**
     * 项呈示器的数据提供程序中的项目索引.
     *
     * @type {number}
     * @memberof MessageRenderer
     */
    public itemIndex: number = -1;
    
    public get data(): any {
      return this._data;
    }

    public set data(value: any) {
      this._data = value;
      this.dataChanged();
    }

    /**
     * 如果项呈示器可以将其自身显示为已选中，则为 true。
     *
     * @type {boolean}
     * @memberof MessageRenderer
     */
    public get selected(): boolean {
      return this._selected;
    }

    public set selected(value: boolean) {
      if (this._selected == value) return;
      this._selected = value;
      this.invalidateState();
    }
  }
}