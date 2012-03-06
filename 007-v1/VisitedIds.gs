! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name: VisitedIds.gs
! Description: Defines instance and class methods for class VisitedIds
! ========================================================================

doit
(Object subclass: #VisitedIds
  instVarNames: #()
  classVars: #( #Category)
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false) category: 'User Classes'

%

! Remove existing behavior from VisitedIds
doit
VisitedIds removeAllMethods.
VisitedIds class removeAllMethods.
%
! ------------------- Class methods for VisitedIds
category: 'Addition'
classmethod: VisitedIds
add: anObject

  "add anObject to the global visitedIds set"

  System _add: anObject to: 26.
  
%
category: 'Addition'
classmethod: VisitedIds
includes: anObject

  "check if the global visitedIds set contains anObject"

  ^ System _testIf: anObject isIn: 26.
  
%
category: 'Addition'
classmethod: VisitedIds
initialize

  "empty the global VisitedIds set"

  ^ System _hiddenSetReinit: 26.
  
%
category: 'Addition'
classmethod: VisitedIds
size

  "return the size of the global VisitedIds set."

  ^ System _hiddenSetSize: 26.
  
%
! ------------------- Instance methods for VisitedIds
doit
VisitedIds category: 'User Classes'
%
