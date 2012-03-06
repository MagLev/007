! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================


! Remove existing behavior from Module
doit
Module removeAllMethods.
Module class removeAllMethods.
%
! ------------------- Class methods for Module
category: 'Creation'
classmethod: Module

newWithId: modId

  "Create a new module with the given module id."

  | aModule |

  aModule := self new.

  "Set its id and type"
  aModule setIdAndType: modId.

  "Initialize and populate it with the objects necessary for a module"
  aModule initialize.

  ^aModule.
%
category: 'Creation'
classmethod: Module

newWithId: modId dictObj: dictionary

  "Create a new module with the given module id."

  | aModule |

  aModule := self new.
  aModule dictObj: dictionary.

  "Set its id and type"
  aModule setIdAndType: modId.

  "Initialize and populate it with the objects necessary for a module"
  aModule initialize.

  ^aModule.
%
category: 'Creation'
classmethod: Module

newWithId: modId numLevels: totalNumLevels dictObj: dictionary

  "Create a new module with the given module id."

  | aModule |

  aModule := self new.
  aModule dictObj: dictionary.

  "Set its id and type"
  aModule setIdAndType: modId.

  "Initialize and populate it with the objects necessary for a module"
  aModule initialize: totalNumLevels.

  ^aModule.
%
category: 'Creation'
classmethod: Module

newWithId: modId totalNumLevels: numLevels dictObj: dictionary

  "Create a new module with the given module id."

  | aModule |

  aModule := self new.
  aModule dictObj: dictionary.

  "Set its id and type"
  aModule setIdAndType: modId.

  "Initialize and populate it with the objects necessary for a module"
  aModule initialize: numLevels.

  ^aModule.
%
! ------------------- Instance methods for Module
category: 'Updating'
method: Module

addToBaseAssemblyList: baseAssm

  "Add the given base assembly to the list of base assemblies belonging to
   this Module"

  assemblies add: baseAssm.
%
category: 'Accessing'
method: Module

baseAssemblyList
  
  "Return the list of base assemblies."

  ^assemblies
%
category: 'Accessing'
method: Module
designRoot

  ^designRoot
%
category: 'Searching'
method: Module
firstLast
  "firstLast method"


  ^man firstLast.
%
category: 'Initialization'
method: Module

initialize

  "Initialize the internal state of a newly created module."

  | assmId |

  "Set the build date by invoking the appropriate random number generator"
  buildDate := (dictObj ModuleDateRandGen) next.

  assemblies := Set new.

  "Create the manual object"
  man := Manual newWithModuleId: id module: self.

  "Get the starting id for the assemblies"
  assmId := (dictObj ComplexAssemblyIdGen) next.

  "Create the root level assembly. The root level assembly recursively
   invokes the same methods to create the whole tree of assemblies."

  designRoot := ComplexAssembly newWithId: assmId 
			        module: self
			        parentAssembly: nil
                                dictObj: dictObj 
			        level: 1.
%
category: 'Initialization'
method: Module

initialize: numLevels

  "Initialize the internal state of a newly created module."

  | assmId |

  "Set the build date by invoking the appropriate random number generator"
  buildDate := (dictObj ModuleDateRandGen) next.

  assemblies := Set new.

  "Create the manual object"
  man := Manual newWithModuleId: id module: self.

  "Get the starting id for the assemblies"
  assmId := (dictObj ComplexAssemblyIdGen) next.

  "Create the root level assembly. The root level assembly recursively
   invokes the same methods to create the whole tree of assemblies."

  designRoot := ComplexAssembly newWithId: assmId 
			        module: self
			        parentAssembly: nil
                                dictObj: dictObj 
			        level: 1
                                totalNumLevels: numLevels.
%
category: 'Accessing'
method: Module
man
  "Return the value of instance variable man"

  ^man
%
category: 'Traversal'
method: Module
readOnlyMultiUserWork: repeatCount randGen: pathRandGen

  ^ designRoot readOnlyMultiUserWork: repeatCount
               randGen: pathRandGen. 

%
category: 'Traversal'
method: Module
readOnlyMultiUserWorkShared: repeatCount randGen: pathRandGen

  ^ designRoot readOnlyMultiUserWorkShared: repeatCount
               randGen: pathRandGen. 

%
category: 'Searching'
method: Module
scanManual
  "Scans the text of the Manual for a character"

  ^man searchText: $I
%
category: 'Traversal'
method: Module
traverse: traverseType

(traverseType = #T8)
  ifTrue: [^ self scanManual]
  ifFalse: [
    (traverseType = #T9)
      ifTrue: [^ self firstLast]
      ifFalse: [^ (designRoot traverse: traverseType)]].

%
category: 'Performance Testing'
method: Module
updateMultiUserTrivial: repeatCount randGen: pathRandGen

  ^ designRoot updateMultiUserTrivial: repeatCount
               randGen: pathRandGen.

%
category: 'Traversal'
method: Module
updateMultiUserWork: repeatCount randGen: pathRandGen

  ^ designRoot updateMultiUserWork: repeatCount
               randGen: pathRandGen.

%
category: 'Traversal'
method: Module
updateMultiUserWorkShared: repeatCount randGen: pathRandGen

  ^ designRoot updateMultiUserWorkShared: repeatCount 
               randGen: pathRandGen. 

%
