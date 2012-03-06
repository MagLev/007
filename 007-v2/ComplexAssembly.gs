! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================


! Remove existing behavior from ComplexAssembly
doit
ComplexAssembly removeAllMethods.
ComplexAssembly class removeAllMethods.
%
! ------------------- Class methods for ComplexAssembly
category: 'Creation'
classmethod: ComplexAssembly

newWithId: id  module: mod  parentAssembly: parent 
  dictObj: dictionary level: levelNum

  "Create a new complex assembly with the give parameters. The level
   number starts with 1 at the root of the tree and increases towards
   the leaf.
   
   This method creates an assembly and all its subassemblies (recursively)."

  | aComplexAssembly |

  aComplexAssembly := self new.
  aComplexAssembly dictObj: dictionary.
  aComplexAssembly setIdAndType: id.
  aComplexAssembly setBuildDate.

  aComplexAssembly module: mod.
  aComplexAssembly superAssembly: parent.

  "Create subassemblies at the next level"
  aComplexAssembly createSubAssemblies: (levelNum + 1).

  ^aComplexAssembly.
%
category: 'Creation'
classmethod: ComplexAssembly

newWithId: id  module: mod  parentAssembly: parent 
  dictObj: dictionary level: levelNum totalNumLevels: numLevels

  "Create a new complex assembly with the give parameters. The level
   number starts with 1 at the root of the tree and increases towards
   the leaf.
   
   This method creates an assembly and all its subassemblies (recursively)."

  | aComplexAssembly |

  aComplexAssembly := self new.
  aComplexAssembly dictObj: dictionary.
  aComplexAssembly setIdAndType: id.
  aComplexAssembly setBuildDate.

  aComplexAssembly module: mod.
  aComplexAssembly superAssembly: parent.

  "Create subassemblies at the next level"
  aComplexAssembly createSubAssemblies: (levelNum + 1) totalNumLevels: numLevels.

  ^aComplexAssembly.
%
! ------------------- Instance methods for ComplexAssembly
category: 'SubAssemblies'
method: ComplexAssembly

createSubAssemblies: level totalNumLevels: numLevels

  "Create all the subassemblies at the given level"

  | nextId subAssembly |

  subAssemblies := Array new: NumAssmPerAssm.

  "Create as many subassemblies as specified by the 
   NumAssmPerAssm config parameter"

  1 to: NumAssmPerAssm do: [ :i| 

    "If it is the last level, create a base assembly - 
     otherwise create a complex assembly"
 
    (level <  numLevels)

      ifTrue: [
        nextId := (dictObj ComplexAssemblyIdGen) next.

        "recursively generate the lower level subassemblies"
        subAssembly := ComplexAssembly newWithId: nextId  
				       module: module 
				       parentAssembly: self
                                       dictObj: dictObj 
				       level: level
                                       totalNumLevels: numLevels.

        subAssemblies at: i put: subAssembly.
        ]

      ifFalse: [
        "The last level has a base assembly"
        nextId := (dictObj BaseAssemblyIdGen) next.
        subAssembly := BaseAssembly newWithId: nextId 
				    module: module
				    parentAssembly: self
                                    dictObj: dictObj.

        subAssemblies at: i put: subAssembly.
        ].
    ].

%
category: 'Traversal'
method: ComplexAssembly
readOnlyMultiUserWork: repeatCount randGen: pathRandGen

| path |

path := (dictObj pathRandGen) next.
^ (subAssemblies at: path) readOnlyMultiUserWork: repeatCount 
                           randGen: pathRandGen.
%
category: 'Traversal'
method: ComplexAssembly
readOnlyMultiUserWorkShared: repeatCount randGen: pathRandGen

| path |

path := pathRandGen next.
^ (subAssemblies at: path) readOnlyMultiUserWorkShared: repeatCount
                           randGen: pathRandGen.
%
category: 'Accessing'
method: ComplexAssembly
subAssemblies

   "Return the value of the instance variable 'subAssemblies'."
   ^subAssemblies
%
category: 'Updating'
method: ComplexAssembly
subAssemblies: newValue

   "Modify the value of the instance variable 'subAssemblies'."
   subAssemblies := newValue
%
category: 'Traversal'
method: ComplexAssembly
traverse: traverseType

| partsVisited |

partsVisited := 0.
subAssemblies do: [
	:anAssembly | partsVisited := partsVisited + 
				      (anAssembly traverse: traverseType)].

^partsVisited.
%
category: 'Performance Testing'
method: ComplexAssembly
updateMultiUserTrivial: repeatCount randGen: pathRandGen

| path |

path := pathRandGen next.
^ (subAssemblies at: path) updateMultiUserTrivial: repeatCount
                           randGen: pathRandGen.
%
category: 'Traversal'
method: ComplexAssembly
updateMultiUserWork: repeatCount randGen: pathRandGen

| path |

path := (dictObj pathRandGen) next.
^ (subAssemblies at: path) updateMultiUserWork: repeatCount
                           randGen: pathRandGen.
%
category: 'Traversal'
method: ComplexAssembly
updateMultiUserWorkShared: repeatCount randGen: pathRandGen

| path |

path := pathRandGen next.
^ (subAssemblies at: path) updateMultiUserWorkShared: repeatCount
                           randGen: pathRandGen.
%
