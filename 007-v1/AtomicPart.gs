! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - AtomicPart.gs
! Description: Defines instance and class methods for class AtomicPart
!
! ========================================================================
input util/resultcheck.tpz
omit oops

level 0

! Remove existing behavior from AtomicPart
expectvalue %Metaclass
run
AtomicPart removeAllMethods.
AtomicPart class removeAllMethods.
%
! ------------------- Class methods for AtomicPart
category: 'Constructor'
classmethod: AtomicPart

newWithId: ptId compositePart: cp

  "AtomicPart Constructor"

  | anAtomicPart |

  anAtomicPart := self new.

  "initialize internal state of new part"
  anAtomicPart id: ptId.
  anAtomicPart initialize.
  anAtomicPart partOf: cp.

  ^anAtomicPart.
%
! ------------------- Instance methods for AtomicPart
category: 'Updating'
method: AtomicPart
add: newObject

  "add newObject to the varying part of the object."
  
  self at: (self size + 1) put: newObject.
%
category: 'ConnectionGraph'
method: AtomicPart

addFromConnection: connectionObj

  "Add a pointer from the atomic object to the connection
   object."

  from add: connectionObj.
%
category: 'ConnectionGraph'
method: AtomicPart

addToConnection: connectionObj

  "Add a pointer from the atomic object to the connection
   object. The to pointer is contained in the varying part of the 
   object."

  self add: connectionObj.
%
category: 'Misc'
method: AtomicPart

doNothing

  "Do nothing. Just busy work."

  (id < 0) 
    ifTrue: [MesgLog add: 'doNothing: negative id'].
  
  (debugMode)
    ifTrue: [MesgLog add: 'doNothing: debug'].

  (RealWork)
    ifTrue: [WorkAmount timesRepeat: [DateTime now]].
%
category: 'Accessing'
method: AtomicPart
docId

   "Return the value of the instance variable 'docId'."
   ^docId
%
category: 'Updating'
method: AtomicPart
docId: newValue

   "Modify the value of the instance variable 'docId'."
   docId := newValue
%
category: 'Accessing'
method: AtomicPart
from

   "Return the value of the instance variable 'from'."
   ^from
%
category: 'Updating'
method: AtomicPart
from: newValue

   "Modify the value of the instance variable 'from'."
   from := newValue
%
category: 'Initialization'
method: AtomicPart
initialize

| lower2Date lower3Date |
  "Initialize the internals of a new atomic part."
  " Store the number of elements that have a buildDate
   greater than lower2Date and lower3Date to verify
   Query2 and Query3 later "


  lower2Date := MaxAtomicDate -
             ((MaxAtomicDate - MinAtomicDate) * Query2Percent / 100) asInteger.
  lower3Date := MaxAtomicDate -
             ((MaxAtomicDate - MinAtomicDate) * Query3Percent / 100) asInteger.


  type := String withAll: (types at: (TypeRandGen next)).
  buildDate := AtomicDateRandGen next.

  (buildDate >= lower2Date) ifTrue: [ Query2Size := Query2Size + 1 ].
  (buildDate >= lower3Date) ifTrue: [ Query3Size := Query3Size + 1 ].

  x := XYRandGen next.
  y := XYRandGen next.
   
  docId := DocIdRandGen next.
  from  := IdentityBag new.
%
category: 'Accessing'
method: AtomicPart
partOf

   "Return the value of the instance variable 'partOf'."
   ^partOf
%
category: 'Updating'
method: AtomicPart
partOf: newValue

   "Modify the value of the instance variable 'partOf'."
   partOf := newValue
%
category: 'Misc'
method: AtomicPart
remove: removedIds

  "Remove all references to atomic parts contained in a composite part
   by doing a traversal through the network of atomic object for the
   composite part."

  AllAtomicParts removeIdentical: self.

  "now, record the fact that we've visited this part."
  removedIds add: self.

  "continue with a DFS of the atomic parts graph."
  1 to: self size do: [:i | | anAtomicPart |
    anAtomicPart := (self at: i) to.
    (removedIds includesIdentical: anAtomicPart) 
      ifFalse: [ anAtomicPart removeIdentical: removedIds ].
    ].
%
category: 'Updating'
method: AtomicPart

swapXY

  "Exchange x and y values. Method used in Update traversals."

  | temp |

  temp := x.
  x    := y.
  y    := temp.
%
category: 'Updating'
method: AtomicPart

toggleDate

  "Increment the build date if it is odd, 
   decrement it if even. This method is used in update 
   traversals."

  buildDate even
    ifTrue:  [buildDate := buildDate - 1]
    ifFalse: [buildDate := buildDate + 1].

  "Indexes get updated automatically."
%
category: 'Traversal'
method: AtomicPart
traverseT1: visitedIds

  self doNothing.
   
  "now, record the fact that we've visited this part."
  visitedIds add: self.

  "continue with a DFS of the atomic parts graph."
  1 to: self size do: [:i | | anAtomicPart |
    anAtomicPart := (self at: i) to.
    (visitedIds includesIdentical: anAtomicPart) 
      ifFalse: [ anAtomicPart traverseT1: visitedIds ].
    ].
  ^ visitedIds size.
%
category: 'Traversal'
method: AtomicPart
traverseT2A: visitedIds

  | count |

  count := 0.

  "swap X and Y if first part."
  (visitedIds isEmpty)
    ifTrue: [self swapXY.
             count := 1].

  "now, record the fact that we've visited this part."
  visitedIds add: self.

  "continue with a DFS of the atomic parts graph."
  1 to: self size do: [:i | | anAtomicPart |
    anAtomicPart := (self at: i) to.
    (visitedIds includesIdentical: anAtomicPart) 
      ifFalse: [count := count + (anAtomicPart traverseT2A: visitedIds)]
    ].

  ^count
%
category: 'Traversal'
method: AtomicPart

traverseT2B: visitedIds

  "swap X and Y"
  self swapXY.

  "now, record the fact that we've visited this part."
  visitedIds add: self.

  "finally, continue with a DFS of the atomic parts graph."
  1 to: self size do: [:i| | anAtomicPart |
    anAtomicPart := (self at: i) to.
    (visitedIds includesIdentical: anAtomicPart)
      ifFalse: [ anAtomicPart traverseT2B: visitedIds ]
    ].

  ^ visitedIds size.
%
category: 'Traversal'
method: AtomicPart

traverseT2C: visitedIds

  | count |

  "swap X and Y repeatedly."
  UpdateRepeatCnt timesRepeat: [self swapXY].
  count := UpdateRepeatCnt.

  "now, record the fact that we've visited this part."
  visitedIds add: self.

  "finally, continue with a DFS of the atomic parts graph." 
  1 to: self size do: [:i | | anAtomicPart |
    anAtomicPart := (self at: i) to.
    (visitedIds includesIdentical: anAtomicPart) 
      ifFalse: [count := count + (anAtomicPart traverseT2C: visitedIds)]
    ].

  ^count
%
category: 'Traversal'
method: AtomicPart
traverseT3A: visitedIds

  | count |

  count := 0.

  "toggle date if first part."
  (visitedIds isEmpty)
    ifTrue: [self toggleDate.
             count := 1].

  "now, record the fact that we've visited this part."
  visitedIds add: self.

  "continue with a DFS of the atomic parts graph."
  1 to: self size do: [:i | | anAtomicPart |
    anAtomicPart := (self at: i) to.
    (visitedIds includesIdentical: anAtomicPart) 
      ifFalse: [count := count + (anAtomicPart traverseT3A: visitedIds)]
    ].

  ^count
%
category: 'Traversal'
method: AtomicPart

traverseT3B: visitedIds

  "toggle date"
  self toggleDate.

  "now, record the fact that we've visited this part."
  visitedIds add: self.

  "finally, continue with a DFS of the atomic parts graph."
  1 to: self size do: [:i| | anAtomicPart |
    anAtomicPart := (self at: i) to.
    (visitedIds includesIdentical: anAtomicPart)
      ifFalse: [ anAtomicPart traverseT3B: visitedIds ]
    ].

  ^ visitedIds size.
%
category: 'Traversal'
method: AtomicPart

traverseT3C: visitedIds

  | count |

  "toggle date repeatedly."
  UpdateRepeatCnt timesRepeat: [self toggleDate].
  count := UpdateRepeatCnt.

  "now, record the fact that we've visited this part."
  visitedIds add: self.

  "finally, continue with a DFS of the atomic parts graph." 
  1 to: self size do: [:i | | anAtomicPart |
    anAtomicPart := (self at: i) to.
    (visitedIds includesIdentical: anAtomicPart) 
      ifFalse: [count := count + (anAtomicPart traverseT3C: visitedIds)]
    ].

  ^count
%
category: 'Traversal'
method: AtomicPart
traverseT6: visitedIds

  "examine only the root part."
  self doNothing.
  ^1
%
category: 'Updating'
method: AtomicPart
x: newValue

   "Modify the value of the instance variable 'x'."
   x := newValue
%
category: 'Updating'
method: AtomicPart
y: newValue

   "Modify the value of the instance variable 'y'."
   y := newValue
%
