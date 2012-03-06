! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - Bench.gs
! Description: Defines instance and class methods for class Bench
!
! ========================================================================
input util/resultcheck.tpz
omit oops

level 0

expectvalue #Bench
run
((Object subclass: #Bench
  instVarNames: #()
  classVars: #( #Category)
  poolDictionaries: #[]
  inDictionary: UserGlobals
  constraints: #[  ]
  instancesInvariant: false
  isModifiable: false) category: 'User Classes' ) name

%

! Remove existing behavior from Bench
expectvalue %Metaclass
run
Bench removeAllMethods.
Bench class removeAllMethods.
%
! ------------------- Class methods for Bench
category: 'Purging'
classmethod: Bench
CreateDummy: count

  "Create count number of dummy objects. The dummy objects
   created are arrays."

  UserGlobals at: #DummyArray put: (Array new: count).
  System commitTransaction.

  1 to: count do: [ :i |
    
     DummyArray at: i put: (Array new: DummySize).
     
     "Every 1000 objects, commit the transaction."
     ( i \\ 1000 = 0 )
         ifTrue: [ System commitTransaction ].

     ].
%
category: 'Generation'
classmethod: Bench
GenDB

 ^ System secondsElapsedTime: [

  | pcp scp size |

  "Create two arrays of bags for holding the 
   composite part - base assembly association"

  size := TotalCompParts + NumNewCompParts.
  pcp := Array new: size.
  scp := Array new: size.
  1 to: size do: [ :i |
    pcp at: i put: (IdentityBag new).
    scp at: i put: (IdentityBag new).
    ].

  UserGlobals at: #privateCp put: pcp;
   at: #sharedCp  put: scp.


 "First generate the desired number of modules"
  1 to: TotalModules do:
    [:index | Module newWithId: index].


  "Now generate the composite parts"
  1 to: TotalCompParts do: [:index | 
    CompositePart newWithId: index.
    (index \\ 100) = 0
      ifTrue: [ System commitTransaction ].
    ].

  System commitTransaction.

  "create all the indexes"

  AllBaseAssemblies createEqualityIndexOn: 'id'. 
  AllBaseAssemblies createEqualityIndexOn: 'componentsPriv.*.documentation.title'.
  AllBaseAssemblies createEqualityIndexOn: 'componentsPriv.*.buildDate'.
  AllBaseAssemblies createEqualityIndexOn: 'buildDate'.
  AllAtomicParts    createEqualityIndexOn: 'id'.
  AllAtomicParts    createEqualityIndexOn: 'buildDate'.
  AllDocuments      createEqualityIndexOn: 'id'.
  AllCompositeParts createEqualityIndexOn: 'id'.
  AllModules        createEqualityIndexOn: 'id'.

  "set the next id for structural modifications part of the benchmark."
  CompPartIdGen currId: TotalCompParts.
  System commitTransaction.

  ].

%

category: 'Purging'
classmethod: Bench
Purge
  
  | temp |

  PurgeVar ifFalse: [ ^ Bench ].

  DummyArray do: [ :dummy |
    temp := dummy first.
    ]
 
%
category: 'StructuralModification'
classmethod: Bench
delete
  "Remove references to NumNewCompParts composite parts from the
   design assembly."
| oldSize |

oldSize := AllCompositeParts size.

  CompPartIdGen currId: TotalCompParts.

  NumNewCompParts timesRepeat: [ | compId compH docH removedParts |
 
    compId  := CompPartIdGen next.
    compH   := AllCompositeParts detect: [:cp | cp id = compId].

    "Remove all atomic parts first."
    removedParts := Set new.
    (compH rootPart) removeIdentical: removedParts.

    "Remove the document."
    docH := AllDocuments detect: [:doc | doc id = compId].
    AllDocuments removeIdentical: docH.
    
    "Now remove the composite part."
    AllCompositeParts removeIdentical: compH.
    ].

  ^ oldSize - AllCompositeParts size.
%
category: 'StructuralModification'
classmethod: Bench
insert

  "create the desired number of new composite parts, adding each
   one as a (private) composite part that a randomly selected base
   assembly now wishes to use."

  | oldSize baseAssembliesPerModule |

  oldSize := AllCompositeParts size.

  CompPartIdGen currId: TotalCompParts.
  baseAssembliesPerModule := (BaseAssemblyIdGen currId) / TotalModules.

  NumNewCompParts timesRepeat: [ | compH assmId assmH |

    "add a new composite part to the design library"
    compH  := CompositePart newWithId: (CompPartIdGen next).

    "randomly select a base assembly that should use it"
    assmId := (GeneralRandGen next) \\ baseAssembliesPerModule + 1.
    assmH  := AllBaseAssemblies detect: [ :aBA | aBA id = assmId ].

    "finally, add the newly created composite part as a privately used
     member of the randomly selected base assembly."
     
    "first add this assembly to the list of assemblies in which
     this composite part is used as a private member."

    compH usedInPriv add: assmH.

    "then add the composite part compH to the list of private parts used
     in this assembly."

    assmH componentsPriv add: compH.
    ].

  ^ AllCompositeParts size - oldSize.
%
category: 'Results'
classmethod: Bench
printResult: resultArray resultType: resType message: mesg
 
  | resultText |

  resultText := String new.
  (resultArray notNil)
    ifTrue: [
      resultText add: resType; add: ' cold time (seconds): ';
             add: (((resultArray at: 1) at: 1) asStringUsingFormat: #(8 2 false));
             add: mesg;
             add: ': ';
             add: (((resultArray at: 1) at: 2) asString);
             add: Character lf.

      ((resultArray at: 2) notNil)
        ifTrue: [
          resultText add: resType;
             add: ' hot  time (seconds): ';
             add: (((resultArray at: 2) at: 1) asStringUsingFormat: #(8 2 false));
             add: mesg;
             add: ': ';
             add: (((resultArray at: 2) at: 2) asString);
             add: Character lf.
          ].
       ].
  ^ resultText.
%
category: 'Results'
classmethod: Bench
printResults: resultFile header: fileHeader

  | resultText |

  resultText := String new.
  resultText lf; add: 'Results For '; add: fileHeader; lf;
	     add: DateTime now US24HrFormat;
	     lf; lf.

  resultText 
   add: (self printResult: T1 
              resultType: 'T1' message: 'parts visited');
   add: (self printResult: T1Many
              resultType: 'T1Many' message: 'parts visited');
   add: (self printResult: T2A 
	      resultType: 'T2A' message: 'swapped pairs');
   add: (self printResult: T2B 
	      resultType: 'T2B' message: 'swapped pairs');
   add: (self printResult: T2C 
	      resultType: 'T2C' message: 'swapped pairs');
   add: (self printResult: T3A 
	      resultType: 'T3A' message: 'toggled dates');
   add: (self printResult: T3B 
	      resultType: 'T3B' message: 'toggled dates');
   add: (self printResult: T3C 
	      resultType: 'T3C' message: 'toggled dates');
   add: (self printResult: T6 
	      resultType: 'T6' message: 'root parts visited');
   add: (self printResult: T8
              resultType: 'T8' message: 'instances of character found');
   add: (self printResult: T9
              resultType: 'T9' message: 'match found');
   add: (self printResult: Q1 
	      resultType: 'Q1' message: 'atomic parts retrieved');
   add: (self printResult: Q2 
	      resultType: 'Q2' message: 'qualifying parts retrieved');
   add: (self printResult: Q3 
	      resultType: 'Q3' message: 'qualifying parts retrieved');
   add: (self printResult: Q4 
	      resultType: 'Q4' message: '(doc-base assm) pairs retrieved');
   add: (self printResult: Q5 
	      resultType: 'Q5' message: 'out-of-date base assm retrieved');
   add: (self printResult: Q6 
	      resultType: 'Q6' message: 'out-of-date base assm retrieved');
   add: (self printResult: Q7 
	      resultType: 'Q7' message: 'atomic parts iterated through');
   add: (self printResult: Q8 
	      resultType: 'Q8' message: 'atomic part - document matches found');
   add: (self printResult: WU 
	      resultType: 'WU' message: 'warm update: swapped pairs');
   add: (self printResult: INS 
	      resultType: 'INS' message: 'composite parts inserted');
   add: (self printResult: DEL 
	      resultType: 'DEL' message: 'composite parts deleted').

  resultText toServerTextFile: resultFile.
  ^resultText.
 
%
category: 'Results'
classmethod: Bench
generateCreationStringFor: aVar withName: aName
| tempText |
tempText := String new.
aVar isNil ifTrue: [tempText add: aName; add: ' := nil.'; lf.
                    ^tempText].
((aVar at: 1) notNil) ifTrue: [
   tempText add: aName; add: ' at: 1 put: (Array new'; lf;
            add: '         at: 1 put: ';
           add: (((aVar at: 1) at: 1) asStringUsingFormat: #(8 2 false));
           add: ';'; lf; add: '         at: 2 put: ';
           add: (((aVar at: 1) at: 2) asString);
           add: ').' + Character lf.
].
((aVar at: 2) notNil) ifTrue: [
   tempText add: aName; add: ' at: 2 put: (Array new'; lf;
            add: '         at: 1 put: ';
           add: (((aVar at: 2) at: 1) asStringUsingFormat: #(8 2 false));
           add: ';'; lf; add: '         at: 2 put: ';
           add: (((aVar at: 2) at: 2) asString);
           add: ').' + Character lf.
].
^ tempText
%

category:  'Results'
classmethod: Bench
printOutFile: outFile header: fileHeader
   | genText |

genText := String new.
genText add: '!========================================================================'.
genText add: Character lf; add: '! Copyright (C) GemStone Systems, Inc. 1986-2002.  All Rights Reserved.'.
genText lf; add: '!'; lf; add: '! Name - oldvalues.opl'; lf.
    genText add: '! Description: File to input old values'; lf.
    genText add: '!' ; lf; add: '!========================================================================'.
    genText lf; lf.
    genText add: 'input util/resultcheck.tpz'; lf.

genText lf; lf.
genText add: 'login'; lf.
genText add: 'expectvalue %String'; lf.
genText add: 'run'; lf.
genText add: 'UserGlobals at: #OldVersion put: ''';
   add: DbfHistory trimWhiteSpace; add: '''.'; lf.
genText add: 'UserGlobals at: #OldUptime put: ''';
   add: (System performOnServer: 'uptime') trimWhiteSpace; add: '''.'; lf.
genText add: 'UserGlobals at: #OldHost put: ''';
   add: (System performOnServer: 'hostname') trimWhiteSpace; add: '''.'; lf.
genText add: '%'; lf; lf.
genText add: 'expectvalue %Array 2' ; lf.
genText add: 'run'; lf.
genText add: 'UserGlobals at: #OldT1 put: (Array new: 2);'; lf;
   add: '            at: #OldT1Many put: (Array new: 2);'; lf;
   add: '            at: #OldT2A put: (Array new: 2);'; lf;
   add: '            at: #OldT2B put: (Array new: 2);'; lf;
   add: '            at: #OldT2C put: (Array new: 2);'; lf;
   add: '            at: #OldT3A put: (Array new: 2);'; lf;
   add: '            at: #OldT3B put: (Array new: 2);'; lf;
   add: '            at: #OldT3C put: (Array new: 2);'; lf;
   add: '            at: #OldT6 put: (Array new: 2);'; lf;
   add: '            at: #OldT8 put: (Array new: 2);'; lf;
   add: '            at: #OldT9 put: (Array new: 2);'; lf;
   add: '            at: #OldQ1 put: (Array new: 2);'; lf;
   add: '            at: #OldQ2 put: (Array new: 2);'; lf;
   add: '            at: #OldQ3 put: (Array new: 2);'; lf;
   add: '            at: #OldQ4 put: (Array new: 2);'; lf;
   add: '            at: #OldQ5 put: (Array new: 2);'; lf;
   add: '            at: #OldQ6 put: (Array new: 2);'; lf;
   add: '            at: #OldQ7 put: (Array new: 2);'; lf;
   add: '            at: #OldQ8 put: (Array new: 2);'; lf;
   add: '            at: #OldWU put: (Array new: 2);'; lf;
   add: '            at: #OldINS put: (Array new: 2);'; lf;
   add: '            at: #OldDEL put: (Array new: 2).'; lf.
genText add: '%'; lf; lf.

genText add: 'expectvalue %Array 2'; lf.
genText add: 'run'; lf.
genText add: (self generateCreationStringFor: T1 withName: #OldT1).
genText add: (self generateCreationStringFor: T1Many withName: #OldT1Many).
genText add: (self generateCreationStringFor: T2A withName: #OldT2A).
genText add: (self generateCreationStringFor: T2B withName: #OldT2B).
genText add: (self generateCreationStringFor: T2C withName: #OldT2C).
genText add: (self generateCreationStringFor: T3A withName: #OldT3A).
genText add: (self generateCreationStringFor: T3B withName: #OldT3B).
genText add: (self generateCreationStringFor: T3C withName: #OldT3C).
genText add: (self generateCreationStringFor: T6 withName: #OldT6).
genText add: (self generateCreationStringFor: T8 withName: #OldT8).
genText add: (self generateCreationStringFor: T9 withName: #OldT9).
genText add: (self generateCreationStringFor: Q1 withName: #OldQ1).
genText add: (self generateCreationStringFor: Q2 withName: #OldQ2).
genText add: (self generateCreationStringFor: Q3 withName: #OldQ3).
genText add: (self generateCreationStringFor: Q4 withName: #OldQ4).
genText add: (self generateCreationStringFor: Q5 withName: #OldQ5).
genText add: (self generateCreationStringFor: Q6 withName: #OldQ6).
genText add: (self generateCreationStringFor: Q7 withName: #OldQ7).
genText add: (self generateCreationStringFor: Q8 withName: #OldQ8).
genText add: (self generateCreationStringFor: WU withName: #OldWU).
genText add: (self generateCreationStringFor: INS withName: #OldINS).
genText add: (self generateCreationStringFor: DEL withName: #OldDEL).

genText add: '%'; lf.
genText add: 'commit'; lf.
genText add: 'logout'; lf.

genText toServerTextFile: outFile.
^true
%


category:  'Results'
classmethod: Bench
printLog: logFile header: fileHeader

  | logText |

(MesgLog size = 0) ifTrue: [^'empty Log file'].
  logText := String new.
  logText lf; add: 'Log For '; add: fileHeader; lf;
             add: DateTime now US24HrFormat;
             lf; lf.
 1 to: MesgLog size do: [:i |
     logText add: (MesgLog at: i); add: Character lf. ].
 logText toServerTextFile: logFile.
^logText.
%

category: 'StructuralModification'
classmethod: Bench
runDeletesWithRepeatCount: numIterations
  
  | elapsedTime count results finalResults 
    aggregateTime averageTime |
 
  results := Array new: numIterations. 
  finalResults := Array new: 2.

  "Start a new transaction."
  System commitTransaction.

  1 to: numIterations do: [ :iter |
    
    elapsedTime := System secondsElapsedTime: [
      
      count := self delete.

      "Commit the current transaction if we are running the
       last iteration."

      (iter = numIterations)
        ifTrue: [ System commitTransaction ].

      ].
    results at: iter put: #[ elapsedTime, count ].
    ].

  finalResults at: 1 put: (results at: 1).
  
  (numIterations > 2) 
    ifTrue: [ 
      aggregateTime := 0.
      2 to: (numIterations - 1) do: [ :i |
        aggregateTime := aggregateTime + ((results at: i) at: 1).
        ].
      averageTime := aggregateTime / (numIterations -2).
      finalResults at: 2 put: #[ averageTime, count ].
      ].

  ^ finalResults.
%
category: 'StructuralModification'
classmethod: Bench
runInsertsWithRepeatCount: numIterations
  
  | elapsedTime count results finalResults 
    aggregateTime averageTime |

  "if the purge has been set, send the Purge method to Bench"
  PurgeVar ifTrue: [ self Purge ].

  results := Array new: numIterations. 
  finalResults := Array new: 2.

  1 to: numIterations do: [ :iter |
    
    elapsedTime := System secondsElapsedTime: [
      
      count := self insert.

      "Commit the current transaction if we are running the
       last iteration."

      (iter = numIterations)
        ifTrue: [ System commitTransaction ].

      ].
    results at: iter put: #[ elapsedTime, count ].
    ].

  finalResults at: 1 put: (results at: 1).
  
  (numIterations > 2) 
    ifTrue: [ 
      aggregateTime := 0.
      2 to: (numIterations - 1) do: [ :i |
        aggregateTime := aggregateTime + ((results at: i) at: 1).
        ].
      averageTime := aggregateTime / (numIterations -2).
      finalResults at: 2 put: #[ averageTime, count ].
      ].

  ^ finalResults.
%
category: 'Queries'
classmethod: Bench
runQueries: queryType repeatCount: numIterations
  
  | elapsedTime count results finalResults 
    aggregateTime averageTime |

  results := Array new: numIterations. 
  finalResults := Array new: 2.

  "Start a new transaction"
  System commitTransaction.
  
  1 to: numIterations do: [ :iter |
    
    elapsedTime := System secondsElapsedTime: [
      
       "Do the real stuff."
       count := Query runQuery: queryType.

       "Commit the current transaction if we are running the
        last iteration."

       (iter = numIterations)
         ifTrue: [ System commitTransaction ].

       ].
    results at: iter put: #[ elapsedTime, count ].
    ].

  finalResults at: 1 put: (results at: 1).
  
  (numIterations > 2) 
    ifTrue: [ 
      aggregateTime := 0.
      2 to: (numIterations - 1) do: [ :i |
        aggregateTime := aggregateTime + ((results at: i) at: 1).
        ].
      averageTime := aggregateTime / (numIterations -2).
      finalResults at: 2 put: #[ averageTime, count ].
      ].

  ^ finalResults.
%
category: 'Queries'
classmethod: Bench
expectvalueForQuery: queryType
|expectvalue |
expectvalue := false.
(queryType = 'Q1') ifTrue:
      [expectvalue := Query1RepeatCnt ].
(queryType = 'Q2') ifTrue:
      [expectvalue := Query2Size ].
(queryType = 'Q3') ifTrue:
      [expectvalue := Query3Size ].
(queryType = 'Q4') ifTrue:
      [expectvalue := 40 ].       "*** Change value **** "
(queryType = 'Q5') ifTrue:
      [expectvalue := 290 ].       "*** Change value **** "
(queryType = 'Q6') ifTrue:
      [expectvalue := 269 ].       "*** Remove later **** "
(queryType = 'Q7') ifTrue:
      [expectvalue := AllAtomicParts size ].
(queryType = 'Q8') ifTrue:
      [expectvalue := 10000 ].       "*** Change value **** "
^expectvalue.
%


category: 'Traversals'
classmethod: Bench
runTraversal: traverseType repeatCount: numIterations
  
  | elapsedTime count moduleId moduleH results finalResults 
    aggregateTime averageTime |

  results := Array new: numIterations. 
  finalResults := Array new: 2.

  "Start a new transaction."
  System commitTransaction.

  1 to: numIterations do: [ :iter |
    
    elapsedTime := System secondsElapsedTime: [
      
      "Since small and medium databases contain only one module, the
       following is superfluous."

       moduleId := ModuleRandGen next.
       moduleH  := AllModules detect: [ :aMod | aMod id = moduleId ].

       "Do the real stuff."
       count := moduleH traverse: traverseType.

       "Commit the current transaction if we are running the
        last iteration."

       (iter = numIterations)
         ifTrue: [ System commitTransaction ].

       ].
    results at: iter put: #[ elapsedTime, count ].
    ].

  finalResults at: 1 put: (results at: 1).
  
  (numIterations > 2) 
    ifTrue: [ 
      aggregateTime := 0.
      2 to: (numIterations - 1) do: [ :i |
        aggregateTime := aggregateTime + ((results at: i) at: 1).
        ].
      averageTime := aggregateTime / (numIterations -2).
      finalResults at: 2 put: #[ averageTime, count ].
      ].

  ^ finalResults.
%
category: 'Traversals'
classmethod: Bench
runTraversalMany: traverseType repeatCount: numIterations
  
  | elapsedTime count moduleId moduleH results finalResults 
    aggregateTime averageTime |

  results := Array new: numIterations. 
  finalResults := Array new: 2.

  "Start a new transaction."
  System commitTransaction.

  1 to: numIterations do: [ :iter |
    
    elapsedTime := System secondsElapsedTime: [
      
      "Since small and medium databases contain only one module, the
       following is superfluous."

       moduleId := ModuleRandGen next.
       moduleH  := AllModules detect: [ :aMod | aMod id = moduleId ].

       "Do the real stuff."
       count := moduleH traverse: traverseType.

       System commitTransaction.

       ].
    results at: iter put: #[ elapsedTime, count ].
    ].

  finalResults at: 1 put: (results at: 1).
  
  (numIterations > 2) 
    ifTrue: [ 
      aggregateTime := 0.
      2 to: (numIterations - 1) do: [ :i |
        aggregateTime := aggregateTime + ((results at: i) at: 1).
        ].
      averageTime := aggregateTime / (numIterations -2).
      finalResults at: 2 put: #[ averageTime, count ].
      ].

  ^ finalResults.
%
category: 'Traversals'
classmethod: Bench
expectvalueForTraversal: traversalType
|expectvalue |
expectvalue := false.
(traversalType = 'T1') ifTrue:
      [expectvalue := ((TotalModules * NumCompPerAssm) 
                          raisedToInteger: NumAssmLevels) 
                            * NumAtomicPerComp ].
((traversalType = 'T2A') or: [traversalType = 'T3A']) ifTrue:
      [expectvalue := ((TotalModules * NumCompPerAssm) 
                           raisedToInteger: NumAssmLevels) ].
((traversalType = 'T2B') or: [traversalType = 'T3B']) ifTrue:
      [expectvalue := ((TotalModules * NumCompPerAssm) 
                          raisedToInteger: NumAssmLevels)
                          * NumAtomicPerComp ].
((traversalType = 'T2C') or: [traversalType = 'T3C']) ifTrue:
      [expectvalue := (((TotalModules * NumCompPerAssm) 
                          raisedToInteger: NumAssmLevels)
                          * NumAtomicPerComp ) * 4 ].
(traversalType = 'T6') ifTrue:
      [expectvalue := ((TotalModules * NumCompPerAssm) 
                         raisedToInteger: NumAssmLevels) ].
(traversalType = 'T8') ifTrue:
      [expectvalue := (ManualSize/29) ceiling ].
(traversalType = 'T9') ifTrue:
      [expectvalue := 0].
^expectvalue.
%


category: 'WarmUpdate'
classmethod: Bench
warmUpdateWithRepeatCount: numIterations
  
  | elapsedTime count moduleId moduleH results finalResults 
    aggregateTime averageTime |

  results := Array new: numIterations. 
  finalResults := Array new: 2.

  "Start a new transaction."
  System commitTransaction.

  1 to: numIterations do: [ :iter |
    
    elapsedTime := System secondsElapsedTime: [
      
      "Since small and medium databases contain only one module, the
       following is superfluous."

       moduleId := ModuleRandGen next.
       moduleH  := AllModules detect: [ :aMod | aMod id = moduleId ].

       "Do the real stuff."
       count := moduleH traverse: #T1.
       count := moduleH traverse: #T2A.

       "Commit the current transaction if we are running the
        last iteration."

       (iter = numIterations)
         ifTrue: [ System commitTransaction ].

       ].
    
    results at: iter put: #[ elapsedTime, count ].
    ].

  finalResults at: 1 put: (results at: 1).
  
  (numIterations > 2) 
    ifTrue: [ 
      aggregateTime := 0.
      2 to: (numIterations - 1) do: [ :i |
        aggregateTime := aggregateTime + ((results at: i) at: 1).
        ].
      averageTime := aggregateTime / (numIterations -2).
      finalResults at: 2 put: #[ averageTime, count ].
      ].

  ^ finalResults.
%
! ------------------- Instance methods for Bench
expectvalue Bench
run
Bench category: 'User Classes'
%
