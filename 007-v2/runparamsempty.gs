! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================

run
OO7Schema   at: #TotalNumUsers put: nil "10" .
%

run
OO7Schema   at: #RepeatCount put: nil "5" ;
   at: #sleepTime put: nil "0" .
%

run
OO7Schema   at: #PrivateReadOnlyRange put: nil "85";
   at: #SharedReadOnlyRange  put: nil "95";
   at: #PrivateUpdateRange   put: nil "98";
   at: #SharedUpdateRange    put: nil "100".
%

run
OO7Schema   at: #TotalNumTransactionsPerUser put: nil "1000000".
%
