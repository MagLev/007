! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name: Random.gs
! Description: Defines instance and class methods for class Random
! ========================================================================

expectvalue #Random
run
(Stream subclass: #Random
  instVarNames: #(#seed #minimum #range)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false) name

%

! Remove existing behavior from Random
expectvalue %Metaclass 
run
Random removeAllMethods.
Random class removeAllMethods.
%
! ------------------- Class methods for Random
category: 'Constructor'
classmethod: Random

newGeneratorWithLowerBound: smallest upperBound: largest

  "Creates a random number generator with range 
  lowerBound - UpperBound"

  |rand |

  rand := self new.
  rand seed: 17. "Default seed."
  rand minimum: smallest.
  rand range: (largest - smallest + 1).
 
  ^rand.
%
! ------------------- Instance methods for Random
category: 'Updating'
method: Random
minimum: newValue

   "Modify the value of the instance variable 'minimum'."
   minimum := newValue
%
category: 'Stream'
method: Random

next

  "Give the next random number."

  seed := 13849 + (27181 * seed) \\ 65536.
  ^ seed \\ range + minimum.
%
category: 'Updating'
method: Random
range: newValue

   "Modify the value of the instance variable 'range'."
   range := newValue
%
category: 'Updating'
method: Random
seed: newValue

   "Modify the value of the instance variable 'seed'."
   seed := newValue
%
