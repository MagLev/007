! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================

doit
(Object subclass: #idGenerator
  instVarNames: #(#currId)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false)

%

! Remove existing behavior from idGenerator
doit
idGenerator removeAllMethods.
idGenerator class removeAllMethods.
%
! ------------------- Class methods for idGenerator
! ------------------- Instance methods for idGenerator
category: 'Accessing'
method: idGenerator
currId

   "Return the value of the instance variable 'currId'."
   ^currId
%
category: 'Updating'
method: idGenerator
currId: newValue

   "Modify the value of the instance variable 'currId'."
   currId := newValue
%
category: '(as yet unclassified)'
method: idGenerator

	next

	currId := currId + 1.
	^currId
%
