-- Marco 3.1: media metadata and a private Storage bucket.
-- Apply once, after 20260928000000_create_profiles.sql.

create table public.media (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  file_name text not null
    check (file_name <> '' and file_name not like '%/%' and file_name not in ('.', '..')),
  storage_path text generated always as (
    user_id::text || '/' || id::text || '/' || file_name
  ) stored not null,
  mime_type text,
  file_size bigint check (file_size >= 0),
  duration_seconds numeric check (duration_seconds >= 0),
  status text not null default 'uploading'
    check (status in ('uploading', 'ready', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index media_user_created_at_idx
  on public.media (user_id, created_at desc);

create trigger on_media_updated
  before update on public.media
  for each row execute function private.set_profile_updated_at();

alter table public.media enable row level security;

revoke all on public.media from anon, authenticated;
grant select, delete on public.media to authenticated;
grant insert (file_name, mime_type, file_size, duration_seconds, status)
  on public.media to authenticated;
grant update (mime_type, file_size, duration_seconds, status)
  on public.media to authenticated;

create policy "Media: select own rows"
  on public.media for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Media: insert own rows"
  on public.media for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Media: update own rows"
  on public.media for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Media: delete own rows"
  on public.media for delete to authenticated
  using ((select auth.uid()) = user_id);

-- A pre-existing bucket with the same ID should be reviewed, not silently reused.
insert into storage.buckets (id, name, public)
values ('media', 'media', false);

-- Restrictive boundary also applies if another permissive Storage policy exists.
-- The first folder is the user ID; the second is the media UUID.
create policy "Media bucket: enforce private owner path"
  on storage.objects as restrictive for all to public
  using (
    bucket_id <> 'media' or (
      (select auth.uid()) is not null
      and (storage.foldername(name))[1] = (select auth.uid())::text
      and cardinality(storage.foldername(name)) = 2
      and (storage.foldername(name))[2] ~ '^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$'
      and storage.filename(name) <> ''
    )
  )
  with check (
    bucket_id <> 'media' or (
      (select auth.uid()) is not null
      and (storage.foldername(name))[1] = (select auth.uid())::text
      and cardinality(storage.foldername(name)) = 2
      and (storage.foldername(name))[2] ~ '^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$'
      and storage.filename(name) <> ''
    )
  );

create policy "Media bucket: select own objects"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Media bucket: insert own objects"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Media bucket: update own objects"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Media bucket: delete own objects"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
