import { useCallback, useEffect, useState } from 'preact/hooks';
import amplitude from 'amplitude-js';

import { getIsTaxonomyEnabled, getEventTypes } from 'src/services/taxonomy';

type TaxonomyHook = [{
  isEnabled: boolean,
  isLoading: boolean,
  plannedEvents: string[],
}, () => Promise<void>];

export function useTaxonomy(apiKey: string, secretKey: string): TaxonomyHook {
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);
  const [plannedEvents, setPlannedEvents] = useState<string[]>([]);

  const refreshData = useCallback(async (): Promise<void> => {
    if (apiKey.length > 0 && secretKey.length > 0) {
      setIsLoading(true);
      try {
        const responseIsEnabled = await getIsTaxonomyEnabled(apiKey, secretKey);
        setIsEnabled(responseIsEnabled);
        amplitude.getInstance().logEvent('Check if taxonomy is enabled', { 'is taxonomy enabled': responseIsEnabled });
        if (responseIsEnabled) {
          const responsePlannedEvents = await getEventTypes(apiKey, secretKey);
          setPlannedEvents(responsePlannedEvents);
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [apiKey, secretKey]);

  useEffect(() => {
    // Note(Kelvin): I can't pass refresh data directly in here
    // because useEffect requires a func that returns void or a cleanup func
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refreshData();
  }, [refreshData]);

  return [{ isEnabled, isLoading, plannedEvents }, refreshData];
}
