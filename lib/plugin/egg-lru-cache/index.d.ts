import 'egg';
import LRUCache from 'lru-cache'

declare module 'egg' {
  type LRUCacheSingleton = {
    clients: Map<String, LRUCache>
    get(id: string): LRUCache
  }

  interface Application {
    lruCache: LRUCache | LRUCacheSingleton
  }

  interface EggAppConfig {
    lruCache: {
      client?: LRUCache.Options
      clients?: {
        [key: string]: LRUCache.Options
      }
      default?: LRUCache.Options
      app?: boolean
      agent?: boolean
    }
  }
}
