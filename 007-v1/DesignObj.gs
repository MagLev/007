! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - DesignObj.gs
! Description: Defines instance and class methods for class DesignObj
!
! ========================================================================
input util/resultcheck.tpz
omit oops

level 0

! Remove existing behavior from DesignObj
expectvalue %Metaclass
run
DesignObj removeAllMethods.
DesignObj class removeAllMethods.
%
! ------------------- Class methods for DesignObj
! ------------------- Instance methods for DesignObj
category: 'Accessing'
method: DesignObj
buildDate

   "Return the value of the instance variable 'buildDate'."
   ^buildDate
%
category: 'Updating'
method: DesignObj
buildDate: newValue

   "Modify the value of the instance variable 'buildDate'."
   buildDate := newValue
%
category: 'Accessing'
method: DesignObj
id

   "Return the value of the instance variable 'id'."
   ^id
%
category: 'Updating'
method: DesignObj
id: newValue

   "Modify the value of the instance variable 'id'."
   id := newValue
%
category: 'Accessing'
method: DesignObj
type

   "Return the value of the instance variable 'type'."
   ^type
%
category: 'Updating'
method: DesignObj
type: newValue

   "Modify the value of the instance variable 'type'."
   type := newValue
%
