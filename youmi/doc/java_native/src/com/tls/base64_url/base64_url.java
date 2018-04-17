package com.tls.base64_url;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
import org.bouncycastle.util.Arrays;

public class base64_url {
	static  byte base64_table_url[] =
    { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
      'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '-', '\0'};

	static  byte base64_pad_url = '_';

	static  short base64_reverse_table_url[] = {
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, 63, -1, -1,
	    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
	    -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
	    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
	    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
	    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1,
	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
	    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
	};
	
	public static int unsignedToBytes(int b)
	{
		return b & 0xFF;
	}

	//int base64_encode_url(const unsigned char *in_str, int length, char *out_str,int *ret_length)
	public static byte [] base64EncodeUrl(byte [] in_str)
	{
		byte [] out_str = new byte [1024] ;

	    int out_current = 0;
	    int current = 0;
	    int length = in_str.length;

	    while (length > 2) { /* keep going until we have less than 24 bits */
	    	 
	    	out_str[out_current++] = base64_table_url[unsignedToBytes((unsignedToBytes(in_str[current]) >>> 2))];
	    	out_str[out_current++] = base64_table_url[unsignedToBytes(unsignedToBytes(unsignedToBytes(in_str[current]) & 0x03) << 4) + unsignedToBytes((unsignedToBytes(in_str[current+1]) >>> 4))];
	    	out_str[out_current++] = base64_table_url[(unsignedToBytes((unsignedToBytes(in_str[current+1]) & 0x0f)) << 2) + unsignedToBytes((unsignedToBytes(in_str[current+2]) >>> 6))];
	    	out_str[out_current++] = base64_table_url[unsignedToBytes((unsignedToBytes(in_str[current+2]) & 0x3f))];
	        current += 3;
	        length -= 3; /* we just handle 3 octets of data */
	    }

	    /* now deal with the tail end of things */
	    if (length != 0) {
	    	out_str[out_current++] = base64_table_url[unsignedToBytes(in_str[current]) >>> 2];
	        if (length > 1) {
	        	out_str[out_current++] = base64_table_url[unsignedToBytes((unsignedToBytes(in_str[current]) & 0x03) << 4) + unsignedToBytes(unsignedToBytes(in_str[current+1]) >>> 4)];
	        	out_str[out_current++] = base64_table_url[unsignedToBytes((unsignedToBytes(in_str[current + 1]) & 0x0f) << 2)];
	        	out_str[out_current++] = base64_pad_url;
	        } else {
	        	out_str[out_current++] = base64_table_url[unsignedToBytes((unsignedToBytes(in_str[current]) & 0x03) << 4)];
	        	out_str[out_current++] = base64_pad_url;
	        	out_str[out_current++] = base64_pad_url;
	        }
	    }
	    
        //System.out.println("length in base64EncodeUrl: " + out_current );
	    byte [] out_bytes = new String(out_str).getBytes(); 
	    return Arrays.copyOfRange(out_bytes, 0, out_current);
	}

	//int base64_decode_url(const unsigned char *in_str, int length, char *out_str, int *ret_length)
	public static byte [] base64DecodeUrl(byte [] in_str)
	{
	//        const unsigned char *current = in_str;
	        int ch, i = 0, j = 0, k;
	        
	        int current  = 0;
	        int result = 0;
	        byte [] out_str = new byte [1024] ;
			int length = in_str.length;
	        /* this sucks for threaded environments */

	        /* run through the whole string, converting as we go */
	        //while ((ch = in_str[current++]) != '\0' && length-- > 0) {
			ch = in_str[0];
			while(length-- > 0){
					ch = in_str[current++];
	                if (ch == base64_pad_url) break;
	                /* When Base64 gets POSTed, all pluses are interpreted as spaces.
	                   This line changes them back.  It's not exactly the Base64 spec,
	                   but it is completely compatible with it (the spec says that
	                   spaces are invalid).  This will also save many people considerable
	                   headache.  - Turadg Aleahmad <turadg@wise.berkeley.edu>
	            */
	                if (ch == ' ') ch = '*'; //never using '+'

	                ch = base64_reverse_table_url[ch];
	                if (ch < 0) continue;

	                switch(i % 4) {
	                case 0:
	                	out_str[j] = (byte) unsignedToBytes( unsignedToBytes(ch) << 2);
	                    break;
	                case 1:
	                	out_str[j++] |= (byte) unsignedToBytes(unsignedToBytes(ch) >>> 4);
	                	out_str[j] = (byte) unsignedToBytes(unsignedToBytes(unsignedToBytes(ch) & 0x0f) << 4);
	                    break;
	                case 2:
	                	out_str[j++] |= (byte) unsignedToBytes(unsignedToBytes(ch) >>> 2);
	                	out_str[j] = (byte) unsignedToBytes(unsignedToBytes(unsignedToBytes(ch) & 0x03) << 6);
	                    break;
	                case 3:
	                	out_str[j++] |= (byte) unsignedToBytes(ch);
	                    break;
	                }
	                i++;
	        }
	        k = j;
	        /* mop things up if we ended on a boundary */
	        if (ch == base64_pad_url) { 	
	                switch(i % 4) {
	                case 0:
	                case 1:
	                        byte [] error =  new byte [1];
	                        error[0] = '\0';
	                        return error;
	                case 2:
	                    k++;
	                case 3:
	                	out_str[k++] = 0;
	                }
	        }
		    return Arrays.copyOfRange(out_str, 0, j);
	}
	public static void main(String[] args) throws DecoderException {
		
		//String hexString = "5095";
		String hexString = "789c6d8d4d4f83401884ff0b578c5dba0bbb98782015b1a1f8059a7222743fc8da96aecbdbdad6f8dfa5046fce6de6c9cc7c3bc522bfeec4baaa8dd1c2b9713c822e0a7ddfb91aa03c1a6d65552b90b6e794d2a0e7231c5a550d15b6ff96416fe590e38051c2281d732d640b5ae96172ea051c29be524c62e463e57382e854a08020a578c8febe38dfed5ba8e0642e9b98e21174bae97d16bfcde633299e0f49c81f27a26490b97665d7675dd0fdc35df1de994d23bc4301db349fbb918ea3e36b509878f7956d84dbb44b4ed23287b454f7119c12fea4968b64927d7c962179b9757e7e01ed1059d9";
		
		byte [] test = Hex.decodeHex(hexString.toCharArray());
		byte [] compressBytes = base64EncodeUrl(test);
		System.out.println("compress : " + new String(compressBytes));
		byte [] uncompressBytes = base64DecodeUrl(compressBytes);
		System.out.println("uncompress: " + Hex.encodeHexString(uncompressBytes));
	}
}
