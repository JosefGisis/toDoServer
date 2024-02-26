-- @block
CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE, 
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    creation_date DATE DEFAULT(NOW())
);

-- @block
CREATE TABLE lists(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    creation_date DATE DEFAULT(NOW()),
    last_accessed DATE DEFAULT(NOW()),
    last_modified DATE DEFAULT(NOW()),
    
    user_id INT, 
    
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- @block
CREATE TABLE to_dos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    creation_date DATE DEFAULT(NOW()),
    completed BOOLEAN DEFAULT FALSE,
    due_date DATE,
    last_modified DATE DEFAULT(NOW()),
    
    membership INT,
    user_id INT,
    
    FOREIGN KEY (membership) REFERENCES lists(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);