-- CV file path on the existing profile row + Storage access for the public bucket.
-- Run in the Supabase SQL editor if upload is blocked or resume_pdf is missing.

alter table profile add column if not exists resume_pdf text;

drop policy if exists "Public read portfolio objects" on storage.objects;
create policy "Public read portfolio objects"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'portfolio');

drop policy if exists "Authenticated upload portfolio objects" on storage.objects;
create policy "Authenticated upload portfolio objects"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio');

drop policy if exists "Authenticated update portfolio objects" on storage.objects;
create policy "Authenticated update portfolio objects"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio')
  with check (bucket_id = 'portfolio');

drop policy if exists "Authenticated delete portfolio objects" on storage.objects;
create policy "Authenticated delete portfolio objects"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio');
