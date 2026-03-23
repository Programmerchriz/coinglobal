
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { searchCoins } from '@/lib/coingecko.actions';
import { Search as SearchIcon, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { cn, formatPercentage } from '@/lib/utils';
import useSWR from 'swr';
import { useDebounce, useKey } from 'react-use';

const TRENDING_LIMIT = 8;
const SEARCH_LIMIT = 10;

const SearchItem = ({ coin, onSelect, isActiveName }: SearchItemProps) => {
  const isSearchCoin =
    typeof coin.data?.price_change_percentage_24h === 'number';

  const change = isSearchCoin
    ? (coin as SearchCoin).data?.price_change_percentage_24h ?? 0
    : (coin as TrendingCoin['item']).data.price_change_percentage_24h?.usd ?? 0;

  return (
    <CommandItem
      value={coin.id}
      onSelect={() => onSelect(coin.id)}
      className="group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer
                bg-transparent hover:bg-(--color-5)
                data-[selected=true]:bg-(--color-10)
                border border-transparent hover:border-(--border-standard)"
    >
      <div className="flex items-center gap-3">

        <div className="relative">
          <Image
            src={coin.thumb}
            alt={coin.name}
            width={36}
            height={36}
            className="rounded-full ring-1 ring-(--color-standard) group-hover:ring-(--border-input) transition"
          />
        </div>

        <div className="flex flex-col leading-tight">

          <p
            className={cn(
              "text-sm font-semibold tracking-tight transition-colors",
              isActiveName
                ? "text-(--text-primary)"
                : "text-(--color-60) group-hover:text-(--text-primary)"
            )}
          >
            {coin.name}
          </p>

          <p className="text-xs uppercase tracking-wide text-(--color-50)">
            {coin.symbol}
          </p>

        </div>
      </div>

      <div
        className={cn(
          "flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all",
          change > 0
            ? "bg-(--color-success-10) text-(--color-success)"
            : change < 0
            ? "bg-(--color-error-10) text-(--color-error)"
            : "bg-(--color-5) text-(--color-60)"
        )}
      >
        {change > 0 ? (
          <TrendingUp size={14} />
        ) : change < 0 ? (
          <TrendingDown size={14} />
        ) : null}

        <span>{formatPercentage(Math.abs(change))}</span>
      </div>
    </CommandItem>
  );
};

export const SearchModal = ({
  initialTrendingCoins = [],
  isLoading,
}: {
  initialTrendingCoins: TrendingCoin[] | undefined;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useDebounce(
    () => {
      setDebouncedQuery(searchQuery.trim());
    },
    300,
    [searchQuery]
  );

  const { data: searchResults = [], isValidating: isSearching } = useSWR<
    SearchCoin[]
  >(
    debouncedQuery ? ['coin-search', debouncedQuery] : null,
    ([, query]) => searchCoins(query as string),
    {
      revalidateOnFocus: false,
    }
  );

  useKey(
    (event) =>
      event.key?.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey),
    (event) => {
      event.preventDefault();
      setOpen((prev) => !prev);
    },
    {},
    [setOpen]
  );

  const handleSelect = (coinId: string) => {
    setOpen(false);
    setSearchQuery('');
    setDebouncedQuery('');
    router.push(`/coins/${coinId}`);
  };

  const hasQuery = debouncedQuery.length > 0;
  const trendingCoins = initialTrendingCoins.slice(0, TRENDING_LIMIT);
  const showTrending = !hasQuery && trendingCoins.length > 0;

  const isSearchEmpty = !isSearching && !hasQuery && !showTrending;
  const isTrendingListVisible = !isSearching && showTrending;

  const isNoResults = !isSearching && hasQuery && searchResults.length === 0;
  const isResultsVisible = !isSearching && hasQuery && searchResults.length > 0;

  return (
    isLoading
      ?
        <></>
      :
        <div id="search-modal">
          <Button
            variant="outline"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-background/60 backdrop-blur-md hover:bg-muted/60 hover:cursor-pointer md:hover:cursor-text transition-all border border-(--color-10)"
          >
            <SearchIcon size={16} className="text-muted-foreground" />
            <span className="hidden md:block text-sm text-muted-foreground">
              Search
            </span>
            <kbd className="ml-2 hidden md:flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              <span>⌘</span>K
            </kbd>
          </Button>

          <CommandDialog
            open={open}
            onOpenChange={setOpen}
            className="overflow-hidden rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl shadow-2xl"
          >
            {/* Input */}
            <div className="border-b border-border/50 px-4 py-3 bg-muted/30">
              <CommandInput
                placeholder="Search for a token by name or symbol..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="h-11 rounded-lg bg-background/60 px-4 text-sm focus:ring-0 focus:outline-none"
              />
            </div>

            {/* List */}
            <CommandList className="max-h-100 overflow-y-auto custom-scrollbar px-2 py-3">
              {isSearching && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Searching...
                </div>
              )}

              {isSearchEmpty && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Type to search for coins...
                </div>
              )}

              {isTrendingListVisible && (
                <CommandGroup className="space-y-1">
                  <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Trending
                  </p>
                  {trendingCoins.map(({ item }) => (
                    <SearchItem
                      key={item.id}
                      coin={item}
                      onSelect={handleSelect}
                      isActiveName={false}
                    />
                  ))}
                </CommandGroup>
              )}

              {isNoResults && (
                <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
                  No coins found.
                </CommandEmpty>
              )}

              {isResultsVisible && (
                <CommandGroup
                  heading={
                    <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Search Results
                    </p>
                  }
                  className="space-y-1"
                >
                  {searchResults.slice(0, SEARCH_LIMIT).map((coin) => (
                    <SearchItem
                      key={coin.id}
                      coin={coin}
                      onSelect={handleSelect}
                      isActiveName
                    />
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </CommandDialog>
        </div>
  );
};
