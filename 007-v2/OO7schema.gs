! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================
doit
(Array subclass: #DesignObj
  instVarNames: #(#id #type #buildDate #dictObj)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[ #[ #id, SmallInteger],
                  #[ #buildDate, SmallInteger] ]
  instancesInvariant: false
  isModifiable: false)

%


doit
(Object subclass: #Document
  instVarNames: #(#title #id #text #part)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[ #[ #title, String],
                  #[ #id, SmallInteger] ]
  instancesInvariant: false
  isModifiable: false)

%


doit
(IdentitySet subclass: #SetofDocuments
  instVarNames: #()
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[    "varying part"  Document ]
  instancesInvariant: false
  isModifiable: false)

%

doit
(DesignObj subclass: #CompositePart
  instVarNames: #(#documentation #usedInPriv #usedInShar #parts #rootPart)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[ #[ #documentation, Document] ]
  instancesInvariant: false
  isModifiable: false)

%

doit
(IdentitySet subclass: #SetofCompositeParts
  instVarNames: #()
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[    "varying part"  CompositePart ]
  instancesInvariant: false
  isModifiable: false)

%

doit
(DesignObj subclass: #Connection
  instVarNames: #(#length #from #to)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false)

%


doit
(DesignObj subclass: #AtomicPart
  instVarNames: #(#x #y #docId #toIndex #fromIndex #partOf)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[ #[ #toIndex, SmallInteger],
                  #[ #fromIndex, SmallInteger] ]
  instancesInvariant: false
  isModifiable: false)

%


doit
(IdentitySet subclass: #SetofAtomicParts
  instVarNames: #()
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[    "varying part"  AtomicPart ]
  instancesInvariant: false
  isModifiable: false)

%


doit
(DesignObj subclass: #Module
  instVarNames: #(#man #assemblies #designRoot)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false)

%
 
 
doit
(DesignObj subclass: #TrivialModule
  instVarNames: #()
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false)

%
 

doit
(IdentitySet subclass: #SetofModules
  instVarNames: #()
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[    "varying part"  Module ]
  instancesInvariant: false
  isModifiable: false)

%

doit
(Object subclass: #Manual
  instVarNames: #(#title #id #text #textLen #mod)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false)

%

doit
(DesignObj subclass: #Assembly
  instVarNames: #(#superAssembly #module)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[ ]
  instancesInvariant: false
  isModifiable: false)

%


doit
(Assembly subclass: #ComplexAssembly
  instVarNames: #(#subAssemblies)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false)

%


doit
(Assembly subclass: #BaseAssembly
  instVarNames: #(#componentsPriv #componentsShar)
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[ ]
  instancesInvariant: false
  isModifiable: false)

%

doit
(IdentitySet subclass: #SetofBaseAssemblies
  instVarNames: #()
  classVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[    "varying part"  BaseAssembly ]
  instancesInvariant: false
  isModifiable: false)

%
