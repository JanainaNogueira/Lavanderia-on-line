package br.net.lavanderia.crud.model;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class HashFunc {

  public static String generateSHA256(String input) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] encodedhash = digest.digest(input.getBytes());
      StringBuilder hexString = new StringBuilder();
      for (byte b : encodedhash) {
        String hex = Integer.toHexString(0xff & b);
        if (hex.length() == 1) {
          hexString.append('0');
        }
        hexString.append(hex);
      }
      return hexString.toString();
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException(e);
    }
  }

}
