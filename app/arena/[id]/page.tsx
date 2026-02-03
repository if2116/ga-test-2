import { LocaleRedirect } from '@/components/locale-redirect';
import { arenas } from '@/lib/data';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return arenas.map((arena) => ({ id: arena.folderId }));
}

export default async function ArenaDetailRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LocaleRedirect targetPath={`/arena/${id}`} />;
}
