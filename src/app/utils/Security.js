"use strict";
import CryptoJS from "crypto-js";

const CRYPTO_KEY = "jsy7cX2Cqm3S3TL0HnHlQjSeTy6jTJg6Mp/bpEK+hI2YwdpE+nzuX+fkUE6s+dHG";
const CRYPTO_IV = "796AXV7ihZAUfjvM1h0ZE3TRJlnH5PpCMKp5jaOFg7kIyv1tMpwONVfHlNKGKWcUYTv+DDgAOdfVO9nfEP4k2g==";

const key = CryptoJS.enc.Hex.parse(CRYPTO_KEY);
const iv = CryptoJS.enc.Hex.parse(CRYPTO_IV);

export function encrypt(text) {
  const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });
  return encrypted.toString();
}

export function decrypt(encryptedText) {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key, { iv: iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
