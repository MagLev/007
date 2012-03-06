!========================================================================
! Copyright (C) GemStone Systems, Inc. 1986-2002.  All Rights Reserved.
! Name - ensureGcRunning.gs
!========================================================================

output pushnew ensureGcRunning.out
input util/resultcheck.tpz
status
expectvalue %String
run
| result done repeatCount haveErr startReclBlock |
result := String new .

startReclBlock := [ 
    | numExtents numNewGems numConfiguredGems numGems totalGems gemsByExt exId |

    Exception category: GemStoneError number: 2040 do:[ :ex :cat :num :args|
      haveErr := true  .
    ].
    numExtents := SystemRepository numberOfExtents .
    numNewGems := System numberOfExtentRangesWithoutGC .
    numNewGems > 0 ifTrue:[
      numConfiguredGems := System stoneConfigurationAt: #StnNumGcReclaimSessions .
      numGems := System reclaimGcSessionCount .
      totalGems := numGems + numNewGems .
      totalGems > numConfiguredGems ifTrue:[
	System stoneConfigurationAt: #StnNumGcReclaimSessions put: totalGems .
	result := result + ' raised StnNumGcReclaimSessions to ' 
		  + totalGems asString + '. ' .
      ]. 
      gemsByExt := System currentGcReclaimSessionsByExtent .
      exId := 1 .
      [ exId <= gemsByExt size] whileTrue: [ | startId stopId endId extsDone |
	(gemsByExt at: exId) = 0 ifTrue:[
	   startId := exId . 
	   endId := exId .
	   exId := exId + 1 .
	   extsDone := false .
	   [ exId <= gemsByExt size and:[extsDone not] ] whileTrue:[
	     (gemsByExt at: exId) = 0 ifTrue:[ 
	       endId := exId .
	       exId := exId + 1 
	     ] ifFalse:[
	       extsDone := true
	     ].
	   ].
	   result := result + 'started reclaim for extents ' 
		  + startId asString + ' to:' + endId asString + '. ' .
	   System startReclaimGemForExtentRange: startId to: endId .
	] ifFalse:[
	  exId := exId + 1 .
	].
      ].
    ].
].

repeatCount := 1 .
done := false .
[ repeatCount <= 3 and:[ done not] ] whileTrue:[
  | status | 
  repeatCount := repeatCount + 1 .
  haveErr := false .
  "System hasMissingGcGems" true  ifTrue:[
    System adminGcGemSessionId == 0 ifTrue:[
      result := result + 'started admin gc. ' .
      System startAdminGcSession .
    ].
    startReclBlock value .
    haveErr ifFalse:[ done := true ].
  ].
  result size > 0 ifTrue:[
    status := System waitForAllGcGemsToStartForUpToSeconds: 30 .
    result := result + ' status=' + status asString + ' .' .
    ]
  ifFalse:[
    result := 'none missing.'
  ].
].
^ result.
%

expectvalue %String
run
System currentSessionNames
%

level 1
expectvalue %Array
run
System currentGcReclaimSessionsByExtent
%
level 0

expectvalue false
run
System hasMissingGcGems
%

output pop

