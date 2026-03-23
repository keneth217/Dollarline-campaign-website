-- Run this in Supabase Dashboard → SQL Editor
-- 1) RLS policy for insert. 2) Unique phone (full normalized value from app). 3) Volunteer count RPC.
-- Also run supabase-campaign-stats.sql for supporter_base + get_public_campaign_stats().
-- Enable Realtime: Database → Replication → volunteers (ON).

-- Policy: allow anyone to insert a volunteer row (for the Join/Volunteer modal)
create policy "Allow anon to insert volunteers"
  on public.volunteers
  for insert
  to anon
  with check (true);

-- Phone number must be unique (multiple nulls allowed)
alter table public.volunteers
  add constraint volunteers_phone_key unique (phone);

-- Function so the app can show supporter count (3857 + this count) without exposing volunteer rows
create or replace function public.get_volunteer_count()
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*)::bigint from public.volunteers;
$$;

grant execute on function public.get_volunteer_count() to anon;
