! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - Assembly.gs
! Description: Defines instance and class methods for class Assembly
!
! ========================================================================

input util/resultcheck.tpz
omit oops

level 0

! Remove existing behavior from Assembly
expectvalue %Metaclass
run
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

superAssembly: parent

  "Set the instance variable superAssembly"

  superAssembly := parent.
%
