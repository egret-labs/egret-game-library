/*
 * @Author: fan.li 
 * @Date: 2018-10-17 21:20:17 
 * @Last Modified by: fan.li
 * @Last Modified time: 2018-10-18 10:53:08
 * 
 * 提示消息
 */

namespace youme {
  export class Tip {
    public text: string;
    
    public constructor(text: string = '') {
      this.text = text;
    }
  }
}