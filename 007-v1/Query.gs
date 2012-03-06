! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - Query.gs
! Description: Defines instance and class methods for class Query
!
! ========================================================================
input util/resultcheck.tpz
omit oops

level 0

expectvalue #Query
run
((Object subclass: #Query
  instVarNames: #()
  classVars: #( #Category)
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false) category: 'User Classes' ) name

%

! Remove existing behavior from Query
expectvalue %Metaclass
run
Query removeAllMethods.
Query class removeAllMethods.
%
! ------------------- Class methods for Query
category: 'Queries'
classmethod: Query
queryQ1

  "Query #1 - randomly choose Query1RepeatCnt atomic parts by
   lookup on their id field.  An index is used for the actual lookup."

  | selectedParts |

  "set random seed so hot runs are truly hot"
  AtomicPartRandGen seed: 47.
  selectedParts := IdentityBag new.

  "now randomly select parts via partId index and process them"
  Query1RepeatCnt timesRepeat: [ | partId |

    "generate part id and lookup part"
    partId := AtomicPartRandGen next.
    selectedParts add: (AllAtomicParts detect: {:aPart | aPart.id = partId}).
    ].

  "process qualifying parts by calling null procedure."
  1 to: selectedParts size do: [:i |
    (selectedParts at: i) doNothing
    ].
  
  ^selectedParts size.
%
category: 'Queries'
classmethod: Query
queryQ2
  "Method to do Query #2"

  | partsSelected lowerDate |

  "choose a range of dates with the appropriate selectivity"
  lowerDate := MaxAtomicDate - 
               ((MaxAtomicDate - MinAtomicDate) * Query2Percent / 100) asInteger.
 
  partsSelected := AllAtomicParts select:
                     {:aPart | aPart.buildDate >= lowerDate}.

  "process qualifying parts by calling the null procedure." 
  1 to: partsSelected size do: [ :i |
    (partsSelected at: i) doNothing
    ].

  ^ partsSelected size.
%
category: 'Queries'
classmethod: Query
queryQ3
  "Method to do Query #3"

  | partsSelected lowerDate |

  "choose a range of dates with the appropriate selectivity"
  lowerDate := MaxAtomicDate - 
               ((MaxAtomicDate - MinAtomicDate) * Query3Percent / 100) asInteger.
 
  partsSelected := AllAtomicParts select:
                     {:aPart | aPart.buildDate >= lowerDate}.

  "process qualifying parts by calling the null procedure." 
  1 to: partsSelected size do: [ :i |
    (partsSelected at: i) doNothing
    ].

  ^ partsSelected size.
%
category: 'Queries'
classmethod: Query
queryQ4

  "Query #4 - Generate Query4RepeatCnt random document titles. For each title
   generated, find all base assemblies that use the composite part corresponding
   to the document. Return the total number of base assemblies that qualify."

   
  | selectedBaseAssemblies |

  "set random seed so hot runs are truly hot"
  CompPartRandGen seed: 59.
  selectedBaseAssemblies := Set new.

  Query4RepeatCnt timesRepeat: [ | title |
 
    title := String withAll: ('Composite Part ' + 
                              (CompPartRandGen next asString)).

    selectedBaseAssemblies addAll: (AllBaseAssemblies select: 
      {:aBaseAssm | aBaseAssm.componentsPriv.*.documentation.title = title}).
    ].

  1 to: selectedBaseAssemblies size do: [ :i |
     (selectedBaseAssemblies at: i) doNothing
     ].

  ^ (selectedBaseAssemblies size).

   
%
category: 'Queries'
classmethod: Query
queryQ5

  "Query5 - find all base assemblies B that use a composite
   part with a more recent build date than B's build date."
 
  | count |
  
  count := 0.

  "Scan all the base assemblies looking for base assemblies that use
   more recently dated composite parts."

  AllBaseAssemblies do: [ :aBaseAssembly |
    (aBaseAssembly componentsPriv) do: [ :aCompositePart |
       ((aCompositePart buildDate) > (aBaseAssembly buildDate))
         ifTrue: [ aBaseAssembly doNothing.
                   count := count + 1.
                   ].
       ].
     ].

   ^ count.
%
category: 'Queries'
classmethod: Query
queryQ6

  "Query6 - find all base assemblies B that use a composite
   part with a more recent build date than B's build date."

  | selectedAssemblies |

  "Scan all the base assemblies looking for base assemblies that use
   more recently dated composite parts."

  selectedAssemblies := AllBaseAssemblies select: {:aBaseAssembly |
    aBaseAssembly.componentsPriv.*.buildDate > aBaseAssembly.buildDate }.

  1 to: selectedAssemblies size do: [ :i |
     (selectedAssemblies at: i) doNothing
     ].

   ^ selectedAssemblies size.
%

category: 'Queries'
classmethod: Query
queryQ7

  "Query #7 --- iterate through all atomic parts."

  1 to: AllAtomicParts size do: [ :i |
    (AllAtomicParts at: i) doNothing
    ].

  ^ AllAtomicParts size.
%
category: 'Queries'
classmethod: Query
queryQ8

  "Find all pairs of documents and atomic parts where the document id in the
   atomic part matches the id of the document. Also, return a count of the
   number of such pairs."

  | count anId|

  count := 0.

  AllAtomicParts do: [ :anAtomicPart |
    anId := anAtomicPart docId.

    (AllDocuments detect: {:aDocument | aDocument.id = anId }
                  ifNone: [nil]) notNil
      ifTrue: [ count := count + 1 ].
    ].

  ^ count.
%

category: 'Queries'
classmethod: Query
runQuery: queryType

  ^self perform: (#query + queryType).

  
%
! ------------------- Instance methods for Query
expectvalue Query
run
Query category: 'User Classes'
%
