! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================

doit
(Object subclass: #OO7Benchmark
  instVarNames: #(#id #MyModule #SharedModule #AllDocuments 
                  #AllBaseAssemblies #AllCompositeParts #AllAtomicParts 
                  #elapsedTimeResList #partsVisitedResList #TypeRandGen 
                  #AtomicDateRandGen #XYRandGen #DocIdRandGen 
                  #AssemblyDateRandGen #ModuleDateRandGen 
                  #YoungCompBuildDateRandGen #OldCompBuildDateRandGen 
                  #ConnectionRandGen #AtomicPartRandGen #CompPartRandGen 
                  #BaseAssemblyIdGen #ComplexAssemblyIdGen #AtomicIdGen 
                  #workLoadRandGen #pathRandGen #sharedModRandGen)
  classVars: #( #Category)
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false) category: 'User Classes'

%

! Remove existing behavior from OO7Benchmark
doit
OO7Benchmark removeAllMethods.
OO7Benchmark class removeAllMethods.
%
! ------------------- Class methods for OO7Benchmark
! ------------------- Instance methods for OO7Benchmark
category: 'Accessing'
method: OO7Benchmark
AllAtomicParts

   "Return the value of the instance variable 'AllAtomicParts'."
   ^AllAtomicParts
%
category: 'Updating'
method: OO7Benchmark
AllAtomicParts: newValue

   "Modify the value of the instance variable 'AllAtomicParts'."
   AllAtomicParts := newValue
%
category: 'Accessing'
method: OO7Benchmark
AllBaseAssemblies

   "Return the value of the instance variable 'AllBaseAssemblies'."
   ^AllBaseAssemblies
%
category: 'Updating'
method: OO7Benchmark
AllBaseAssemblies: newValue

   "Modify the value of the instance variable 'AllBaseAssemblies'."
   AllBaseAssemblies := newValue
%
category: 'Accessing'
method: OO7Benchmark
AllCompositeParts

   "Return the value of the instance variable 'AllCompositeParts'."
   ^AllCompositeParts
%
category: 'Updating'
method: OO7Benchmark
AllCompositeParts: newValue

   "Modify the value of the instance variable 'AllCompositeParts'."
   AllCompositeParts := newValue
%
category: 'Accessing'
method: OO7Benchmark
AllDocuments

   "Return the value of the instance variable 'AllDocuments'."
   ^AllDocuments
%
category: 'Updating'
method: OO7Benchmark
AllDocuments: newValue

   "Modify the value of the instance variable 'AllDocuments'."
   AllDocuments := newValue
%
category: 'Accessing'
method: OO7Benchmark
AssemblyDateRandGen

   "Return the value of the instance variable 'AssemblyDateRandGen'."
   ^AssemblyDateRandGen
%
category: 'Updating'
method: OO7Benchmark
AssemblyDateRandGen: newValue

   "Modify the value of the instance variable 'AssemblyDateRandGen'."
   AssemblyDateRandGen := newValue
%
category: 'Accessing'
method: OO7Benchmark
AtomicDateRandGen

   "Return the value of the instance variable 'AtomicDateRandGen'."
   ^AtomicDateRandGen
%
category: 'Updating'
method: OO7Benchmark
AtomicDateRandGen: newValue

   "Modify the value of the instance variable 'AtomicDateRandGen'."
   AtomicDateRandGen := newValue
%
category: 'Accessing'
method: OO7Benchmark
AtomicIdGen

   "Return the value of the instance variable 'AtomicIdGen'."
   ^AtomicIdGen
%
category: 'Updating'
method: OO7Benchmark
AtomicIdGen: newValue

   "Modify the value of the instance variable 'AtomicIdGen'."
   AtomicIdGen := newValue
%
category: 'Accessing'
method: OO7Benchmark
AtomicPartRandGen

   "Return the value of the instance variable 'AtomicPartRandGen'."
   ^AtomicPartRandGen
%
category: 'Updating'
method: OO7Benchmark
AtomicPartRandGen: newValue

   "Modify the value of the instance variable 'AtomicPartRandGen'."
   AtomicPartRandGen := newValue
%
category: 'Accessing'
method: OO7Benchmark
BaseAssemblyIdGen

   "Return the value of the instance variable 'BaseAssemblyIdGen'."
   ^BaseAssemblyIdGen
%
category: 'Updating'
method: OO7Benchmark
BaseAssemblyIdGen: newValue

   "Modify the value of the instance variable 'BaseAssemblyIdGen'."
   BaseAssemblyIdGen := newValue
%
category: 'Accessing'
method: OO7Benchmark
CompPartRandGen

   "Return the value of the instance variable 'CompPartRandGen'."
   ^CompPartRandGen
%
category: 'Updating'
method: OO7Benchmark
CompPartRandGen: newValue

   "Modify the value of the instance variable 'CompPartRandGen'."
   CompPartRandGen := newValue
%
category: 'Accessing'
method: OO7Benchmark
ComplexAssemblyIdGen

   "Return the value of the instance variable 'ComplexAssemblyIdGen'."
   ^ComplexAssemblyIdGen
%
category: 'Updating'
method: OO7Benchmark
ComplexAssemblyIdGen: newValue

   "Modify the value of the instance variable 'ComplexAssemblyIdGen'."
   ComplexAssemblyIdGen := newValue
%
category: 'Accessing'
method: OO7Benchmark
ConnectionRandGen

   "Return the value of the instance variable 'ConnectionRandGen'."
   ^ConnectionRandGen
%
category: 'Updating'
method: OO7Benchmark
ConnectionRandGen: newValue

   "Modify the value of the instance variable 'ConnectionRandGen'."
   ConnectionRandGen := newValue
%
category: 'Accessing'
method: OO7Benchmark
DocIdRandGen

   "Return the value of the instance variable 'DocIdRandGen'."
   ^DocIdRandGen
%
category: 'Updating'
method: OO7Benchmark
DocIdRandGen: newValue

   "Modify the value of the instance variable 'DocIdRandGen'."
   DocIdRandGen := newValue
%
category: 'Accessing'
method: OO7Benchmark
ModuleDateRandGen

   "Return the value of the instance variable 'ModuleDateRandGen'."
   ^ModuleDateRandGen
%
category: 'Updating'
method: OO7Benchmark
ModuleDateRandGen: newValue

   "Modify the value of the instance variable 'ModuleDateRandGen'."
   ModuleDateRandGen := newValue
%
category: 'Accessing'
method: OO7Benchmark
MyModule

   "Return the value of the instance variable 'MyModule'."
   ^MyModule
%
category: 'Updating'
method: OO7Benchmark
MyModule: newValue

   "Modify the value of the instance variable 'MyModule'."
   MyModule := newValue
%
category: 'Accessing'
method: OO7Benchmark
OldCompBuildDateRandGen

   "Return the value of the instance variable 'OldCompBuildDateRandGen'."
   ^OldCompBuildDateRandGen
%
category: 'Updating'
method: OO7Benchmark
OldCompBuildDateRandGen: newValue

   "Modify the value of the instance variable 'OldCompBuildDateRandGen'."
   OldCompBuildDateRandGen := newValue
%
category: 'Queries'
method: OO7Benchmark
Query1

  "Query #1 - randomly choose Query1RepeatCnt atomic parts by
   lookup on their id field.  An index is used for the actual lookup."

   
  | partId selectedParts |

  "set random seed so hot runs are truly hot"
  AtomicPartRandGen seed: 47.
 
  Query1RepeatCnt timesRepeat: [
    partId := AtomicPartRandGen next.
    selectedParts := AllAtomicParts select: 
      {:aPart | aPart.id = partId}.

    selectedParts do: [:anAtomicPart | anAtomicPart doNothing].
    ].

  ^ Query1RepeatCnt.
  
                 

%
category: 'Queries'
method: OO7Benchmark
Query2

  "Query #2 - 1% selection on AtomicParts via build date (the
   most recent 1% of AtomicParts.)"
   
  | queryTime dateRange lowerDate partsSelected |
 
  dateRange := ((MaxAtomicDate - MinAtomicDate) * Query2Percent / 100) asInteger.
  lowerDate := MaxAtomicDate - dateRange.

  partsSelected := IdentityBag new.
  partsSelected addAll: (AllAtomicParts select:
    {:aPart | aPart.buildDate >= lowerDate}).
  partsSelected do: [:anAtomicPart | anAtomicPart doNothing].


  ^ (partsSelected size).
  
                 
%
category: 'Queries'
method: OO7Benchmark
Query3

  "Query #3 - 10% selection on AtomicParts via build date (the
   most recent 10% of AtomicParts.)"
   
  | queryTime dateRange lowerDate partsSelected |
 
  dateRange := ((MaxAtomicDate - MinAtomicDate) * Query3Percent / 100) asInteger.
  lowerDate := MaxAtomicDate - dateRange.

  partsSelected := IdentityBag new.
  partsSelected addAll: (AllAtomicParts select:
    {:aPart | aPart.buildDate >= lowerDate}).
  partsSelected do: [:anAtomicPart | anAtomicPart doNothing].


  ^ (partsSelected size).
  
                 
%
category: 'Queries'
method: OO7Benchmark
Query4

  "Query #4 - Generate Query4RepeatCnt random document titles. For each title
   generated, find all base assemblies that use the composite part corresponding
   to the document. Return the total number of base assemblies that qualify."

   
  | partId title selectedBaseAssemblies |

  "set random seed so hot runs are truly hot"
  CompPartRandGen seed: 59.
  selectedBaseAssemblies := Set new.

  Query4RepeatCnt timesRepeat: [ 
 
    partId := CompPartRandGen next.
    title := String new.
    title add: 'Composite Part ';
          add: (partId asString).

    selectedBaseAssemblies addAll: (AllBaseAssemblies select: 
      {:aBaseAssm | aBaseAssm.componentsPriv.*.documentation.title = title}).

    ].
  selectedBaseAssemblies do: [:aBaseAssembly | aBaseAssembly doNothing].

  ^ (selectedBaseAssemblies size).

   
  
                 

%
category: 'Queries'
method: OO7Benchmark
Query5

  "Query5 - find all base assemblies B that use a composite
   part with a more recent build date than B's build date."
 
  | privateComponents count |
  
  count := 0.

  AllBaseAssemblies do: [ :aBaseAssembly |
    privateComponents := aBaseAssembly componentsPriv.
    privateComponents do: [ :aCompositePart |
      ((aCompositePart buildDate) > (aBaseAssembly buildDate))
        ifTrue: [ aBaseAssembly doNothing.
                  count := count + 1.
                  ].
      ].
    ].

   ^ count.
%
category: 'Queries'
method: OO7Benchmark
Query7

  "Query #7 --- iterate through all atomic parts."

  AllAtomicParts do: [:anAtomicPart | anAtomicPart doNothing].

  ^ AllAtomicParts size.
%
category: 'Queries'
method: OO7Benchmark
Query8

  "Find all pairs of documents and atomic parts where the document id in the
   atomic part matches the id of the document. Also, return a count of the 
   number of such pairs."

  | documentsSelected atomicPartId count |

  count := 0.

  AllAtomicParts do: [ :anAtomicPart |
    atomicPartId := anAtomicPart id.
    documentsSelected := AllDocuments detect: 
      { :aDocument | aDocument.id = atomicPartId }.
    ( documentsSelected size > 0 )
      ifTrue: [ count := count + 1 ].
    ].

  ^ count.
%
category: 'Queries'
method: OO7Benchmark
RunQueryWithRepeatCnt: repCnt op: operation numXacts: numberOfXacts

  | elapsedTime count elapsedTimeResults partsVisitedResults averageTime
    temp |

  elapsedTimeResults := Array new: (repCnt + 1).
  partsVisitedResults := Array new: (repCnt + 1).

  temp := 0.

  1 to: repCnt do: [:i |

    elapsedTime := System secondsElapsedTime: [
      (operation = #Q1)
         ifTrue: [ count := self Query1 ].
      (operation = #Q2)
         ifTrue: [ count := self Query2 ].
      (operation = #Q3)
         ifTrue: [ count := self Query3 ].
      (operation = #Q4)
         ifTrue: [ count := self Query4 ].

      ((i = repCnt) | (numberOfXacts = #many))
        ifTrue: [ System commitTransaction ]. 
      ].
    elapsedTimeResults at: i put: elapsedTime.
    partsVisitedResults at: i put: count.

    ].

  "Compute the average hot time for 2nd to repCnt - 1 runs"
  (repCnt > 2) 
    ifTrue: [ temp := 0. 
              2 to: (repCnt - 1) do: [
                :i | temp := elapsedTimeResults at: i ].
              averageTime := temp / (repCnt - 2).
              elapsedTimeResults at: (repCnt + 1) put: averageTime
              partsVistedResults at: (repCnt + 1) put: (partsVisitedResults at: 2) 
              expected a right parenthesis].

  elapsedTimeResList at: operation put: elapsedTimeResults.
  partsVisitedResList at: operation put: partsVisitedResults.
                 
                 
%
category: 'Queries'
method: OO7Benchmark
RunTraverseWithRepeatCnt: repCnt op: operation numXacts: numberOfXacts

  | elapsedTime partsVisited elapsedTimeResults partsVisitedResults averageTime
     temp |

  elapsedTimeResults := Array new: (repCnt + 1).
  partsVisitedResults := Array new: (repCnt + 1).

  temp := 0.

  1 to: repCnt do: [:i |

    elapsedTime := System secondsElapsedTime: [ 
        partsVisited := MyModule traverse: operation.
  
      ((i = repCnt) | (numberOfXacts = #many))
        ifTrue: [ System commitTransaction ]. 
      ].
    elapsedTimeResults at: i put: elapsedTime.
    partsVisitedResults at: i put: partsVisited.

    ].

  "Compute the average hot time for 2nd to repCnt - 1 runs"
  (repCnt > 2) 
    ifTrue: [ temp := 0. 
              2 to: (repCnt - 1) do: [
                :i | temp := elapsedTimeResults at: i ].
              averageTime := temp / (repCnt - 2).
              elapsedTimeResults at: (repCnt + 1) put: averageTime ].

  elapsedTimeResList at: operation put: elapsedTimeResults.
  partsVisitedResList at: operation put: partsVisitedResults.
                 
                 
%
category: 'Queries'
method: OO7Benchmark
RunWarmUpdateWithRepeatCnt: repCnt op: operation numXacts: numberOfXacts

  | elapsedTime partsVisited elapsedTimeResults partsVisitedResults averageTime
    temp |

  elapsedTimeResults := Array new: (repCnt + 1).
  partsVisitedResults := Array new: (repCnt + 1).

  temp := 0.

  1 to: repCnt do: [:i |

    elapsedTime := System secondsElapsedTime: [ 
        partsVisited := MyModule traverse: #T1.
        partsVisited := MyModule traverse: #T2A.
  
      ((i = repCnt) | (numberOfXacts = #many))
        ifTrue: [ System commitTransaction ]. 
      ].
    elapsedTimeResults at: i put: elapsedTime.
    partsVisitedResults at: i put: partsVisited.

    ].

  "Compute the average hot time for 2nd to repCnt - 1 runs"
  (repCnt > 2) 
    ifTrue: [ temp := 0. 
              2 to: (repCnt - 1) do: [
                :i | temp := elapsedTimeResults at: i ].
              averageTime := temp / (repCnt - 2).
              elapsedTimeResults at: (repCnt + 1) put: averageTime ].

  elapsedTimeResList at: operation put: elapsedTimeResults.
  partsVisitedResList at: operation put: partsVisitedResults.
                 
                 
%
category: 'Accessing'
method: OO7Benchmark
SharedModule

   "Return the value of the instance variable 'MyModule'."
   ^SharedModule
%
category: 'Updating'
method: OO7Benchmark
SharedModule: newValue

   "Modify the value of the instance variable 'MyModule'."
   SharedModule := newValue
%
category: 'Accessing'
method: OO7Benchmark
TypeRandGen

   "Return the value of the instance variable 'TypeRandGen'."
   ^TypeRandGen
%
category: 'Updating'
method: OO7Benchmark
TypeRandGen: newValue

   "Modify the value of the instance variable 'TypeRandGen'."
   TypeRandGen := newValue
%
category: 'Accessing'
method: OO7Benchmark
XYRandGen

   "Return the value of the instance variable 'XYRandGen'."
   ^XYRandGen
%
category: 'Updating'
method: OO7Benchmark
XYRandGen: newValue

   "Modify the value of the instance variable 'XYRandGen'."
   XYRandGen := newValue
%
category: 'Accessing'
method: OO7Benchmark
YoungCompBuildDateRandGen

   "Return the value of the instance variable 'YoungCompBuildDateRandGen'."
   ^YoungCompBuildDateRandGen
%
category: 'Updating'
method: OO7Benchmark
YoungCompBuildDateRandGen: newValue

   "Modify the value of the instance variable 'YoungCompBuildDateRandGen'."
   YoungCompBuildDateRandGen := newValue
%
category: 'MultiUserWorkLoad'
method: OO7Benchmark
doNextMultiUserTask: repeatCount
  "comment - what does this method do?"

  | workType aModule|

  workType := self getNextWorkType.

  (workType = #PrivateReadOnly)
    ifTrue: [^ MyModule readOnlyMultiUserWork: repeatCount 
                        randGen: pathRandGen].

  (workType = #PrivateUpdate)
    ifTrue: [^ MyModule updateMultiUserWork: repeatCount
                        randGen: pathRandGen].

  aModule := SharedDesignRoot at: (sharedModRandGen next).

  (workType = #SharedReadOnly)
    ifTrue: [^ aModule readOnlyMultiUserWork: repeatCount 
                       randGen: pathRandGen].

  (workType = #SharedUpdate)
    ifTrue: [^ aModule updateMultiUserWork: repeatCount
                       randGen: pathRandGen].
%
category: 'Performance Testing'
method: OO7Benchmark
doNextReallyTrivialTask: repeatCount
  "do some really small task"

  | workType aModule |

  workType := self getNextWorkType.

  (workType = #PrivateReadOnly)
    ifTrue: [ aModule := self MyModule.
              ^0].

  (workType = #PrivateUpdate)
    ifTrue: [ MyModule toggleDate.
              ^1].

  aModule := SharedDesignRoot at: (sharedModRandGen next).

  (workType = #SharedReadOnly)
    ifTrue: [ ^0 ].

  (workType = #SharedUpdate)
    ifTrue: [aModule toggleDate.
             ^1 ].
%
category: 'Performance Testing'
method: OO7Benchmark
doNextTrivialTask: repeatCount
  "do some really small task"

  | workType aSharedModule|

  workType := self getNextWorkType.

  (workType = #PrivateReadOnly)
    ifTrue: [^ MyModule readOnlyMultiUserWork: repeatCount 
                        randGen: pathRandGen
            ].

  (workType = #PrivateUpdate)
    ifTrue: [^ MyModule updateMultiUserWork: repeatCount 
                        randGen: pathRandGen
            ].

  aSharedModule := SharedDesignRoot at: (sharedModRandGen next).

  (workType = #SharedReadOnly)
    ifTrue: ["^1"
             ^ aSharedModule readOnlyMultiUserTrivial: repeatCount 
                             randGen: pathRandGen
            ].

  (workType = #SharedUpdate)
    ifTrue: ["aSharedModule toggleDate.  ^1"
             ^ aSharedModule updateMultiUserTrivial: repeatCount 
                             randGen: pathRandGen
            ].
%
category: 'Accessing'
method: OO7Benchmark
elapsedTimeResList

   "Return the value of the instance variable 'elapsedTimeResList'."
   ^elapsedTimeResList
%
category: 'Updating'
method: OO7Benchmark
elapsedTimeResList: newValue

   "Modify the value of the instance variable 'elapsedTimeResList'."
   elapsedTimeResList := newValue
%
category: 'Generation'
method: OO7Benchmark
genPrivateDB

  "Generate the shared database"

  | aCompositePart lowCompId compId aModule |

  "create all the composite parts"
  lowCompId   := (id - 1) * 
		 (TotalCompPartsPerPrivMod + TotalCompPartsPerSharedMod).

  1 to: TotalCompPartsPerPrivMod do:
    [ :index |
      compId := lowCompId + index.
      aCompositePart := CompositePart newWithId: compId dictObj: self.
      AllCompositeParts at: index put: aCompositePart ].

  ^ Module newWithId: (id * 2 - 1) 
		    totalNumLevels: NumAssmLevelsPrivate dictObj: self.
%
category: 'Generation'
method: OO7Benchmark
genTrivialPrivateDB

  "Generate a trivial version of the private database for
   performance stress testing"

  ^ TrivialModule newWithId: (id * 2 - 1) 
		 totalNumLevels: NumAssmLevelsPrivate dictObj: self.

%
category: 'Generation'
method: OO7Benchmark
genSharedDB

  "Generate the shared database"

  | aCompositePart lowCompId compId aModule |

  "create all the composite parts"
  lowCompId   := id * 
		 (TotalCompPartsPerPrivMod + TotalCompPartsPerSharedMod).

  1 to: TotalCompPartsPerSharedMod do:
    [ :index |
      compId := lowCompId + index. 
      aCompositePart := CompositePart newWithId: compId dictObj: self.
      AllCompositeParts at: index put: aCompositePart ].

  ^ Module newWithId: (id * 2) 
                    totalNumLevels: NumAssmLevelsShared
                    dictObj: self.
%
category: 'Generation'
method: OO7Benchmark
genTrivialSharedDB

  "Generate a trivial version of the shared database for
   performance stress testing"

  ^ Module newWithId: (id * 2)
	    totalNumLevels: NumAssmLevelsShared
	    dictObj: self.

%
category: 'MultiUserWorkLoad'
method: OO7Benchmark
getNextWorkType
  "comment - what does this method do?"

  | workType |

  workType := workLoadRandGen next.
  (workType between: 0 and: PrivateReadOnlyRange)
    ifTrue: [ ^ #PrivateReadOnly ].
  (workType between: PrivateReadOnlyRange and: SharedReadOnlyRange)
    ifTrue: [ ^ #SharedReadOnly ].
  (workType between: SharedReadOnlyRange and: PrivateUpdateRange)
    ifTrue: [ ^ #PrivateUpdate ].
  (workType between: PrivateUpdateRange and: SharedUpdateRange)
    ifTrue: [ ^ #SharedUpdate ].
%
category: 'Accessing'
method: OO7Benchmark
id

   "Return the value of the instance variable 'id'."
   ^id
%
category: 'Updating'
method: OO7Benchmark
id: newValue

   "Modify the value of the instance variable 'id'."
   id := newValue
%
category: 'Generation'
method: OO7Benchmark
initialize: sharedOrPrivate
  "initialize the benchmark object"

  | temps |

  AllDocuments      := SetofDocuments new.
  AllBaseAssemblies := SetofBaseAssemblies new.
  AllAtomicParts    := SetofAtomicParts new.

  elapsedTimeResList := Dictionary new.
  partsVisitedResList := Dictionary new.

  TypeRandGen := Random newGeneratorWithLowerBound: 1 
                                        upperBound: NumTypes.
  AtomicDateRandGen := Random newGeneratorWithLowerBound: MinAtomicDate 
                                              upperBound: MaxAtomicDate.
  XYRandGen := Random newGeneratorWithLowerBound:1 
                                      upperBound: XYRange.
  AssemblyDateRandGen := Random newGeneratorWithLowerBound: MinAssmDate 
                                                upperBound: MaxAssmDate.
  ModuleDateRandGen := Random newGeneratorWithLowerBound: MinModuleDate 
                                              upperBound: MaxModuleDate.
  YoungCompBuildDateRandGen := Random newGeneratorWithLowerBound: MinYoungCompDate 
                                                      upperBound: MaxYoungCompDate.
  OldCompBuildDateRandGen := Random newGeneratorWithLowerBound: MinOldCompDate
                                                    upperBound: MaxOldCompDate.
  ConnectionRandGen := Random newGeneratorWithLowerBound: 1
                                              upperBound: NumAtomicPerComp.

  BaseAssemblyIdGen := idGenerator new.
  ComplexAssemblyIdGen := idGenerator new.
  AtomicIdGen := idGenerator new.

  (sharedOrPrivate = #private)
    ifTrue: [
      AtomicPartRandGen := Random newGeneratorWithLowerBound: 1
                                  upperBound: TotalAtomicPartsPerPrivMod.
      CompPartRandGen :=  Random newGeneratorWithLowerBound: 1
                                 upperBound: TotalCompPartsPerPrivMod.
      DocIdRandGen := Random newGeneratorWithLowerBound: 1 
                             upperBound: TotalCompPartsPerPrivMod.
      BaseAssemblyIdGen currId: ((id - 1) * TotalBaseAssmPerPrivMod).
      ComplexAssemblyIdGen currId: ((id - 1) * TotalComplexAssmPerPrivMod).
      AtomicIdGen currId: ((id - 1) * TotalAtomicPartsPerPrivMod).
      AllCompositeParts := Array new: TotalCompPartsPerPrivMod.
      ]
    ifFalse: [
      AtomicPartRandGen := Random newGeneratorWithLowerBound: 1
                                  upperBound: TotalAtomicPartsPerSharedMod.
      CompPartRandGen :=  Random newGeneratorWithLowerBound: 1
                                 upperBound: TotalCompPartsPerSharedMod.
      DocIdRandGen := Random newGeneratorWithLowerBound: 1 
                             upperBound: TotalCompPartsPerSharedMod.
 
      BaseAssemblyIdGen currId: ((TotalNumUsers * TotalBaseAssmPerPrivMod) + 
                                ((id - 1) * TotalBaseAssmPerSharedMod)).
      ComplexAssemblyIdGen currId: ((TotalNumUsers * TotalComplexAssmPerPrivMod) + 
                                   ((id - 1) * TotalComplexAssmPerSharedMod)).
      AtomicIdGen currId: ((TotalNumUsers * TotalComplexAssmPerPrivMod) + 
                          ((id - 1) * TotalAtomicPartsPerSharedMod)).
      AllCompositeParts := Array new: TotalCompPartsPerSharedMod.
      ].
 
  workLoadRandGen := Random newGeneratorWithLowerBound: 1
                            upperBound: 100.
  pathRandGen := Random newGeneratorWithLowerBound: 1
                        upperBound: 3.
  sharedModRandGen := Random newGeneratorWithLowerBound: 1
                             upperBound: TotalNumUsers.
  
%
category: 'MultiUserWorkLoad'
method: OO7Benchmark
oldDoNextMultiUserTask: repeatCount
  "comment - what does this method do?"

  | workType aModule|

  workType := self getNextWorkType.

  (workType = #PrivateReadOnly)
    ifTrue: [^ MyModule readOnlyMultiUserWork: repeatCount 
                        randGen: pathRandGen].

  (workType = #PrivateUpdate)
    ifTrue: [^ MyModule updateMultiUserWork: repeatCount
                        randGen: pathRandGen].

  aModule := SharedDesignRoot at: (sharedModRandGen next).

  (workType = #SharedReadOnly)
    ifTrue: [^ aModule readOnlyMultiUserWorkShared: repeatCount 
                       randGen: pathRandGen].

  (workType = #SharedUpdate)
    ifTrue: [^ aModule updateMultiUserWorkShared: repeatCount
                       randGen: pathRandGen].
%
category: 'Accessing'
method: OO7Benchmark
partsVisitedResList

   "Return the value of the instance variable 'partsVisitedResList'."
   ^partsVisitedResList
%
category: 'Updating'
method: OO7Benchmark
partsVisitedResList: newValue

   "Modify the value of the instance variable 'partsVisitedResList'."
   partsVisitedResList := newValue
%
category: 'Accessing'
method: OO7Benchmark
pathRandGen

   "Return the value of the instance variable 'pathRandGen'."
   ^pathRandGen
%
category: 'Updating'
method: OO7Benchmark
pathRandGen: newValue

   "Modify the value of the instance variable 'pathRandGen'."
   pathRandGen := newValue
%
category: 'Accessing'
method: OO7Benchmark
sharedModRandGen

   "Return the value of the instance variable 'sharedModRandGen'."
   ^sharedModRandGen
%
category: 'Updating'
method: OO7Benchmark
sharedModRandGen: newValue

   "Modify the value of the instance variable 'sharedModRandGen'."
   sharedModRandGen := newValue
%
category: 'Accessing'
method: OO7Benchmark
workLoadRandGen

   "Return the value of the instance variable 'workLoadRandGen'."
   ^workLoadRandGen
%
category: 'Updating'
method: OO7Benchmark
workLoadRandGen: newValue

   "Modify the value of the instance variable 'workLoadRandGen'."
   workLoadRandGen := newValue
%
doit
OO7Benchmark category: 'User Classes'
%
