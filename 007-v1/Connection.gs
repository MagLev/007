! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name: Connection.gs
! Description: Defines instance and class methods for class Connection
!
! ========================================================================
input util/resultcheck.tpz
omit oops

level 0

! ------------------- Class methods for Connection
category: 'Constructor'
classmethod: Connection

newFromAtomicPart: fromAtomicPart toAtomicPart: toAtomicPart

  "Create a new connection object."

  | aConnectionObj |

  aConnectionObj := self new.
  aConnectionObj fromPart: fromAtomicPart toPart: toAtomicPart.
  aConnectionObj initialize.
  ^aConnectionObj.
%

! ========================================================================

! ------------------- Instance methods for Connection
category: 'Accessing'
method: Connection
from

   "Return the value of the instance variable 'from'."
   ^from
%

! ========================================================================

category: 'Updating'
method: Connection
from: newValue

   "Modify the value of the instance variable 'from'."
   from := newValue
%

! ========================================================================

category: 'Initialization'
method: Connection

fromPart: fromAtomicPart toPart: toAtomicPart

  "Set up the pointers from the connection object to the
   atomic parts and from the atomic parts to the connection
   object."

  from := fromAtomicPart. "Establish pointer back to *from* part."
  to   := toAtomicPart.   "Establish forward pointer to *to* part."

  fromAtomicPart addToConnection: self.   "Establish pointer to connection."
  toAtomicPart   addFromConnection: self. "Establish pointer to connection."
%

! ========================================================================

category: 'Initialization'
method: Connection

initialize
  
  "initialize the simple stuff"

  type := String withAll: (types at: (TypeRandGen next)).
  length := XYRandGen next.
%

! ========================================================================

category: 'Accessing'
method: Connection
length

   "Return the value of the instance variable 'length'."
   ^length
%

! ========================================================================

category: 'Updating'
method: Connection
length: newValue

   "Modify the value of the instance variable 'length'."
   length := newValue
%

! ========================================================================

category: 'Accessing'
method: Connection
to

   "Return the value of the instance variable 'to'."
   ^to
%

! ========================================================================

category: 'Updating'
method: Connection
to: newValue

   "Modify the value of the instance variable 'to'."
   to := newValue
%

! ========================================================================

category: 'Accessing'
method: Connection
type

   "Return the value of the instance variable 'type'."
   ^type
%

! ========================================================================

category: 'Updating'
method: Connection
type: newValue

   "Modify the value of the instance variable 'type'."
   type := newValue
%

! ========================================================================

