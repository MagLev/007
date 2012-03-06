! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================


! Remove existing behavior from Connection
doit
Connection removeAllMethods.
Connection class removeAllMethods.
%
! ------------------- Class methods for Connection
category: 'Creation'
classmethod: Connection

newFromAtomicPart: fromAtomicPart toAtomicPart: toAtomicPart

  "Create a new connection object."

  | aConnectionObj |

  aConnectionObj := self new.
  aConnectionObj dictObj: (fromAtomicPart dictObj).
  aConnectionObj fromPart: fromAtomicPart toPart: toAtomicPart.
  aConnectionObj initializeState.
  ^aConnectionObj.
%
! ------------------- Instance methods for Connection
category: 'Accessing'
method: Connection
dictObj

   "Return the value of the instance variable 'dictObj'."
   ^dictObj
%
category: 'Updating'
method: Connection
dictObj: newValue

   "Modify the value of the instance variable 'dictObj'."
   dictObj := newValue
%
category: 'Accessing'
method: Connection
from

   "Return the value of the instance variable 'from'."
   ^from
%
category: 'Updating'
method: Connection
from: newValue

   "Modify the value of the instance variable 'from'."
   from := newValue
%
category: 'Initialization'
method: Connection

fromPart: fromAtomicPart toPart: toAtomicPart

  "Set up the pointers from the connection object to the
   atomic parts and from the atomic parts to the connection
   object."

  "Establish pointer back to from part."
  from := fromAtomicPart.
  "Establish forward pointer to to part."
  to   := toAtomicPart.

  "Establish pointers to connection."
  fromAtomicPart addToConnection:   self.
  toAtomicPart   addFromConnection: self.
%
category: 'Accessing'
method: Connection

	getToPart

	^to
%
category: 'Initialization'
method: Connection

initializeState
  
  "Initialize the internals of a connection object."

  
  "Create an instance of String containing the elements of String
   stored in the types array"
  type := String withAll: (types at: (dictObj TypeRandGen next)).
  length := dictObj XYRandGen next.
%
category: 'Accessing'
method: Connection
length

   "Return the value of the instance variable 'length'."
   ^length
%
category: 'Updating'
method: Connection
length: newValue

   "Modify the value of the instance variable 'length'."
   length := newValue
%
category: 'Accessing'
method: Connection
to

   "Return the value of the instance variable 'to'."
   ^to
%
category: 'Updating'
method: Connection
to: newValue

   "Modify the value of the instance variable 'to'."
   to := newValue
%
category: 'Accessing'
method: Connection
type

   "Return the value of the instance variable 'type'."
   ^type
%
category: 'Updating'
method: Connection
type: newValue

   "Modify the value of the instance variable 'type'."
   type := newValue
%
doit
Connection category: 'Collections'
%
