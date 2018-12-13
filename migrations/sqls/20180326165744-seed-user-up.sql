CREATE TABLE seed_user (
    id bigserial PRIMARY KEY,
    identity uuid DEFAULT uuid_generate_v4() NOT NULL,

    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    provider TEXT,
    provider_id TEXT,
    avatar TEXT,

    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc') NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'utc') NOT NULL,
    deleted_at TIMESTAMP WITHOUT TIME ZONE
);
