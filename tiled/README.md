###Tiled Map 官方教程
http://doc.mapeditor.org/

#### xmldom
* for wechat 
* 供微信使用

```
//add this code in game.js

require('./weapp-adapter.js');
window.DOMParser = require("./xmldom/xmldom.js").DOMParser;
```