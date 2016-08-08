Drop DATABASE if exists rb;
CREATE DATABASE IF NOT EXISTS rb DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

use rb;

drop table if exists rb_article;
CREATE TABLE IF NOT EXISTS `rb_article` (
`id` int(10)not null primary key auto_increment,
`title` varchar(100) not null,
`content` varchar(20000) not null,
`createtime` timestamp not null default current_timestamp  on update current_timestamp,
`author`  varchar(32) not null,
`reply` int(10) null default 0,
`skim`   int(10) null default 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
alter table rb_article AUTO_INCREMENT=10000;


insert into rb_article(title,content,author) values("我的测试文章系列1","<p>我的测试文章系列1</p>","老板123");
insert into rb_article(title,content,author) values("我的测试文章系列2","<p>我的测试文章系列1</p>","老板123");
insert into rb_article(title,content,author) values("我的测试文章系列3","<p>我的测试文章系列1</p>","老板123");
insert into rb_article(title,content,author) values("我的测试文章系列4","<p>我的测试文章系列1</p>","老板123");
insert into rb_article(title,content,author) values("我的测试文章系列5","<p>我的测试文章系列1</p>","老板123");


drop table if exists rb_user;
CREATE TABLE IF NOT EXISTS `rb_user` (
  `id` int(10)not null primary key auto_increment,
  `username` varchar(100) not null,
  `nickname` varchar(100) not null,
  `password` varchar(100) not null,
  `signuptime` timestamp not null default current_timestamp,
  `onlinetime` int(10) null default 0
) ENGINE=InnoDB DEFAULT CHARSET = utf8;
alter table rb_user AUTO_INCREMENT=10000;

insert into rb_user(username,nickname,password) values("laoqian123","于老大",md5("123456"));



drop table if exists rb_reply;
CREATE TABLE IF NOT EXISTS `rb_reply` (
  `id` int(10)not null primary key auto_increment,
  `replyerid` varchar(100) not null,
  `articleid` varchar(100) not null,
  `replyerip`   varchar(100) not null,
  `replytime` timestamp not null default current_timestamp,
  `content`   varchar(5000) not null
) ENGINE=InnoDB DEFAULT CHARSET = utf8;
alter table rb_reply AUTO_INCREMENT=10000;













