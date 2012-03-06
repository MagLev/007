! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================
! ------------------------------------------------------------------------
!
! Store the values of various parameters defined in the benchmark
!
! ------------------------------------------------------------------------

run
OO7Schema   at: #MinModuleDate    put: 1000;
   at: #MaxModuleDate    put: 1999;
   at: #MinAssmDate      put: 1000;
   at: #MaxAssmDate      put: 1999;
   at: #MinAtomicDate    put: 1000;
   at: #MaxAtomicDate    put: 1999;
   at: #MinOldCompDate   put: 0;
   at: #MaxOldCompDate   put: 999;
   at: #MinYoungCompDate put: 2000;
   at: #MaxYoungCompDate put: 2999;
   at: #YoungCompFrac    put: 10;
   at: #NumTypes         put: 10;
   at: #XYRange          put: 100000;
   at: #DocTextLength    put: 80;
   at: #ManualTextLength put: 80;
   at: #NumAssmLevelsPrivate put: 7;
   at: #NumAssmLevelsShared put: 6;
   at: #BytesPerCompositePart put: 15000;
   at: #TitleSize        put: 40.
%

run
OO7Schema   at: #UpdateRepeatCnt put: 4;
   at: #Query1RepeatCnt put: 10;
   at: #Query2Percent   put: 1;
   at: #Query3Percent   put: 10;
   at: #Query4RepeatCnt put: 10;
   at: #NumNewCompParts put: 10;
   at: #BaseAssmUpdateCnt put: 10.
%

run
OO7Schema   at: #AllPrivateDesigns put: (Array new);
   at: #AllSharedDesigns put:  (Array new);
   at: #SharedDesignRoot put: (Array new).
%

! ------------------------------------------------------------------------

run
OO7Schema   at: #TotalCompPartsPerPrivMod put: 500;
   at: #TotalCompPartsPerSharedMod put: 200.
%

! ------------------------------------------------------------------------
! the following are computed later after configuring for fanout and number
! of users

run
OO7Schema   at: #TotalAtomicPartsPerPrivMod put: nil .
OO7Schema   at: #TotalAtomicPartsPerSharedMod put: nil  .
OO7Schema   at: #TotalBaseAssmPerPrivMod put: nil .
OO7Schema   at: #TotalBaseAssmPerSharedMod put: nil .
OO7Schema   at: #TotalComplexAssmPerPrivMod put: nil.
OO7Schema   at: #TotalComplexAssmPerSharedMod put: nil
%

! ------------------------------------------------------------------------


run
OO7Schema   at: #types 
	   put: #(#type001 #type002 #type003 #type004 #type005
                  #type006 #type007 #type008 #type009 #type010).
%

! ------------------------------------------------------------------------
run
OO7Schema   at: #globalReadCount   put: RcCounter new;
   at: #globalUpdateCount put: RcCounter new.
%
! ------------------------------------------------------------------------
