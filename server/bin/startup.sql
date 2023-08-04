-- Data Definition --
CREATE TABLE "User" (
  record_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  pass VARCHAR(100) NOT NULL
); 

CREATE TABLE "Note" ( 
  record_id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(200) UNIQUE NOT NULL,
  subtitle VARCHAR(100),
  body VARCHAR(10000) NOT NULL,
  author INTEGER NOT NULL,
  favorite BOOLEAN DEFAULT FALSE,
  CONSTRAINT fk_user FOREIGN KEY (author) REFERENCES "User" (record_id) ON DELETE CASCADE ON UPDATE CASCADE 
);

-- Data Manipulation --
INSERT INTO "User" (first_name, surname, email, pass) VALUES ('Samuel', 'Thomson', 'sam.tom@yahoo.com', '1234');
INSERT INTO "User" (first_name, surname, email, pass) VALUES ('John', 'Smith', 'john.smith@gmail.com', '4425');
INSERT INTO "User" (first_name, surname, email, pass) VALUES ('Jessica', 'Miles', 'jessica.miles@yahoo.com', '8265');

INSERT INTO "Note" (title, subtitle, body, author) 
VALUES ( 'Tomatoes', 'Soil Requirements', 'abc <img alt="asgadfgasdf"/> 123', 1);
