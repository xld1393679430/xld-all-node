-- show databases;

-- select version(); -- 查询MySQL版本 

use myblog;

-- show tables;

--  ！！！！SQL插入
-- 插入数据
-- insert into users(username, `password`, realname) values('zhangsan', '123456', '张三');
-- insert into users(username, `password`, realname) values('lisi', '123456', '李四');

-- insert into blogs(title, content, createTime, author) values('标题1111', '内容11111', 1650789850881, 'xld');

--  ！！！！SQL查找
-- 查询所有的用户(全量查询性能慢)
-- select * from users;
-- select * from users where state = '0';
-- select * from users where state <> '0'; -- 不等于 ‘0’

-- select * from blogs;

-- 根据id,username查询用户
-- select id,username from users; 

-- 根据and条件查询用户
-- select * from users where username="zhangsan" and `password`='123456';

-- 根据or条件查询用户
-- select * from users where username="zhangsan" or `password`='123456';

-- 根据like模糊条件查询用户
-- select * from users where username like "%zhang%";

-- 根据like模糊条件并且排序(倒序：desc/ 正序：asc)查询用户
-- select * from users where `password` like "%1%" order by id desc;

--  ！！！！SQL更新
--  更新前需要先执行 set SQL_SAFE_UPDATES = 0;
-- update users set realname = '李四2' where username="lisi";

--  ！！！！SQL删除
--  删除前需要先执行 set SQL_SAFE_UPDATES = 0;
-- delete from users where username='lisi'; -- 一般不会真正执行删除 通过设置状态软删除
-- update users set state = '0' where username = 'lisi'; -- 这是是软删除


