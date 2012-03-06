! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - IdGenerator.gs
! Description: Defines instance and class methods for class 
!              IdGenerator
!
! ========================================================================

input util/resultcheck.tpz
omit oops

level 0
expectvalue #IdGenerator
run
(Object subclass: #IdGenerator
  instVarNames: #(#currId)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false) name

%


! ------------------- Class methods for IdGenerator
category: 'Constructor'
classmethod: IdGenerator

createNew

 | temp |

 temp := self new.
 temp currId: 0.
 ^temp.

%
! ------------------- Instance methods for IdGenerator
category: 'Accessing'
method: IdGenerator
currId

   "Return the value of the instance variable 'currId'."
   ^currId
%
category: 'Updating'
method: IdGenerator
currId: newValue

   "Modify the value of the instance variable 'currId'."
   currId := newValue
%
category: 'Updating'
method: IdGenerator
next

   currId := currId + 1.
   ^currId.
%
