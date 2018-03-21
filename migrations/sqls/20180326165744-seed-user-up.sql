CREATE TABLE seed_user (
    id bigserial PRIMARY KEY,
    identity uuid DEFAULT uuid_generate_v4() NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    provider text,
    provider_id text,
    avatar text,
    created_at timestamp without time zone default (now() at time zone 'utc') not null,
    updated_at timestamp without time zone default (now() at time zone 'utc') not null,
    deleted_at timestamp with time zone
);
