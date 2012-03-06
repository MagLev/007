! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! $Id: RunBench.gs 19162 2008-06-03 20:59:32Z stever $
!
! ========================================================================

doit
(Object subclass: #RunBench
  instVarNames: #(#privateDesign #sharedDesign)
  classVars: #( #Category)
  classInstVars: #()
  poolDictionaries: #[]
  inDictionary: OO7Schema
  constraints: #[]
  instancesInvariant: false
  isModifiable: false)  category: 'OO7 MU Benchmark'

%

! Remove existing behavior from RunBench
doit
RunBench removeAllMethods.
RunBench class removeAllMethods.
%
! ------------------- Class methods for RunBench
category: 'Building'
classmethod: RunBench
buildOneModule

  | privModule sharModule myId sharedBmObj privBmObj attempt |

  privBmObj :=  OO7Benchmark new.

  attempt := 0.
  [ System abortTransaction.
  attempt := attempt + 1.
  self log: 'Building new private design (attempt ' + attempt asString + ')'
       toFile: 'oo7build' + System session asString + '.log'.
  AllPrivateDesigns add: privBmObj.
  myId := AllPrivateDesigns size.
  privBmObj id: myId.
  System commitTransaction ]
  untilTrue.
 
  self log: 'Initializing new private design'
       toFile: 'oo7build' + System session asString + '.log'.
  privBmObj initialize: #private.
  privModule := privBmObj genPrivateDB.
  privBmObj MyModule: privModule.
  (System commitTransaction)
    ifFalse: [^ System transactionConflicts].


  self log: 'Building/initializing new shared design'
       toFile: 'oo7build' + System session asString + '.log'.
  sharedBmObj :=  OO7Benchmark new.
  sharedBmObj id: myId.

  sharedBmObj initialize: #shared.
  sharModule := sharedBmObj genSharedDB.
  sharedBmObj MyModule: sharModule.
  privBmObj SharedModule: sharModule.
  (System commitTransaction)
    ifFalse: [^ System transactionConflicts].

  self log: 'Module built'
       toFile: 'oo7build' + System session asString + '.log'.
%
category: 'Building'
classmethod: RunBench
buildTrivialModule

  | privModule sharModule myId sharedBmObj privBmObj attempt |
 
  privBmObj :=  OO7Benchmark new.
 
  attempt := 0.
  [ System abortTransaction.
  attempt := attempt + 1.
  self log: 'Building new private trivial design (attempt ' + attempt asString + ')'
       toFile: 'oo7build' + System session asString + '.log'.
  AllPrivateDesigns add: privBmObj.
  myId := AllPrivateDesigns size.
  privBmObj id: myId.
  System commitTransaction ]
  untilTrue.
 
  self log: 'Initializing new trivial private design'
       toFile: 'oo7build' + System session asString + '.log'.
  privBmObj initialize: #private.
  privModule := privBmObj genTrivialPrivateDB.
  privBmObj MyModule: privModule.
  (System commitTransaction)
    ifFalse: [^ System transactionConflicts].
 
 
  self log: 'Building/initializing new trivial shared design'
       toFile: 'oo7build' + System session asString + '.log'.
  sharedBmObj :=  OO7Benchmark new.
  sharedBmObj id: myId.
 
  sharedBmObj initialize: #shared.
  sharModule := sharedBmObj genTrivialSharedDB.
  sharedBmObj MyModule: sharModule.
  privBmObj SharedModule: sharModule.
  (System commitTransaction)
    ifFalse: [^ System transactionConflicts].
 
  self log: 'TrivialModule built'
       toFile: 'oo7build' + System session asString + '.log'.

%
category: 'Support'
classmethod: RunBench
commit

   ^ System commitTransaction
%
category: 'Running'
classmethod: RunBench
countSamplingEvery: sampleTime

 | prevReadCount prevUpdateCount prevTime 
   currReadCount currUpdateCount currTime 
   numObjectsRead numObjectsUpdate objectsPerOperation
   numRead numUpdate timeInterval 
   objectReadRate objectUpdateRate
   readRate updateRate 
   localNumbers numUsers count arraySize res
   aSample repeatCount |

 aSample := self sample.
 prevReadCount := aSample at: 3.
 prevUpdateCount := aSample at: 4.
 prevTime := aSample at: 1.

 OO7Schema at: #stats put: (Array new).
 localNumbers := Array new.
 System commitTransaction.


 count := 0.

 [true] whileTrue: [
 
   count := count + 1.
   ((count \\ 10) = 0)
     ifTrue: [
       arraySize := localNumbers size.
       1 to: arraySize do: [ :i |
	 (OO7Schema at: #stats) add: (localNumbers at: i).
	 ].
       localNumbers := Array new.
       System commitTransaction.
       ]
    ifFalse: [System abortTransaction].

   System sleep: sampleTime.

   aSample := self sample.
   repeatCount := aSample at: 5.
   currTime := aSample at: 1.
   currReadCount := aSample at: 3.
   currUpdateCount := aSample at: 4.
   numUsers := (aSample at: 2) - 2.

   objectsPerOperation := 200 * repeatCount.

   numRead := currReadCount - prevReadCount.
   numUpdate := currUpdateCount - prevUpdateCount.
   numObjectsRead := ((numRead * 800) + (numUpdate * 600)) * repeatCount.
   numObjectsUpdate := (numUpdate * 200) * repeatCount.
   timeInterval := currTime - prevTime.

   readRate := (numRead / timeInterval) asDecimalFloat.
   updateRate := (numUpdate / timeInterval) asDecimalFloat.

   objectReadRate := (numObjectsRead / timeInterval) asInteger.
   objectUpdateRate := (numObjectsUpdate / timeInterval) asInteger.

   prevTime := currTime.
   prevReadCount := currReadCount.
   prevUpdateCount := currUpdateCount.

   res := Array new: 4.
   res at: 1 put: currTime; at: 2 put: numUsers; at: 3 put: readRate;
       at: 4 put: updateRate.

   localNumbers add: res.


   ].

%
category: 'Logging'
classmethod: RunBench
dump: str toFile: filename

  | f |

  f := GsFile openAppend: filename.
  f addAll: str.
  f flush.
  f close. 
  ^true
%
category: 'Logging'
classmethod: RunBench
dumpToFile: str

   ^self dump: str toFile: '$OO7rundir/oo7.log'
%
category: 'Logging'
classmethod: RunBench
log: str toFile: filename

  | newStr f |

  newStr := '
' + (DateTime now asString) + ' ' + (str printString).
  f := GsFile openAppend: filename.
  f addAll: newStr.
  f flush.
  f close. 
  ^true
%
category: 'Logging'
classmethod: RunBench
logToFile: str

   ^self log: str toFile: '$OO7rundir/oo7.log'
%
category: 'Building'
classmethod: RunBench
moveAllUsersToShared

   "The one true way to assure that the shared module from 
    every private design is added exactly once to the array 
    of shared modules."
   SharedDesignRoot := Array new.
   self moveUsersToSharedFrom: 1 to: AllPrivateDesigns size
%
category: 'Building'
classmethod: RunBench
moveUsersToShared: totalNumUsers

   ^self moveUsersToSharedFrom: 1 to: totalNumUsers
%
category: 'Building'
classmethod: RunBench
moveUsersToSharedFrom: firstIndex to: lastIndex
    firstIndex to: lastIndex do: [ :i |
      SharedDesignRoot add: ((AllPrivateDesigns at: i) SharedModule).
      ].

    (System commitTransaction)
      ifFalse: [^ System transactionConflicts].

%
category: 'Running'
classmethod: RunBench
runReallyTrivialUser

 | i myBenchObj myId numUpdated readCount currSessCount databaseSize
   success |

  myId := System session.
  "databaseSize := SharedDesignRoot size."
  databaseSize := AllPrivateDesigns size.

  (myId > databaseSize) 
    ifTrue: [^ 'database not big enough for the number of users' ].

  myBenchObj := AllPrivateDesigns at: myId.
  (myBenchObj sharedModRandGen) range: databaseSize.

  (myBenchObj pathRandGen) setSeed.
  (myBenchObj workLoadRandGen) setSeed.
  (myBenchObj sharedModRandGen) setSeed.

  self commit.

  readCount := 0.

  System transactionMode: #manualBegin.

  1 to: TotalNumTransactionsPerUser do: [ :i |

    "System transactionMode: #autoBegin."
    System beginTransaction.

    "(myBenchObj pathRandGen) seed: (i * myId)."
    "(myBenchObj workLoadRandGen) seed: (i + myId)."
    "(myBenchObj sharedModRandGen) seed: (i * myId + 29)."

    numUpdated := 0.

    numUpdated := myBenchObj doNextReallyTrivialTask: RepeatCount.
      (numUpdated > 0)
      ifTrue: [ globalReadCount incrementBy: readCount.
                globalUpdateCount increment.
                success := self commit.
                success
                  ifTrue: [ readCount := 0 ]
                  ifFalse: [ System abortTransaction ]
              ]
      ifFalse: [ readCount := readCount + 1.
                 System abortTransaction ].

    "System transactionMode: #manualBegin."
    System sleep: sleepTime.
  ].

%
category: 'Running'
classmethod: RunBench
runReallyTrivialUserMilliSleep

 | i myBenchObj myId numUpdated readCount currSessCount databaseSize
   success |

  myId := System session.
  "databaseSize := SharedDesignRoot size."
  databaseSize := AllPrivateDesigns size.

  (myId > databaseSize) 
    ifTrue: [^ 'database not big enough for the number of users' ].

  myBenchObj := AllPrivateDesigns at: myId.
  (myBenchObj sharedModRandGen) range: databaseSize.

  (myBenchObj pathRandGen) setSeed.
  (myBenchObj workLoadRandGen) setSeed.
  (myBenchObj sharedModRandGen) setSeed.

  self commit.

  readCount := 0.

  System transactionMode: #manualBegin.

  1 to: TotalNumTransactionsPerUser do: [ :i |

    "System transactionMode: #autoBegin."
    System beginTransaction.

    "(myBenchObj pathRandGen) seed: (i * myId)."
    "(myBenchObj workLoadRandGen) seed: (i + myId)."
    "(myBenchObj sharedModRandGen) seed: (i * myId + 29)."

    numUpdated := 0.

    numUpdated := myBenchObj doNextReallyTrivialTask: RepeatCount.
      (numUpdated > 0)
      ifTrue: [ globalReadCount incrementBy: readCount.
                globalUpdateCount increment.
                success := self commit.
                success
                  ifTrue: [
                    "self logToFile: 'successful oo7 commit'."
                    readCount := 0
                  ]
                  ifFalse: [ 
                    "self logToFile: 'failed oo7 commit'."
                    System abortTransaction
                  ]
              ]
      ifFalse: [ readCount := readCount + 1.
                 System abortTransaction ].

    "System transactionMode: #manualBegin."
    System _sleepMs: sleepTime.
  ].

%
category: 'Running'
classmethod: RunBench
runTrivialUser

 | i myBenchObj myId numUpdated readCount currSessCount databaseSize
   success |

  myId := System session.
  "databaseSize := SharedDesignRoot size."
  databaseSize := AllPrivateDesigns size.

  (myId > databaseSize) 
    ifTrue: [^ 'database not big enough for the number of users' ].

  myBenchObj := AllPrivateDesigns at: myId.
  (myBenchObj sharedModRandGen) range: databaseSize.

  (myBenchObj pathRandGen) setSeed.
  (myBenchObj workLoadRandGen) setSeed.
  (myBenchObj sharedModRandGen) setSeed.

  self commit.

  readCount := 0.

  1 to: TotalNumTransactionsPerUser do: [ :i |

    "System transactionMode: #autoBegin."

    "(myBenchObj pathRandGen) seed: (i * myId)."
    "(myBenchObj workLoadRandGen) seed: (i + myId)."
    "(myBenchObj sharedModRandGen) seed: (i * myId + 29)."

    numUpdated := 0.

    numUpdated := myBenchObj doNextTrivialTask: RepeatCount.
      (numUpdated > 0)
      ifTrue: [ globalReadCount incrementBy: readCount.
                globalUpdateCount increment.
                success := self commit.
                success
                  ifTrue: [ readCount := 0 ]
                  ifFalse: [ System abortTransaction ]
              ]
      ifFalse: [ readCount := readCount + 1.
                 System abortTransaction ].

    "System transactionMode: #manualBegin."
    System sleep: sleepTime.
  ].

%
category: 'Running'
classmethod: RunBench
runTrivialUserMilliSleep

 | i myBenchObj myId numUpdated readCount currSessCount databaseSize
   success |

  myId := System session.
  "databaseSize := SharedDesignRoot size."
  databaseSize := AllPrivateDesigns size.

  (myId > databaseSize) 
    ifTrue: [^ 'database not big enough for the number of users' ].

  myBenchObj := AllPrivateDesigns at: myId.
  (myBenchObj sharedModRandGen) range: databaseSize.

  (myBenchObj pathRandGen) setSeed.
  (myBenchObj workLoadRandGen) setSeed.
  (myBenchObj sharedModRandGen) setSeed.

  self commit.

  readCount := 0.

  System transactionMode: #manualBegin.

  1 to: TotalNumTransactionsPerUser do: [ :i |

    "System transactionMode: #autoBegin."
    System beginTransaction.

    "(myBenchObj pathRandGen) seed: (i * myId)."
    "(myBenchObj workLoadRandGen) seed: (i + myId)."
    "(myBenchObj sharedModRandGen) seed: (i * myId + 29)."

    numUpdated := 0.

    numUpdated := myBenchObj doNextTrivialTask: RepeatCount.
      (numUpdated > 0)
      ifTrue: [ globalReadCount incrementBy: readCount.
                globalUpdateCount increment.
                success := self commit.
                success
                  ifTrue: [ readCount := 0 ]
                  ifFalse: [ System abortTransaction ]
              ]
      ifFalse: [ readCount := readCount + 1.
                 System abortTransaction ].

    "System transactionMode: #manualBegin."
    System _sleepMs: sleepTime. 
  ].

%
category: 'Running'
classmethod: RunBench
runUser

 | i myBenchObj myId numUpdated readCount currSessCount databaseSize
   kernelCommit success |

  myId := System session.
  "databaseSize := SharedDesignRoot size."
  databaseSize := AllPrivateDesigns size.

  (myId > databaseSize) 
    ifTrue: [^ 'database not big enough for the number of users' ].

  myBenchObj := AllPrivateDesigns at: myId.
  (myBenchObj sharedModRandGen) range: databaseSize.

  self commit.

  readCount := 0.

  System transactionMode: #manualBegin.

  1 to: TotalNumTransactionsPerUser do: [ :i |

    "System transactionMode: #autoBegin."
    System beginTransaction.

    (myBenchObj pathRandGen) seed: (i * myId).
    (myBenchObj workLoadRandGen) seed: (i + myId).
    (myBenchObj sharedModRandGen) seed: (i * myId + 29).

    numUpdated := 0.

    numUpdated := myBenchObj doNextMultiUserTask: RepeatCount.
      (numUpdated > 0)
      ifTrue: [ "Increment globalReadCount here only to avoid having to
                 commit during a read transaction.  Downside of this is
                 you can only track the number of read transactions if
                 some percentage of transactions are updates."
                globalReadCount incrementBy: readCount.
                globalUpdateCount increment.
                success := self commit.
                success
                  ifTrue: [ readCount := 0 ]
                  ifFalse: [ System abortTransaction ]
              ]
      ifFalse: [ "Just note the number of reads in a local var.
                  It'll get added to the global counter and commited
                  with the next update transaction (see above)."
                 readCount := readCount + 1.
                 System abortTransaction ].

    "System transactionMode: #manualBegin."
    System sleep: sleepTime.
  ].

%
category: 'Running'
classmethod: RunBench
runUserMilliSleep

 | i myBenchObj myId numUpdated readCount currSessCount databaseSize
   kernelCommit success |

  myId := System session.
  "databaseSize := SharedDesignRoot size."
  databaseSize := AllPrivateDesigns size.

  (myId > databaseSize) 
    ifTrue: [^ 'database not big enough for the number of users' ].

  myBenchObj := AllPrivateDesigns at: myId.
  (myBenchObj sharedModRandGen) range: databaseSize.

  self commit.

  readCount := 0.

  System transactionMode: #manualBegin.

  1 to: TotalNumTransactionsPerUser do: [ :i |

    "System transactionMode: #autoBegin."
    System beginTransaction.

    (myBenchObj pathRandGen) seed: (i * myId).
    (myBenchObj workLoadRandGen) seed: (i + myId).
    (myBenchObj sharedModRandGen) seed: (i * myId + 29).

    numUpdated := 0.

    numUpdated := myBenchObj doNextMultiUserTask: RepeatCount.
      (numUpdated > 0)
      ifTrue: [ "Increment globalReadCount here only to avoid having to
                 commit during a read transaction.  Downside of this is
                 you can only track the number of read transactions if
                 some percentage of transactions are updates."
                globalReadCount incrementBy: readCount.
                globalUpdateCount increment.
                success := self commit.
                success
                  ifTrue: [ readCount := 0 ]
                  ifFalse: [ System abortTransaction ]
              ]
      ifFalse: [ "Just note the number of reads in a local var.
                  It'll get added to the global counter and commited
                  with the next update transaction (see above)."
                 readCount := readCount + 1.
                 System abortTransaction ].

    "System transactionMode: #manualBegin."
    System _sleepMs: sleepTime.
  ].

%
category: 'Running'
classmethod: RunBench
runUserMilliSleepX

 | i myBenchObj myId numUpdated readCount currSessCount databaseSize
   kernelCommit success workType |

  myId := System session.
  "databaseSize := SharedDesignRoot size."
  databaseSize := AllPrivateDesigns size.

  (myId > databaseSize) 
    ifTrue: [^ 'database not big enough for the number of users' ].

  myBenchObj := AllPrivateDesigns at: myId.
  (myBenchObj sharedModRandGen) range: databaseSize.

  self commit.

  readCount := 0.

  System transactionMode: #manualBegin.

  1 to: TotalNumTransactionsPerUser do: [ :i |

    "System transactionMode: #autoBegin."
    "System beginTransaction."

    (myBenchObj workLoadRandGen) seed: (i + myId).
    workType := myBenchObj getNextWorkType.
    (workType = #PrivateUpdate or: [workType = #SharedUpdate])
      ifTrue: [
        System _sleepMs: sleepTime.
      ].

    System beginTransaction.
    (myBenchObj pathRandGen) seed: (i * myId).
    (myBenchObj sharedModRandGen) seed: (i * myId + 29).
    numUpdated := 0.
    numUpdated := myBenchObj doNextMultiUserTask: RepeatCount ofType: workType.
      (numUpdated > 0)
      ifTrue: [ "Increment globalReadCount here only to avoid having to
                 commit during a read transaction.  Downside of this is
                 you can only track the number of read transactions if
                 some percentage of transactions are updates."
                globalReadCount incrementBy: readCount.
                globalUpdateCount increment.
                success := self commit.
                self log: 'Session ' + System session asString + ' commit (' +
                          readCount asString + ' reads)'
                     toFile: 'X.log'.
                success
                  ifTrue: [ readCount := 0 ]
                  ifFalse: [ System abortTransaction ]
              ]
      ifFalse: [ "Just note the number of reads in a local var.
                  It'll get added to the global counter and commited
                  with the next update transaction (see above)."
                 readCount := readCount + 1.
                 System abortTransaction ].

    "System transactionMode: #manualBegin."
    "System _sleepMs: sleepTime."
  ].

%
category: 'Running'
classmethod: RunBench
sample

 | res |

   res := Array new: 5.
   res at: 1 put: DateTime now timeAsSeconds;
       at: 2 put: System currentSessions size;
       at: 3 put: globalReadCount value;
       at: 4 put: globalUpdateCount value;
       at: 5 put: RepeatCount.

   ^res
%
! ------------------- Instance methods for RunBench
category: 'Setup'
method: RunBench
createDB
  "comment - what does this method do?"

  | sharedBmObj privBmObj sharedIndex privIndex sharedModule lockResult |
  
  privBmObj :=  OO7Benchmark new.

  lockResult := false.
  [lockResult] whileFalse: [
     lockResult := true.
     System exclusiveLock: AllPrivateDesigns
        ifDenied: [System sleep: 2.
                   lockResult := false]
        ifChanged: [] 
     ].

  AllPrivateDesigns add: privBmObj.
  privIndex := AllPrivateDesigns size.
  System commitAndReleaseLocks.

  privBmObj id: privIndex.

  privBmObj initialize: #private.
  privBmObj MyModule: (privBmObj genPrivateDB).
  privateDesign := privBmObj.
  System commitTransaction.

  sharedBmObj :=  OO7Benchmark new.

  lockResult := false.
  [lockResult] whileFalse: [
     lockResult := true.
     System exclusiveLock: AllSharedDesigns
        ifDenied: [System sleep: 2.
                   lockResult := false]
        ifChanged: [] 
     ].

  AllSharedDesigns add: sharedBmObj.
  sharedIndex := AllSharedDesigns size.
  System commitAndReleaseLocks.

  sharedBmObj id: sharedIndex.

  sharedBmObj initialize: #shared.
  sharedModule := sharedBmObj genSharedDB.
  sharedBmObj MyModule: sharedModule.
  sharedDesign := sharedBmObj.
  System commitTransaction.

  lockResult := false.
  [lockResult] whileFalse: [
     lockResult := true.
     System exclusiveLock: SharedDesignRoot
        ifDenied: [System sleep: 2.
                   lockResult := false]
        ifChanged: [] 
     ].

  SharedDesignRoot add: sharedModule.
  System commitAndReleaseLocks.
%
category: 'Setup'
method: RunBench
multiUserWorkLoad
  "comment - what does this method do?"

  | myBenchObj myId |

  myId := System session.
  myBenchObj := AllPrivateDesigns at: myId.
  (myBenchObj workLoadRandGen) seed: myId.
  
  TotalNumTransactionsPerUser timesRepeat: [

    RepeatCount timesRepeat: [
    
      myBenchObj doNextMultiUserTask.
      System sleep: sleepTime.
      ].

    (System commitTransaction)
      ifFalse: [ ^ 'Could not commit a transaction' ]
    ]. 
    
  
%
doit
RunBench category: 'User Classes'
%
