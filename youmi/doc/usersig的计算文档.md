# usersig的计算文档

## 1 概述

开发者可以使用TLS后台API及相关工具，生成公私钥、生成UserSig和校验UserSig。

### 2 Java原生接口

> Java原生接口依赖于5个jar包。在tls_sig_api/java_native/lib目录下：

├── bcpkix-jdk15on-152.jar

├── bcprov-jdk15on-152.jar

├── commons-codec-1.10.jar

├── gson-2.3.1.jar

├── json.jar

└── tls_signature.jar

> Java本地方法Demo

```java
// 省略一些package
import com.tls.tls_sigature.tls_sigature;

public class TLSSignatureDemo {
    public TLSSignatureDemo() {
    }
    public static void main(String[] var0) {
        try {
            // 私钥
            String var1 = "-----BEGIN PRIVATE KEY-----\nMIGEAgEAMBAGByqGSM49AgEGBSuBBAAKBG0wawIBAQQgiBPYMVTjspLfqoq46oZd\nj9A0C8p7aK3Fi6/4zLugCkehRANCAATU49QhsAEVfIVJUmB6SpUC6BPaku1g/dzn\n0Nl7iIY7W7g2FoANWnoF51eEUb6lcZ3gzfgg8VFGTpJriwHQWf5T\n-----END PRIVATE KEY-----";

            // 公钥，在此demo中仅用于校验签名
            String var2 = "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE1OPUIbABFXyFSVJgekqVAugT2pLtYP3c\n59DZe4iGO1u4NhaADVp6BedXhFG+pXGd4M34IPFRRk6Sa4sB0Fn+Uw==\n-----END PUBLIC KEY-----";

            tls_sigature.GenTLSSignatureResult var3 = GenTLSSignatureEx(1400000955L, "xiaojun", var1);
            if (0 == var3.urlSig.length()) {
                System.out.println("GenTLSSignatureEx failed: " + var3.errMessage);
                return;
            }

            System.out.println("---\ngenerate sig:\n" + var3.urlSig + "\n---\n");
            tls_sigature.CheckTLSSignatureResult var4 = CheckTLSSignatureEx(var3.urlSig, 1400000955L, "xiaojun", var2);
            if (!var4.verifyResult) {
                System.out.println("CheckTLSSignature failed: " + var3.errMessage);
                return;
            }

            System.out.println("\n---\ncheck sig ok -- expire time " + var3.expireTime + " -- init time " + var3.initTime + "\n---\n");
        } catch (Exception var5) {
            var5.printStackTrace();
        }
    }
```

### 3. 更多userSig生成支持

```js
// TODO
```