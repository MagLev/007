! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - Module.gs
! Description:  Defines instance and class methods for class Module
!
! ========================================================================

input util/resultcheck.tpz
omit oops

level 0

! Remove existing behavior from Module
expectvalue %Metaclass
run
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

  aModule id: modId. 
  aModule initialize.

  AllModules add: aModule.

  ^aModule.
%
! ------------------- Instance methods for Module
category: 'Accessing'
method: Module
designRoot

   "Return the value of the instance variable 'designRoot'."
   ^designRoot
%
category: 'Updating'
method: Module
designRoot: newValue

   "Modify the value of the instance variable 'designRoot'."
   designRoot := newValue
%
category: 'Updating'
method: Module

initialize

  "Initialize the internal state of a newly created module."

  | assmId |

  
  type := String withAll: (types at: (TypeRandGen next)).

  "Set the build date by invoking the appropriate random number generator"
  buildDate := ModuleDateRandGen next.

  "Create the manual object"
  man := Manual newWithModuleId: id module: self.

  "now create the assemblies for the module."
  assmId := ComplexAssemblyIdGen next.
  designRoot := ComplexAssembly newWithId: assmId 
			        module: self
			        parentAssembly: nil 
			        level: 1.
%
category: 'Accessing'
method: Module
man

   "Return the value of the instance variable 'man'."
   ^man
%
category: 'Updating'
method: Module
man: newValue

   "Modify the value of the instance variable 'man'."
   man := newValue
%
category: 'Traversal'
method: Module
traverse: op

  "Module Method for Traversal. T8 and T9 operate on 
   Manual object. The rest do traversals on the atomic object
   graph"

  ((op = #T8) | (op = #T9))
    ifTrue: [ ^self perform: (#traverse + op) ].

  ^designRoot traverse: op.
      
%
category: 'Traversal'
method: Module
traverseT8
  "Scans the text of the Manual for a character"

  ^man searchText: $I
%
category: 'Traversal'
method: Module
traverseT9
  "firstLast method"

  ^man firstLast.
%
