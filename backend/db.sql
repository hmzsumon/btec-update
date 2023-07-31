-- // create a table for the database fro user_salary_info

-- Create a table for the database for user_salary_info
USE app;
CREATE TABLE bogo_user_salary (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    nick_name VARCHAR(255) NOT NULL,
    ticket INT NOT NULL,
    coin INT NOT NULL,
    receive_coin INT NOT NULL,
    diamonds INT NOT NULL,
    family_id INT,
    family_btec_id INT,
    family_name VARCHAR(255) NOT NULL,
    online_time INT,
    base_pay INT NOT NULL,
    merchant_pay INT NOT NULL,
    salary_amount INT,
    day_bonus INT,
    grosSalary INT,
    extra_coin INT,
    extra_bonus INT,
    merchant_extra INT,
    merchant_total INT,
    motivator_bonus INT,
    target_point INT,
    salary_date DATE,
    is_target BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (id),
);



-- insert data into the table
INSERT INTO bogo_user_salary (user_id, nick_name, ticket, coin, receive_coin, diamonds, family_id, family_btec_id, family_name, online_time, base_pay, merchant_pay, salary_amount, day_bonus, grosSalary, extra_coin, extra_bonus, merchant_extra, merchant_total, motivator_bonus, target_point, salary_date, is_target)
VALUES (1, 'test', 100, 100, 100, 100, 5, 5, 'test-family-1', 1 , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2021-01-01', TRUE);

DROP TABLE bogo_user_salary;

INSERT INTO `bogo_user_salary` ( `user_id`, `nick_name`, `ticket`, `coin`, `receive_coin`, `diamonds`, `family_id`, `family_btec_id`, `family_name`, `online_time`, `base_pay`, `merchant_pay`, `salary_amount`, `day_bonus`, `grosSalary`, `extra_coin`, `extra_bonus`, `merchant_extra`, `merchant_total`, `motivator_bonus`, `target_point`, `salary_date`, `is_target`) VALUES ('123456', 'Test name', '100', '100', '100', '100', '5', '123456', 'Test Family', '120', '500', '500', '1200', '50', '1542', '20', '20', '50', '150', '20', '1000', '2021-01-01', '1');


213934 213937