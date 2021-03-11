DROP TABLE IF EXISTS spotifytable;

CREATE TABLE spotifytable(
id SERIAL PRIMARY KEY,
playlist text UNIQUE,
name_of_playlist varchar (255),
playlist_image_urls text,
client_id VARCHAR (255),
client_secret VARCHAR (255),
token VARCHAR (255),
refresh_token VARCHAR (255),
mood VARCHAR (255)
);

