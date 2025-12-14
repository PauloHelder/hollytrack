-- FUNCTION TO CREATE USER WITH PASSWORD BY ADMIN
-- Requires pgcrypto extension to be enabled
create extension if not exists pgcrypto;

-- Drop function first to allow parameter name changes
drop function if exists public.create_new_user(text, text, text, text, text);

create or replace function public.create_new_user(
  _email text,
  _password text,
  _full_name text,
  _role text,
  _user_status text default 'Ativo'
)
returns uuid
language plpgsql
security definer
as $$
declare
  new_id uuid;
  encrypted_pw text;
begin
  -- Check if user already exists
  -- Using alias 'u' for auth.users table isn't strictly necessary if params are distinct
  if exists (select 1 from auth.users where email = _email) then
    raise exception 'Email already registered';
  end if;

  -- Generate new UUID
  new_id := gen_random_uuid();
  
  -- Encrypt password
  encrypted_pw := crypt(_password, gen_salt('bf'));

  -- Insert into auth.users
  insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token
  ) values (
    '00000000-0000-0000-0000-000000000000', -- Default instance_id for Supabase
    new_id,
    'authenticated',
    'authenticated',
    _email,
    encrypted_pw,
    now(), -- Auto confirm email
    '{"provider": "email", "providers": ["email"]}',
    jsonb_build_object('full_name', _full_name, 'role', _role),
    now(),
    now(),
    '',
    ''
  );

  -- Insert into public.profiles (if trigger doesn't cover all fields or needs update)
  -- The trigger we created earlier 'handle_new_user' will run after INSERT on auth.users
  -- It inserts basic info. We might want to ensure role is correct if the trigger hardcodes 'Membro'.
  
  -- Let's update the profile set by the trigger to match the requested role and status
  -- We wait a tiny bit or just update directly. Trigger runs synchronously.
  
  update public.profiles
  set role = _role,
      status = _user_status
  where id = new_id;
  
  return new_id;
end;
$$;

-- Grant permission to authenticated users (or restrict to admins only via RLS logic inside)
grant execute on function public.create_new_user to authenticated;
