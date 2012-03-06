! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================

doit
(Stream subclass: #Random
  instVarNames: #(#seed #minimum #range)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false)

%

! Remove existing behavior from Random
doit
Random removeAllMethods.
Random class removeAllMethods.
%
! ------------------- Class methods for Random
category: '(as yet unclassified)'
classmethod: Random

newGeneratorWithLowerBound: smallest upperBound: largest

  "Creates a random number generator with range 
  lowerBound - UpperBound"

  |rand |

  rand := self new.
  rand setSeed.
  rand lowest: smallest highest: largest.
  ^rand.
%
! ------------------- Instance methods for Random
category: '(as yet unclassified)'
method: Random

	lowest: x  highest: y

	"Set the min value and range. Range = max - min."

	minimum := x.
	range := y - x + 1.
%
category: '(as yet unclassified)'
method: Random

	next

	"Give the next random number."

	| temp a |

    range > 16384
      ifTrue: [   
	seed := 13849 + (27181 * seed) bitAnd: 8#177777.
	temp := seed \\ range + minimum.
	^temp
      ]
      ifFalse: [
        [a := (13849 + (27181 * seed)).
        seed :=  a \\ 16384 .
        0 = seed ] untilFalse.

	temp := seed \\ range + minimum.
	^temp        
      ]
%
category: '(as yet unclassified)'
method: Random

	originalnext

	"Give the next random number."

	| temp |

	seed := 13849 + (27181 * seed) bitAnd: 8#177777.
	temp := seed \\ range + minimum.
	^temp
%
category: '(as yet unclassified)'
method: Random

range: newValue

  "Set the range for the random number generator."

  range := newValue.
%
category: '(as yet unclassified)'
method: Random

seed: newValue

  "Set the seed for the random number generator."

  seed := newValue.
%
category: '(as yet unclassified)'
method: Random

setSeed

  "Set the seed for the random number generator. For now a
   constant is being set to get more repeatability. It should
   eventually become a function of time."

  | seedtmp |

  "seed := 17."
  seedtmp := ((System _readClock) / System session) asFloat truncated.
  seed := seedtmp bitAnd: 65535
%
