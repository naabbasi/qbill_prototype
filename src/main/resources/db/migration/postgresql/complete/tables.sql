drop table if exists users cascade;

CREATE TABLE users
(
    user_id     UUID DEFAULT gen_random_uuid(),
    username    VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    first_name  varchar(255),
    last_name   varchar(255),
    locale      varchar(255),
    user_status VARCHAR(255) NOT NULL,
    CONSTRAINT pk_users PRIMARY KEY (user_id)
);

ALTER TABLE users
    ADD CONSTRAINT uc_users_username UNIQUE (username);

DROP TABLE IF EXISTS bill_tax_types CASCADE;

CREATE TABLE bill_tax_types
(
    generic_key         UUID NOT NULL,
    id                  VARCHAR(255),
    description         VARCHAR(255),
    gl_code             VARCHAR(255),
    complex_generic_key UUID DEFAULT gen_random_uuid(), /* setting default for now */
    creator             VARCHAR(255),
    changer             VARCHAR(255),
    created             TIMESTAMP WITHOUT TIME ZONE,
    changed             TIMESTAMP WITHOUT TIME ZONE,
    life_cycle_state    VARCHAR NOT NULL,
    CONSTRAINT pk_billtaxtypes PRIMARY KEY (generic_key)
);
