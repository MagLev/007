! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================
! -----------------------------------------------------------------------
!
! Empty Configuration parameters for the "small3" database.
!
! -----------------------------------------------------------------------

run
OO7Schema   at: #NumAssmPerAssm   put: nil "3" ;
   at: #NumCompPerAssm   put: nil " 3" ;
   at: #NumCompPerPrivateModule put: nil " 500" ;
   at: #NumCompPerSharedModule put: nil " 200" ;
   at: #NumAssmLevelsPrivate    put: nil " 7" ;
   at: #NumAssmLevelsShared    put: nil " 6" ;
   at: #TotalModules     put: nil " 1" ;
   at: #NumAtomicPerComp put: nil " 20" ;
   at: #NumConnPerAtomic put: nil " 3" ;
   at: #DocumentSize     put: nil " 2000" ;
   at: #ManualSize       put: nil " 100000" ;
   at: #CacheSize        put: nil " 1500" .
%
