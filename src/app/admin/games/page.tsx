import { GamesManager } from '@/components/admin/GamesManager';
import { getAllGames, getCategories } from '@/lib/queries';

export default function AdminGamesPage() {
  return <GamesManager initialGames={getAllGames()} categories={getCategories()} />;
}
