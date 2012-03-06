! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================


! Remove existing behavior from AtomicPart
doit
AtomicPart removeAllMethods.
AtomicPart class removeAllMethods.
%
! ------------------- Class methods for AtomicPart
category: 'Creation'
classmethod: AtomicPart

newWithId: ptId compositePart: compPart dictObj: dictionary

  "Create an AtomicPart with the give partId and make if a part of
   the give composite part"

  | anAtomicPart |

  anAtomicPart := self new.
  anAtomicPart dictObj: dictionary.
  anAtomicPart setIdAndType: ptId.
  anAtomicPart partOf: compPart.
  anAtomicPart initializeState.
  (dictionary AllAtomicParts) add: anAtomicPart.
  ^anAtomicPart.
%
! ------------------- Instance methods for AtomicPart
category: 'Comparisons'
method: AtomicPart
= anAtomicPart

anAtomicPart isNil ifTrue: [ ^ false ].
^ self id = anAtomicPart id

%

category: 'ConnectionGraph'
method: AtomicPart

addFromConnection: connectionObj

  "Add a pointer from the atomic object to the connection
   object."

  self at: fromIndex put: connectionObj.
  fromIndex := fromIndex + 1.
%
category: 'ConnectionGraph'
method: AtomicPart

addToConnection: connectionObj

  "Add a pointer from the atomic object to the connection
   object."

  self at: toIndex put: connectionObj.
  toIndex := toIndex + 1.
%
category: 'Misc'
method: AtomicPart

doNothing

  "Just do nothing."
%
category: 'Accessing'
method: AtomicPart

docId

  "Accessing the instance variable docId."

  ^docId
%
category: 'Initialization'
method: AtomicPart

initializeState

  "Initialize the internals of a new atomic part."

  buildDate := (dictObj AtomicDateRandGen) next.

  x := (dictObj XYRandGen) next.
  y := (dictObj XYRandGen) next.
   
  docId := (dictObj DocIdRandGen) next.

  "initialize space for connections to other parts"
  toIndex := 1.
  1 to: NumConnPerAtomic do: [
    :i | self at: i put: nil.
    ].
  fromIndex := NumConnPerAtomic + 1.

%
category: 'Updating'
method: AtomicPart
partOf: newValue

   "Modify the value of the instance variable 'partOf'."
   partOf := newValue
%
category: 'Traversal'
method: AtomicPart
readOnlyMultiUserWork: visitedIds

| anAtomicPart aConnection count |

(visitedIds includesIdentical: self)
  ifTrue: [^ 0]
    "if we have already visited this part, return 1 because this is the only
     part we are going to visit"

  ifFalse: [
    count := 1.
    visitedIds add: self.
    1 to: NumConnPerAtomic do: [:i | 
       aConnection := self at: i.
       anAtomicPart := aConnection getToPart.
       count := count + 
		(anAtomicPart readOnlyMultiUserWork: visitedIds).
       ].
    ^0]
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
category: 'Traversal'
method: AtomicPart
traverseT1: visitedIds

| anAtomicPart aConnection count |

(visitedIds includesIdentical: self)
  ifTrue: [^ 1]
    "if we have already visited this part, return 1 because this is the only
     part we are going to visit"

  ifFalse: [
    count := 1.
    visitedIds add: self.
    1 to: NumConnPerAtomic do: [:i | 
       aConnection := self at: i.
       anAtomicPart := aConnection getToPart.
       count := count + 
		(anAtomicPart traverseT1: visitedIds).
       ].
    ^count]
%
category: 'Traversal'
method: AtomicPart
traverseT2A: visitedIds

| anAtomicPart aConnection count |

(visitedIds includesIdentical: self)
  ifTrue: [^ 0]
    "if we have already visited this part, return 0 because we are not going
     to update this part"

  ifFalse: [
    count := 0.
    ((visitedIds size) = 0)
      ifTrue: [self swapXY.
               count := 1].

    visitedIds add: self.
    1 to: NumConnPerAtomic do: [:i | 
       aConnection := self at: i.
       anAtomicPart := aConnection getToPart.
       count := count + 
		(anAtomicPart traverseT2A: visitedIds).
       ].
    ^count]
%
category: 'Traversal'
method: AtomicPart

traverseT2B: visitedIds

| anAtomicPart aConnection count |

(visitedIds includesIdentical: self)
  ifTrue: [^ 0]
    "if we have already visited this part, return 0 because we are not going
     to update this part."

  ifFalse: [
    count := 1.
    visitedIds add: self.
    self swapXY.
    1 to: NumConnPerAtomic do: [:i | 
       aConnection := self at: i.
       anAtomicPart := aConnection getToPart.
       count := count + 
		(anAtomicPart traverseT2B: visitedIds).
       ].
    ^count.
    ]
%
category: 'Traversal'
method: AtomicPart
traverseT2C: visitedIds

| anAtomicPart aConnection count |

(visitedIds includesIdentical: self)
  ifTrue: [^ 0]
    "if we have already visited this part, return 0 because we are not going
     to update this part."

  ifFalse: [
    count := 4.
    visitedIds add: self.
    1 to: 4 do: [:i | self swapXY].
    1 to: NumConnPerAtomic do: [:i | 
       aConnection := self at: i.
       anAtomicPart := aConnection getToPart.
       count := count + 
		(anAtomicPart traverseT2C: visitedIds).
       ].
    ^count.
    ]
%
category: 'Traversal'
method: AtomicPart
traverseT3A: visitedIds

| anAtomicPart aConnection count |

(visitedIds includesIdentical: self)
  ifTrue: [^ 0]
    "if we have already visited this part, return 0 because we are not going
     to update this part"

  ifFalse: [
    count := 0.
    ((visitedIds size) = 0)
      ifTrue: [self toggleDate.
               count := 1].

    visitedIds add: self.
    1 to: NumConnPerAtomic do: [:i | 
       aConnection := self at: i.
       anAtomicPart := aConnection getToPart.
       count := count + 
		(anAtomicPart traverseT3A: visitedIds).
       ].
    ^count.
    ]
%
category: 'Traversal'
method: AtomicPart

traverseT3B: visitedIds

| anAtomicPart aConnection count |

(visitedIds includesIdentical: self)
  ifTrue: [^ 0]
    "if we have already visited this part, return 0 because we are not going
     to update this part."

  ifFalse: [
    count := 1.
    visitedIds add: self.
    self toggleDate.
    1 to: NumConnPerAtomic do: [:i | 
       aConnection := self at: i.
       anAtomicPart := aConnection getToPart.
       count := count + 
		(anAtomicPart traverseT3B: visitedIds).
       ].
    ^count.
    ]
%
category: 'Traversal'
method: AtomicPart
traverseT3C: visitedIds

| anAtomicPart aConnection count |

(visitedIds includesIdentical: self)
  ifTrue: [^ 0]
    "if we have already visited this part, return 0 because we are not going
     to update this part."

  ifFalse: [
    count := 4.
    visitedIds add: self.
    1 to: 4 do: [:i | self toggleDate].
    1 to: NumConnPerAtomic do: [:i | 
       aConnection := self at: i.
       anAtomicPart := aConnection getToPart.
       count := count + 
		(anAtomicPart traverseT3C: visitedIds).
       ].
    ^count.
    ]
%
category: 'Traversal'
method: AtomicPart
traverseT6

self doNothing.
^1
%
category: 'Traversal'
method: AtomicPart
updateMultiUserWork: visitedIds

| anAtomicPart aConnection count |

(visitedIds includesIdentical: self)
  ifTrue: [^ 0]
    "if we have already visited this part, return 0 because we are not going
     to update this part"

  ifFalse: [

    count := 1.
    self swapXY.

    visitedIds add: self.
    1 to: NumConnPerAtomic do: [:i | 
       aConnection := self at: i.
       anAtomicPart := aConnection getToPart.
       count := count + 
		(anAtomicPart updateMultiUserWork: visitedIds).
       ].
    ^count]
%
