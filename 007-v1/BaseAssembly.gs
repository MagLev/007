! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - BaseAssembly.gs
! Description: Defines instance and class methods for class BaseAssembly
!
! ========================================================================

input util/resultcheck.tpz
omit oops

level 0

! Remove existing behavior from BaseAssembly
expectvalue %Metaclass
run
BaseAssembly removeAllMethods.
BaseAssembly class removeAllMethods.
%
! ------------------- Class methods for BaseAssembly
category: 'Constructor'
classmethod: BaseAssembly

  newWithId: asId module: mod parentAssembly: parent

  "Create the base assembly object"

  | aBaseAssembly |

  aBaseAssembly := self new.
  aBaseAssembly id: asId.
  aBaseAssembly superAssembly: parent.
  aBaseAssembly module: mod.
  aBaseAssembly initialize.

  "Add to the set of all base assemblies. The collection is used for
   building indexes."
  AllBaseAssemblies add: aBaseAssembly.

  ^aBaseAssembly.
%
! ------------------- Instance methods for BaseAssembly
category: 'Accessing'
method: BaseAssembly
componentsPriv

   "Return the value of the instance variable 'componentsPriv'."
   ^componentsPriv
%
category: 'Updating'
method: BaseAssembly
componentsPriv: newValue

   "Modify the value of the instance variable 'componentsPriv'."
   componentsPriv := newValue
%
category: 'Accessing'
method: BaseAssembly
componentsShar

   "Return the value of the instance variable 'componentsShar'."
   ^componentsShar
%
category: 'Updating'
method: BaseAssembly
componentsShar: newValue

   "Modify the value of the instance variable 'componentsShar'."
   componentsShar := newValue
%
category: 'Misc'
method: BaseAssembly

doNothing

  (id < 0) 
    ifTrue: [MesgLog add: 'doNothing: negative id'].
  
  (debugMode)
    ifTrue: [MesgLog add: 'doNothing: debug']

%
category: 'Initialization'
method: BaseAssembly
initialize

  "Initialize the internals of a new base assembly"

  | compId lowCompId compIdLimit compH |

  "initialize the simple stuff"
  type := String withAll: (types at: (TypeRandGen next)).
  buildDate := AssemblyDateRandGen next.

  "Create the sets to hold the composite parts that are chosen"
  componentsPriv := SetofCompositeParts new.
  componentsShar := SetofCompositeParts new.

  "get access to the design library containing composite parts"
  lowCompId := (module id - 1) * NumCompPerModule + 1.
  compIdLimit := NumCompPerModule.

  "First select the private composite parts for this assembly"
  NumCompPerAssm timesRepeat: [
    "choose the composite parts randomly" 
    compId := lowCompId + 
              ((CompPartRandGen next) \\ compIdLimit).
    (privateCp at: compId) add: self.
    ].

  "Next select the shared composite parts for this assembly."
  NumCompPerAssm timesRepeat: [
    "choose the composite parts randomly" 
    compId := CompPartRandGen next.
    (sharedCp at: compId) add: self.
    ].
   
%
Category: 'Traversal'
method: BaseAssembly
traverse: op
  "BaseAssembly Method for Traversal."

  | count |

  count := 0.
  1 to: componentsPriv size do: [ :i |
    count := count + ((componentsPriv at: i) traverse: op).
    ].

  ^ count.
%
