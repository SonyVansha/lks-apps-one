use db_data;
create table 'majors' (
    'majorsId' int(11) NOT NULL,
    'major_name' varchar(50),
    primary key ('majorsId')
);


-- stundent
use db_data;
CREATE TABLE `students` (
    `studentId` VARCHAR(40) NOT NULL,
    `fullName` VARCHAR(50),
    `tglLahir` DATE,
    `gender` VARCHAR(6),
    `profilePics` VARCHAR(255),
    `document` VARCHAR(255),
    `majorsId` INT(11),
    `status` INT(11),
    PRIMARY KEY (`studentId`)
);


-- Insert student

INSERT INTO `majors` (`majorsId`, `major_name`) VALUES (1, 'Electronic Engineering');
INSERT INTO `majors` (`majorsId`, `major_name`) VALUES (2, 'Informatics Engineering');
INSERT INTO `majors` (`majorsId`, `major_name`) VALUES (3, 'Mathematics');
INSERT INTO `majors` (`majorsId`, `major_name`) VALUES (4, 'Medical Services');
