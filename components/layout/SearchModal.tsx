
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
import { Search as SearchIcon, TrendingDown, TrendingUp, X } from 'lucide-react';
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
      className="group flex items-center justify-between rounded-lg px-3 py-2.5 cursor-pointer bg-transparent hover:bg-(--bg-hover) data-[selected=true]:bg-(--bg-hover) transition-all"
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
    400,
    [searchQuery]
  );

  const { data: searchResults = [], isValidating: isSearching } = useSWR<
    SearchCoin[]
  >(
    debouncedQuery ? ['coin-search', debouncedQuery] : null,
    ([, query]) => searchCoins(query as string),
    {
      revalidateOnFocus: false,
      dedupingInterval: 15000,
      keepPreviousData: true,
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
            showCloseButton={false}
            className="overflow-hidden rounded-2xl border border-(--border-standard) bg-(--bg-surface)/95 backdrop-blur-2xl shadow-2xl max-w-2xl"
          >
            {/* SEARCH HEADER */}
            <div className="relative px-5 pt-5 pb-3 space-y-3 border-b border-(--border-standard)">
              
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-10 right-8 p-1 rounded-lg hover:bg-(--bg-hover) transition-colors text-(--color-60) hover:text-(--text-primary)"
              >
                <X size={20} />
              </button>

              {/* INPUT */}
              <div className="flex items-center gap-3 bg-(--bg-elevated) px-4 py-3 rounded-xl border border-(--border-input)">

                <CommandInput
                  placeholder="Search"
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  className="border-none focus:outline-none focus:ring-0 bg-transparent text-sm"
                />

              </div>

              {/* FILTER CHIPS */}
              <div className="flex flex-wrap gap-2 pt-1">
                {["Cryptoassets", "NFTs", "Exchanges"].map((chip) => (
                  <span
                    key={chip}
                    className="text-xs px-3 py-1.5 rounded-lg bg-(--bg-sidebar) border border-(--border-input) text-(--text-primary)"
                  >
                    {chip}
                  </span>
                ))}

                <span className="text-xs px-3 py-1.5 rounded-lg bg-(--color-5) text-(--color-60)">
                  Add New
                </span>
              </div>
            </div>

            {/* LIST */}
            <CommandList className="max-h-105 overflow-y-auto custom-scrollbar px-3 py-3">

              {isSearching && (
                <div className="py-6 text-center text-sm text-(--color-50)">
                  Searching...
                </div>
              )}

              {isSearchEmpty && (
                <div className="py-6 text-center text-sm text-(--color-50)">
                  Type to search...
                </div>
              )}

              {/* TRENDING → RECENT SEARCHES */}
              {isTrendingListVisible && (
                <CommandGroup className="space-y-1">

                  <p className="px-2 pb-2 text-xs font-semibold text-(--color-50)">
                    Recent searches
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

              {/* NO RESULTS */}
              {isNoResults && (
                <CommandEmpty className="py-6 text-center text-sm text-(--color-50)">
                  No coins found.
                </CommandEmpty>
              )}

              {/* RESULTS */}
              {isResultsVisible && (
                <CommandGroup
                  heading={
                    <p className="px-2 pb-2 text-xs font-semibold text-(--color-50)">
                      Trading crypto
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
