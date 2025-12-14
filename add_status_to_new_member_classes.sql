
-- Add status column to new_member_classes table
alter table public.new_member_classes 
add column if not exists status text check (status in ('Em Andamento', 'Concluída', 'Cancelada')) default 'Em Andamento';
