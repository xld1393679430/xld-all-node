sudo vi /opt/homebrew/etc/nginx/nginx.conf
// 测试修改配置是否正确
nginx -t 

// 启动nginx
nginx

// 关闭nginx
nginx -s stop

// 重启nginx
nginx -s reload