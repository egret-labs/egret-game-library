<?php
 
 //使用项目自己的appkey
 $appkey = '';
 $secret_key = '';
 //使用固定标识
 $identifier = 'admin';//使用公司的英文或者拼音标识即可
 //可选talk和im，参照文档说明
 $service_name = 'im';

 //设置用户token
 $post_data = array('UserList'=>array(array('UserID'=>'a13','NickName'=>'egretuser','Token'=>'123')));

 $result = request($appkey,$secret_key,$identifier,$service_name,'add_user_auth',json_encode($post_data));

 echo $result;


function request($appkey,$secret_key,$identifier, $service_name,$command,$post_json_str){

    $curtime = time();
    $checksum = sha1($secret_key.$curtime);
   // echo $checksum;
    $headers = [
    'Content-Type: application/json',
    ];
    $ch = curl_init();//初始化curl
   $url="https://api.youme.im/v1/$service_name/$command?appkey=$appkey&identifier=$identifier&curtime=$curtime&checksum=$checksum";
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); 
    curl_setopt($ch, CURLOPT_HEADER, 0);//设置header
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//
    curl_setopt($ch, CURLOPT_POST, 1);//post提交方式
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_json_str);
    if (!curl_errno($ch)) {
        print_r(curl_getinfo($ch));
    }
    $data = curl_exec($ch);//运行curl

    curl_close($ch);
    return $data;//输出结果

}
