! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================


! Remove existing behavior from BaseAssembly
doit
BaseAssembly removeAllMethods.
BaseAssembly class removeAllMethods.
%
! ------------------- Class methods for BaseAssembly
category: 'Creation'
classmethod: BaseAssembly

  newWithId: assmId module: mod parentAssembly: parent dictObj: dictionary

  "Create the base assembly object"

  | aBaseAssembly |

  aBaseAssembly := self new.
  aBaseAssembly dictObj: dictionary.
  aBaseAssembly setIdAndType: assmId.
  aBaseAssembly setBuildDate.
  aBaseAssembly superAssembly: parent.
  aBaseAssembly module: mod.
  aBaseAssembly addToModuleList.

  aBaseAssembly createCompositeParts.

  (dictionary AllBaseAssemblies) add: aBaseAssembly.

  ^aBaseAssembly.
%
! ------------------- Instance methods for BaseAssembly
category: 'Misc'
method: BaseAssembly

addToModuleList

  "Add this base assembly to the list of base assemblies for this 
   module." 

  module addToBaseAssemblyList: self.



%
category: 'Accessing'
method: BaseAssembly
componentsPriv

   "Return the value of the instance variable 'componentsPriv'."
   ^componentsPriv
%
category: 'CompositeParts'
method: BaseAssembly

  createCompositeParts 

  "Randomly choose NumCompPerAssm number of composite parts from the set of
   all composite parts and use them as part of this base assembly."

  | compId lowCompId compIdLimit numCompPerModule |

  "Create the bag to hold the composite parts that are chosen"
  componentsPriv := Array new: NumCompPerAssm.

  numCompPerModule := dictObj AllCompositeParts size.

  "First select the private composite parts for this assembly"
  1 to: NumCompPerAssm do: [ :i |
    "choose the composite parts randomly" 
    compId := 1 + ((dictObj CompPartRandGen next) \\ numCompPerModule).
    componentsPriv at: i put: ((dictObj AllCompositeParts) at: compId).
    ].
  

%
category: 'Misc'
method: BaseAssembly

doNothing

  "This method does nothing."

%
category: 'Traversal'
method: BaseAssembly
readOnlyMultiUserWork: repeatCount randGen: pathRandGen

| path |

path := pathRandGen next.
^ (componentsPriv at: path) readOnlyMultiUserWork: repeatCount.
%
category: 'Traversal'
method: BaseAssembly
readOnlyMultiUserWorkShared: repeatCount randGen: pathRandGen

| path |

path := pathRandGen next.
^ (componentsPriv at: path) readOnlyMultiUserWorkShared: repeatCount.
%
category: 'Traversal'
method: BaseAssembly
traverse: traverseType

| partsVisited |

partsVisited := 0.
componentsPriv do: [
	:aCompositePart | partsVisited := partsVisited + 
			      (aCompositePart traverse: traverseType)
	].

^partsVisited.
%
category: 'Performance Testing'
method: BaseAssembly
updateMultiUserTrivial: repeatCount randGen: pathRandGen

| path |

path := pathRandGen next.
^ (componentsPriv at: path) updateMultiUserTrivial: repeatCount.
%
category: 'Traversal'
method: BaseAssembly
updateMultiUserWork: repeatCount randGen: pathRandGen

| path |

path := pathRandGen next.
^ (componentsPriv at: path) updateMultiUserWork: repeatCount.
%
category: 'Traversal'
method: BaseAssembly
updateMultiUserWorkShared: repeatCount randGen: pathRandGen

| path |

path := pathRandGen next.
^ (componentsPriv at: path) updateMultiUserWorkShared: repeatCount.
%
