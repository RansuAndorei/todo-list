-- Reset public schema
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public
  AUTHORIZATION postgres;
-- Drop tables, enums, views, functions.
DO $$
DECLARE
    objectname text;
    objecttype text;
    enumname text;
    enumvalue text;
    funcname text;
BEGIN
    FOR objectname, objecttype IN
        SELECT table_name, table_type FROM information_schema.tables WHERE table_schema = 'public'
    LOOP
        IF objecttype = 'BASE TABLE' THEN
            EXECUTE 'DROP TABLE IF EXISTS ' || objectname || ' CASCADE';
        ELSIF objecttype = 'VIEW' THEN
            EXECUTE 'DROP VIEW IF EXISTS ' || objectname || ' CASCADE';
        -- Add additional ELSEIF clauses here to handle other object types
        END IF;
    END LOOP;
    FOR enumname, enumvalue IN
        SELECT t.typname, e.enumlabel
        FROM pg_type t 
            JOIN pg_enum e ON t.oid = e.enumtypid  
            JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
        WHERE n.nspname = 'public'
    LOOP
        EXECUTE 'DROP TYPE IF EXISTS ' || enumname || ' CASCADE';
    END LOOP;
    FOR funcname IN
        SELECT routine_name FROM information_schema.routines WHERE routine_schema = 'public'
    LOOP
        EXECUTE 'DROP FUNCTION IF EXISTS ' || funcname || ' CASCADE';
    END LOOP;
END $$;

CREATE TABLE todo_table (
  todo_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  todo_date_created TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  todo_task VARCHAR(4000) NOT NULL,
  todo_is_complete BOOLEAN DEFAULT FALSE NOT NULL,
  todo_user_id UUID NOT NULL
);

GRANT ALL ON ALL TABLES IN SCHEMA public TO PUBLIC;
GRANT ALL ON ALL TABLES IN SCHEMA public TO POSTGRES;

GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;