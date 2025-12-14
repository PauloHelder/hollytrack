-- Create members table
create table if not exists public.members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text,
  phone text,
  avatar_url text,
  groups text[] default '{}',
  join_date date default current_date,
  status text check (status in ('Ativo', 'Inativo')) default 'Ativo',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.members enable row level security;

-- Policies
create policy "Enable read access for authenticated users"
  on public.members for select
  using (auth.role() = 'authenticated');

create policy "Enable insert for authenticated users"
  on public.members for insert
  with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users"
  on public.members for update
  using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users"
  on public.members for delete
  using (auth.role() = 'authenticated');

-- Trigger to update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger members_updated_at
  before update on public.members
  for each row
  execute procedure public.handle_updated_at();
