! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================


! Remove existing behavior from CompositePart
doit
CompositePart removeAllMethods.
CompositePart class removeAllMethods.
%
! ------------------- Class methods for CompositePart
category: 'Creation'
classmethod: CompositePart

newWithId: compPartId dictObj: dictionary

  "Build a new composite part with the given id."

  | aCompositePart |

  aCompositePart := self new.
  aCompositePart dictObj: dictionary.
  aCompositePart setIdAndType: compPartId.
  aCompositePart initializeState.

  ^aCompositePart.
%
! ------------------- Instance methods for CompositePart
category: 'Initialization'
method: CompositePart
initializeState

  "Initialize the internals of a composite object. This includes
   the building of the graph of atomic objects which are part of 
   the composite object."

  | atomicId anAtomicPart atomicParts toPart
    numConnectionsRemaining |

  "For the buildDate, if a part is *young* the value is chosen
   randomly from one range and if *old*, it is chosen from a
   different range."

  (id \\ YoungCompFrac) = 0
          ifTrue:  [buildDate := (dictObj YoungCompBuildDateRandGen) next]
          ifFalse: [buildDate := (dictObj OldCompBuildDateRandGen) next].

  documentation := Document newForCompPart: self compPartId: id.

  atomicParts := Array new: NumAtomicPerComp.
  "temporary array to hold the atomic parts."

  "First create the atomic parts"
  1 to: NumAtomicPerComp do: [
    :index |
    atomicId := (dictObj AtomicIdGen) next.
    anAtomicPart := AtomicPart newWithId: atomicId
                               compositePart: self
                               dictObj: dictObj.

    "Store the newly created part in the temporary array"
    atomicParts at: index put: anAtomicPart.
    ].

  rootPart := atomicParts at: 1.

  "First connect all the parts in a circular list. This ensures that
   all the parts are connected"

  2 to: NumAtomicPerComp do: [
    :index |
    Connection newFromAtomicPart: (atomicParts at: index)
               toAtomicPart:      (atomicParts at: (index -1)).
    ].

 "Close the circular list by linking the first part to the last"
  Connection newFromAtomicPart: (atomicParts at: 1)
             toAtomicPart:      (atomicParts last).


  "Randomly connect all the atomic parts to each other to form a graph of
   atomic parts. The first connection has already been done into a
   circular list. Do the rest of the connections."

  numConnectionsRemaining := NumConnPerAtomic - 1.

  1 to: NumAtomicPerComp do: [
    :index |
    numConnectionsRemaining timesRepeat: [
      toPart := (dictObj ConnectionRandGen) next.
      Connection newFromAtomicPart: (atomicParts at: index)
                 toAtomicPart:      (atomicParts at: toPart).
      ].
    ].

%
category: 'Traversal'
method: CompositePart
readOnlyMultiUserWork: repeatCount

| count visitedIds |

count := 0.
repeatCount timesRepeat: [
  visitedIds := Set new.
  count := count + (rootPart readOnlyMultiUserWork: visitedIds).
  ].

^ count.
%
category: 'Traversal'
method: CompositePart
readOnlyMultiUserWorkShared: repeatCount

| count visitedIds |

count := 0.
repeatCount timesRepeat: [
  visitedIds := Set new.
  count := count + (rootPart readOnlyMultiUserWork: visitedIds).
  ].

^ count.
%
category: 'Traversal'
method: CompositePart
traverse: traverseType

| visitedIds partsVisited |

visitedIds := Set new.

(traverseType = #T1)
ifTrue: [partsVisited := rootPart traverseT1:  visitedIds].

(traverseType = #T2A)
ifTrue: [partsVisited := rootPart traverseT2A: visitedIds].

(traverseType = #T2B)
ifTrue: [partsVisited := rootPart traverseT2B: visitedIds].

(traverseType = #T2C)
ifTrue: [partsVisited := rootPart traverseT2C: visitedIds].

(traverseType = #T3A)
ifTrue: [partsVisited := rootPart traverseT3A: visitedIds].

(traverseType = #T3B)
ifTrue: [partsVisited := rootPart traverseT3B: visitedIds].

(traverseType = #T3C)
ifTrue: [partsVisited := rootPart traverseT3C: visitedIds].

(traverseType = #T6)
ifTrue: [partsVisited := rootPart traverseT6].

^partsVisited.
%
category: 'Performance Testing'
method: CompositePart
updateMultiUserTrivial: repeatCount

  rootPart toggleDate.
  ^1
%
category: 'Traversal'
method: CompositePart
updateMultiUserWork: repeatCount

| count visitedIds |

count := 0.
repeatCount timesRepeat: [
  visitedIds := Set new.
  count := count + (rootPart updateMultiUserWork: visitedIds).
  ].

^ count.
%
category: 'Traversal'
method: CompositePart
updateMultiUserWorkShared: repeatCount

| count visitedIds |

count := 0.
repeatCount timesRepeat: [
  visitedIds := Set new.
  count := count + (rootPart updateMultiUserWork: visitedIds).
  ].

^ count.
%
category: 'Accessing'
method: CompositePart
usedInPriv

   "Return the value of the instance variable 'usedInPriv'."
   ^usedInPriv
%
category: 'Accessing'
method: CompositePart
usedInShar

   "Return the value of the instance variable 'usedInShar'."
   ^usedInShar
%
