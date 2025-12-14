
-- Allow anon/public to view active classes for registration
create policy "Public can view active classes" on public.new_member_classes for select using (true);

-- Allow anon/public to create new members (registration)
-- Note: This assumes public access is desired for the landing page
create policy "Public can register as members" on public.members for insert with check (true);

-- Allow anon/public to join class
create policy "Public can join classes" on public.new_member_class_students for insert with check (true);
