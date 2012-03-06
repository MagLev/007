! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================
! -----------------------------------------------------------------------
!
! Configuration parameters for the med3 database.
!
! -----------------------------------------------------------------------

run
OO7Schema   at: #NumAssmPerAssm   put: 3;
   at: #NumCompPerAssm   put: 3;
   at: #NumCompPerPrivateModule put: 500;
   at: #NumCompPerSharedModule put: 200;
   at: #NumAssmLevelsPrivate    put: 7;
   at: #NumAssmLevelsShared    put: 6;
   at: #TotalModules     put: 1;
   at: #NumAtomicPerComp put: 200;
   at: #NumConnPerAtomic put: 3;
   at: #DocumentSize     put: 20000;
   at: #ManualSize       put: 1000000;
   at: #CacheSize        put: 1500.
%
