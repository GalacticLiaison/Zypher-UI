# Architecture

 ┌─────────────────────────────────────────────────────────────────┐
 │                                                                 │
 │                                                                 │
 │         All "Global" State like currency/xenogen                │
 │                                                                 │
 │                                                                 │
 │                                ┌───────────────────────────┐    │
 │                                │      Ship                 │    │
 │                                │                           │    │
 │                                │                           │    │
 │                                │               ┌─────────┐ │    │
 │                                │               │ GenePod │ │    │
 │                                │               │         │ │    │
 │                                │               └─────────┘ │    │
 │                                │                           │    │
 │                                └───────────────────────────┘    │
 │                                                                 │
 │                                                                 │
 │                                                                 │
 │                                                                 │
 └─────────────────────────────────────────────────────────────────┘


You couldpotentially use "useInfiniteQuery()" to create a structured step by step path of dialog panels for a story/mission/map/etc