! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================
run

| prevCount currCount prevCCCount currCCCount prevTime currTime tps result |

prevCount := tranCount value.
prevTime := DateTime now timeAsSeconds.
prevCCCount := concurrencyConflict value.
[true] whileTrue: [
  System sleep: 10.
  currTime := DateTime now timeAsSeconds.
  currCount := tranCount value.
  currCCCount := concurrencyConflict value.
  tps := ((currCount - prevCount) / (currTime - prevTime)) asFloat.
  result := String new.
  result add: 'Number of transactions committed: ' 
              + (currCount - prevCount) asString; lf.
  result add: 'Time interval: ' + (currTime - prevTime) asString.
  result add: (' TPS: ' + (tps asStringUsingFormat: #(8 2 false))); lf.
  result add: ('Number of sessions: ' + (sessionCount value asString)).
  result add: (' Number of Concurrency conflicts: ' + 
              (currCCCount - prevCCCount) asString); lf.
  result lf.
  result toServerTextFile: '/tmp/res'.
  System performOnServer: 'cat /tmp/res >> tps.results'.
  prevCount := currCount.
  prevTime := currTime.
  System abortTransaction.
  ]


%

