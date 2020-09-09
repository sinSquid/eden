import CryptoJS from 'crypto-js';

const key = 'cvJ5V8RHWiAgDSbC'; // length = 16, utf解析不超过16

/**
 * @Description: CipherOption, 加密的一些选项:
  mode: 加密模式, 可取值(CBC, CFB, CTR, CTRGladman, OFB, ECB), 都在 CryptoJS.mode 对象下
  padding: 填充方式, 可取值(Pkcs7, AnsiX923, Iso10126, Iso97971, ZeroPadding, NoPadding),
  都在 CryptoJS.pad 对象下
  iv: 偏移量, mode === ECB 时, 不需要 iv
  返回的是一个加密对象
 * @Author: sin
 * @date: 2020/9/8
 * @Params: 密码
 * @Return: 加密密码
 */

// 加密
const aesEncrypt = (password) => {
  // 把Key转换为wordArray对象
  const Utf8Key = CryptoJS.enc.Utf8.parse(key);
  const cipher = CryptoJS.AES.encrypt(password, Utf8Key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  //  将加密后的数据转换成 Base64
  return cipher.ciphertext.toString(CryptoJS.enc.Base64);
};

// 解密
const aesDecrypt = (password) => {
  const Utf8Key = CryptoJS.enc.Utf8.parse(key);
  //  这里 mode, padding, iv 一定要跟加密的时候完全一样，返回的是一个解密后的对象
  const decipher = CryptoJS.AES.decrypt(password, Utf8Key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  //  将解密对象转换成 UTF8 的字符串
  return CryptoJS.enc.Utf8.stringify(decipher);
};

export {
  aesEncrypt,
  aesDecrypt,
};
