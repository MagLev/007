! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================


! Remove existing behavior from DesignObj
doit
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
dictObj

   "Return the value of the instance variable 'dictObj'."
   ^dictObj
%
category: 'Updating'
method: DesignObj
dictObj: newValue

   "Modify the value of the instance variable 'dictObj'."
   dictObj := newValue
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
category: 'Updating'
method: DesignObj

setIdAndType: idValue

"Initialize the id instance variable and the type of the
 object"

    "First set the id"
    id := idValue.

    "Create an instance of String containing the elements of String
     stored in the types array"
    type := String withAll: (types at: (dictObj TypeRandGen next)).
%
category: 'Updating'
method: DesignObj
toggleDate

  "Increment the build date if it is odd, 
   decrement it if even. This method is used in update 
   traversals."

  buildDate even
    ifTrue:  [buildDate := buildDate - 1]
    ifFalse: [buildDate := buildDate + 1].

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
