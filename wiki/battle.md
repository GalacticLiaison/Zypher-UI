# Combat

- turn based
  - Top bar shows turn order
    - Turn order is affected by Agility after a physical attack
    - Turn order is affected by Will after a mental attack
    - Buffs like Haste could affect it too
- Cards!
  - drawer for hand: https://mui.com/material-ui/react-drawer/
  - Cards are used to perform actions
  - Cards are drawn from a deck
  - Cards available are a reflection of
    - the gear you have equipped
    - the abilities you've learned
    - the mutations you have
    - the profession/job you have
  - cards have various rarity levels
    - they are determined by the level the player has achieved in the above categories
  - different types of cards
    - action
    - spawn/minion
    - trap/counter (reaction?) cards
- agility could affect
- party fights
  - 3 characters?
    - per side
    - everyone has own hand
    - can replace with pets?
      - think of wheel of time isa-Di Colers
- status effects you can stack

  - positive
    - haste
    - various shields
    - might
    - steady aim/calm - increases accuracy
    - regen
  - negative
    - slow
    - blind
    - confusion

Turn Phase

- When characters turn:
  - draw one card
    - undecided on max hand size
  - can play cards
    - amount of cards able to display based on stats
      - stamina (strength/fortitude)
      - mana (intelligence/will)
        - maybe same stats for some "cyber" resource
    - can use actions to attack
    - can spawn spawns
      - spawns are not directly controlled and have their own AI
        - they may be directed though with special cards

Battle Mechanics

- turn draw count
- <br />

- if done right this could be the money making engine

  - allow multiplayer where you use the char from your save!
  - possible rewards

- spawns can move side to side on spots instead of attack
  - maybe spawns dont attack the turn they are summoned?
  - opens up focus on spawn placement to avoid/trigger effects
