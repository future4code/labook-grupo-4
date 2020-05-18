
CREATE TABLE user_labook (
	id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255)
);
CREATE TABLE friendships_labook (
id_friend VARCHAR(255) NOT NULL,
id_friendof VARCHAR(255) NOT NULL,
FOREIGN KEY (id_friend) REFERENCES user_labook(id)
);
CREATE TABLE posts_labook (

)