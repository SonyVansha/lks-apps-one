use db_data;
CREATE TABLE `majors` (
  `majorsId` int(11) NOT NULL,
  `major_name` varchar(50),
  PRIMARY KEY (`majorsId`)
);




-- stundent
use db_data;
CREATE TABLE `students` (
  `studentId` varchar(40) NOT NULL,
  `fullName` varchar(50),
  `tglLahir` date,
  `gender` varchar(6),
  `profilePics` varchar(255),
  `document` varchar(255),
  `majorsId` int(11),
  `status` int(11),
  PRIMARY KEY (`studentId`)
);



-- Insert majors

INSERT INTO `majors` (`majorsId`, `major_name`) VALUES (1, 'Electronic Engineering');
INSERT INTO `majors` (`majorsId`, `major_name`) VALUES (2, 'Informatics Engineering');
INSERT INTO `majors` (`majorsId`, `major_name`) VALUES (3, 'Mathematics');
INSERT INTO `majors` (`majorsId`, `major_name`) VALUES (4, 'Medical Services');



--- insert student
INSERT INTO `students` (`studentId`, `fullName`, `tglLahir`, `gender`, `profilePics`, `document`, `majorsId`, `status`) 
VALUES 
('S001', 'John Doe', '2000-05-15', 'Male', 'profile1.jpg', 'document1.pdf', 1, 1),
('S002', 'Jane Smith', '1999-08-22', 'Female', 'profile2.jpg', 'document2.pdf', 2, 1),
('S003', 'Alex Johnson', '2001-12-05', 'Male', 'profile3.jpg', 'document3.pdf', 3, 0),
('S004', 'Emily Davis', '1998-03-30', 'Female', 'profile4.jpg', 'document4.pdf', 4, 1);


docker run -d --name redis-container -e REDIS_PASSWORD=adminsonyvansha2262 -e ALLOW_EMPTY_PASSWORD=no -p 6379:6379 redis:latest --requirepass adminsonyvansha2262
