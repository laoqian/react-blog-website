Drop DATABASE if exists rb;
CREATE DATABASE IF NOT EXISTS rb DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

use rb;

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

