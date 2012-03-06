! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================

run
OO7Schema   at: #TotalNumUsers put: 10.
%

run
OO7Schema   at: #RepeatCount put: 5;
   at: #sleepTime put: 0.
%

run
OO7Schema   at: #PrivateReadOnlyRange put: 85;
   at: #SharedReadOnlyRange  put: 95;
   at: #PrivateUpdateRange   put: 98;
   at: #SharedUpdateRange    put: 100.
%

run
OO7Schema   at: #TotalNumTransactionsPerUser put: 1000000.
%
