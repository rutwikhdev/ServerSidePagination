create table Category(
  c_id int not null AUTO_INCREMENT,
  category varchar(50) not null unique,
  primary key(c_id)
);

create table Product(
  cf_id int not null AUTO_INCREMENT,
  p_id int not null unique,
  product varchar(200) not null,
  primary key(p_id),
  foreign key(cf_id) references Category(c_id)
);

ALTER TABLE Prodcut AUTO_INCREMENT=100;

insert into Category values
  (1, 'Phones'),
  (2, 'Laptops'),
  (3, 'CPUs'),
  (4, 'Books'),
  (5, 'Courses');

insert into Product values
  (1, 101,'Iphone 12'),
  (1, 102,'Samsung Galaxy S10'),
  (1, 103,'Huawei M20'),
  (1, 104,'One Plus 7T'),
  (2, 105,'Apple M1 Mac Air'),
  (2, 106,'Asus Zepryus G1'),
  (2, 107,'Razer Blade stealth 15'),
  (3, 108,'Intel i7 11k'),
  (3, 109,'AMD Ryzen 7'),
  (4, 110,'Psycology of Money'),
  (4, 111,'Kafka on the Shore'),
  (5, 112,'ReactJS'),
  (5, 113,'Microservices'),
  (5, 114,'Data Science');