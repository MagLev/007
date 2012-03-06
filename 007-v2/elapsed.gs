! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================
classMethod: System
secondsElapsedTime: aBlock

  "Return the elapsed time in seconds aBlock takes to return its value.
   The argument aBlock must be a zero-argument block."

  | startTime endTime elapsedTime |
  
  startTime := self _timeMs.
  aBlock value.
  endTime := self _timeMs.

  elapsedTime := endTime - startTime.

  (elapsedTime > 0)
    ifFalse: [ nil error:'clock problem' ].


  ^ (elapsedTime / 1000) asDecimalFloat.
%
