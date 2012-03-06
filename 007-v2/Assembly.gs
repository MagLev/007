! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================


! Remove existing behavior from Assembly
doit
Assembly removeAllMethods.
Assembly class removeAllMethods.
%
! ------------------- Class methods for Assembly
! ------------------- Instance methods for Assembly
category: 'Updating'
method: Assembly

module: mod

  "Set the instance variable module"

  module := mod.
%
category: 'Updating'
method: Assembly

setBuildDate

  "Set the build date for this assembly"

  buildDate := (dictObj AssemblyDateRandGen) next.
%
category: 'Updating'
method: Assembly

superAssembly: parent

  "Set the instance variable superAssembly"

  superAssembly := parent.
%
