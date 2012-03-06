! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - oo7schema.gs
! Description: Defines the schema classes for the oo7 tests
!
! ========================================================================

input util/resultcheck.tpz
omit oops

level 0
expectvalue #DesignObj
run
((Object subclass: #DesignObj
  instVarNames: #(#id #type #buildDate)
  classVars: #(Category)
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[ #[ #id, SmallInteger],
                  #[ #buildDate, SmallInteger] ]
  instancesInvariant: false
  isModifiable: false) category: 'User Classes') name

%


expectvalue #Document
run
(Object subclass: #Document
  instVarNames: #(#title #id #text #part)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[ #[ #title, String],
                  #[ #id, SmallInteger] ]
  instancesInvariant: false
  isModifiable: false) name

%


expectvalue #SetofDocuments
run
(IdentitySet subclass: #SetofDocuments
  instVarNames: #()
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[    "varying part"  Document ]
  instancesInvariant: false
  isModifiable: false) name

%

expectvalue #CompositePart
run
(DesignObj indexableSubclass: #CompositePart
  instVarNames: #(#documentation #usedInPriv #usedInShar #rootPart)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[ #[ #documentation, Document] ]
  instancesInvariant: false
  isModifiable: false) name

%

expectvalue #SetofCompositeParts
run
(IdentitySet subclass: #SetofCompositeParts
  instVarNames: #()
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[    "varying part"  CompositePart ]
  instancesInvariant: false
  isModifiable: false) name

%

expectvalue #Connection
run
(Object subclass: #Connection
  instVarNames: #(#type #length #from #to)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false) name

%

expectvalue #AtomicPart
run
(DesignObj indexableSubclass: #AtomicPart
  instVarNames: #(#x #y #docId #from #partOf)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false) name

%

expectvalue #SetofAtomicParts
run
(IdentitySet subclass: #SetofAtomicParts
  instVarNames: #()
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[    "varying part"  AtomicPart ]
  instancesInvariant: false
  isModifiable: false) name

%


expectvalue #Module
run
(DesignObj subclass: #Module
  instVarNames: #(#man #designRoot)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false) name

%

expectvalue #SetofModules
run
(IdentitySet subclass: #SetofModules
  instVarNames: #()
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[    "varying part"  Module ]
  instancesInvariant: false
  isModifiable: false) name

%

expectvalue #Manual
run
(Object subclass: #Manual
  instVarNames: #(#title #id #text #textLen #mod)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false) name

%

expectvalue #Assembly
run
(DesignObj subclass: #Assembly
  instVarNames: #(#superAssembly #module)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[ ]
  instancesInvariant: false
  isModifiable: false) name

%


expectvalue #ComplexAssembly
run
(Assembly indexableSubclass: #ComplexAssembly
  instVarNames: #()
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false) name

%

expectvalue #BaseAssembly
run
(Assembly subclass: #BaseAssembly
  instVarNames: #(#componentsPriv #componentsShar)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[ #[ #componentsPriv, SetofCompositeParts],
                  #[ #componentsShar, SetofCompositeParts] ]
  instancesInvariant: false
  isModifiable: false) name

%

expectvalue #SetofBaseAssemblies
run
(IdentitySet subclass: #SetofBaseAssemblies
  instVarNames: #()
  classVars: #()
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[    "varying part"  BaseAssembly ]
  instancesInvariant: false
  isModifiable: false) name

%

expectvalue #Query
run
((Object subclass: #Query
  instVarNames: #()
  classVars: #( #Category)
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false) category: 'User Classes') name

%
