! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================

doit
(DesignObj subclass: #SharedModule
  instVarNames: #(#subModules)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false)

%

! Remove existing behavior from SharedModule
doit
SharedModule removeAllMethods.
SharedModule class removeAllMethods.
%
! ------------------- Class methods for SharedModule
! ------------------- Instance methods for SharedModule
category: 'Accessing'
method: SharedModule
subModules

   "Return the value of the instance variable 'subModules'."
   ^subModules
%
category: 'Updating'
method: SharedModule
subModules: newValue

   "Modify the value of the instance variable 'subModules'."
   subModules := newValue
%
