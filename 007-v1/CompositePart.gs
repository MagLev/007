! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - CompositePart.gs
! Description: Defines instance and class methods for class
!              CompositePart
!
! ========================================================================
input util/resultcheck.tpz
omit oops

level 0

! Remove existing behavior from CompositePart
expectvalue %Metaclass
run
CompositePart removeAllMethods.
CompositePart class removeAllMethods.
%
! ------------------- Class methods for CompositePart
category: 'Constructor'
classmethod: CompositePart

newWithId: cpId

  "Build a new composite part with the given id."

  | aCompositePart |

  aCompositePart := self new.

  aCompositePart id: cpId.
  aCompositePart initialize.

  ^aCompositePart.
%
! ------------------- Instance methods for CompositePart
category: 'Initialization'
method: CompositePart
add: newObject

  "add newObject at the end of the varying part of this object."

  self at: (self size + 1) put: newObject.

%
category: 'Accessing'
method: CompositePart
documentation

   "Return the value of the instance variable 'documentation'."
   ^documentation
%
category: 'Updating'
method: CompositePart
documentation: newValue

   "Modify the value of the instance variable 'documentation'."
   documentation := newValue
%
category: 'Initialization'
method: CompositePart
initialize

  "Initialize the internals of a composite object. This includes
   the building of the graph of atomic objects which are part of 
   the composite object."

  | atomicId anAtomicPart atomicParts toPart
    numConnectionsRemaining |


  type := String withAll: (types at: (TypeRandGen next)).

  "For the buildDate, if a part is *young* the value is chosen
   randomly from one range and if *old*, it is chosen from a
   different range."

  (id \\ YoungCompFrac) = 0
          ifTrue:  [buildDate := YoungCompBuildDateRandGen next]
          ifFalse: [buildDate := OldCompBuildDateRandGen next].

  usedInShar := IdentityBag new.
  usedInPriv := IdentityBag new.

  "initialize the documentation (indexed by its title and id) ..."
  documentation := Document newForCompPart: self compPartId: id.

  "The indexes on title and id are created later."

  "now create the atomic parts ..."

  "First create all the atomic parts"
  1 to: NumAtomicPerComp do: [
    :index |
    atomicId := AtomicIdGen next.
    anAtomicPart := AtomicPart newWithId: atomicId compositePart: self.

    "Add the atomic part to the varying part of the composite object (parts)."
    self add: anAtomicPart.

    AllAtomicParts add: anAtomicPart.
    ].

  "first atomic part is the root part."
  rootPart := self at: 1.

  "... and then wire them semi-randomly together (as a ring plus random
   additional connections to ensure full part reachability for traversals)."

  1 to: NumAtomicPerComp do: [ :from |
    1 to: NumConnPerAtomic do: [ :i | | to |
      (i = NumConnPerAtomic)
        ifTrue: [ to := from + 1 ]
        ifFalse: [ to := ConnectionRandGen next ].

      "Take care of the wrap around case."
      (to > NumAtomicPerComp) ifTrue: [ to := 1 ].
      
      Connection newFromAtomicPart: (self at: from)
                 toAtomicPart:      (self at: to).
      ].
    ].
  
  "Store the composite part in the Array AllCompositeParts."
  AllCompositeParts add: self.

  (sharedCp at: id) do: [ :aBaseAssembly |

    "add this assembly to the list of assemblies in which
     this composite part is used as a shared member."
    usedInShar add: aBaseAssembly.

    "then add the composite part (self) to the list of shared parts used
     in this assembly."
    aBaseAssembly componentsShar add: self.
    ].


  (privateCp at: id) do: [ :aBaseAssembly |

    "add this assembly to the list of assemblies in which
     this composite part is used as a private member."
    usedInPriv add: aBaseAssembly.

    "then add the composite part (self) to the list of private parts used
     in this assembly."
    aBaseAssembly componentsPriv add: self.
    ] 
  
%
category: 'Accessing'
method: CompositePart
rootPart

   "Return the value of the instance variable 'rootPart'."
   ^rootPart
%
category: 'Updating'
method: CompositePart
rootPart: newValue

   "Modify the value of the instance variable 'rootPart'."
   rootPart := newValue
%
category: 'Traversal'
method: CompositePart
traverse: op
  "CompositePart Method for Traversal."

  | visitedIds |
  
  visitedIds := Set new.

  ^ rootPart perform: (#traverse + op + ':') with: visitedIds.
  
%
category: 'Accessing'
method: CompositePart
usedInPriv

   "Return the value of the instance variable 'usedInPriv'."
   ^usedInPriv
%
category: 'Updating'
method: CompositePart
usedInPriv: newValue

   "Modify the value of the instance variable 'usedInPriv'."
   usedInPriv := newValue
%
category: 'Accessing'
method: CompositePart
usedInShar

   "Return the value of the instance variable 'usedInShar'."
   ^usedInShar
%
category: 'Updating'
method: CompositePart
usedInShar: newValue

   "Modify the value of the instance variable 'usedInShar'."
   usedInShar := newValue
%
