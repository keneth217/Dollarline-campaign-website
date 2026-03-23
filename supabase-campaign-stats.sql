-- Run in Supabase Dashboard → SQL Editor (after volunteers table exists)
-- 1) Persist supporter_base (shown as base + volunteer count on the site)
-- 2) Single RPC for public stats (one round trip)

-- Key/value settings readable by the anon key (no PII)
create table if not exists public.campaign_stats (
  key text primary key,
  value bigint not null default 0
);

insert into public.campaign_stats (key, value)
values ('supporter_base', 16897)
on conflict (key) do update set value = excluded.value;

alter table public.campaign_stats enable row level security;

drop policy if exists "Allow anon read campaign stats" on public.campaign_stats;
create policy "Allow anon read campaign stats"
  on public.campaign_stats
  for select
  to anon
  using (true);

-- Optional: allow authenticated service role / dashboard updates only (no anon update)

-- Returns volunteer_count + supporter_base in one call (security definer = consistent counts)
create or replace function public.get_public_campaign_stats()
returns json
language sql
security definer
set search_path = public
as $$
  select json_build_object(
    'volunteer_count', (select count(*)::bigint from public.volunteers),
    'supporter_base', coalesce(
      (select cs.value from public.campaign_stats cs where cs.key = 'supporter_base' limit 1),
      16897::bigint
    )
  );
$$;

grant execute on function public.get_public_campaign_stats() to anon;
