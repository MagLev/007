! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - ComplexAssembly.hs
! Description: Defines instance and class methods for class 
!              ComplexAssembly
!
! ========================================================================

input util/resultcheck.tpz
omit oops

level 0


! Remove existing behavior from ComplexAssembly
expectvalue %Metaclass
run
ComplexAssembly removeAllMethods.
ComplexAssembly class removeAllMethods.
%
! ------------------- Class methods for ComplexAssembly
category: 'Constructor'
classmethod: ComplexAssembly

newWithId: id  module: mod  parentAssembly: parent level: levelNum

  "Create a new complex assembly with the give parameters. The level
   number starts with 1 at the root of the tree and increases towards
   the leaf.
   
   This method creates an assembly and all its subassemblies (recursively)."

  | aComplexAssembly |

  aComplexAssembly := self new.
  aComplexAssembly id: id.
  aComplexAssembly superAssembly: parent.
  aComplexAssembly module: mod.
  aComplexAssembly initialize: levelNum.

  ^aComplexAssembly.
%
! ------------------- Instance methods for ComplexAssembly
category: 'Initialization'
method: ComplexAssembly

add: newObject

  "Add newObject to the bottom of the varying part"

  self at: (self size + 1) put: newObject.

  
%
category: 'Initialization'
method: ComplexAssembly

initialize: levelNum

  "Create all the subassemblies at the given level"

  | nextId subAssembly |

  "initialize the simple stuff"
  type := String withAll: (types at: (TypeRandGen next)).
  buildDate := AssemblyDateRandGen next.

  "Create as many subassemblies as specified by the 
   NumAssmPerAssm config parameter"

  NumAssmPerAssm timesRepeat: [ 

    "If it is the last level, create a base assembly - 
     otherwise create a complex assembly"
 
    (levelNum < (NumAssmLevels - 1))
      ifTrue: [
        nextId := ComplexAssemblyIdGen next.

        "recursively generate the lower level subassemblies"
        subAssembly := ComplexAssembly newWithId: nextId  
				       module: module 
				       parentAssembly: self 
				       level: (levelNum + 1).
        self add: subAssembly.
        ]

      ifFalse: [
        "The last level has a base assembly"
        nextId := BaseAssemblyIdGen next.
        subAssembly := BaseAssembly newWithId: nextId 
				    module: module
				    parentAssembly: self.
        self add: subAssembly.
        ].
    ].

%
category: 'Traversal'
method: ComplexAssembly

traverse: op
  "ComplexAssembly Method for Traversal."

  | count |

  count := 0.
  1 to: self size do: [ :i |
    count := count + ((self at: i) traverse: op)
    ].

  ^count.
%
