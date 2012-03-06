! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - genparams.gs
! Description: Store the values of various parameters defined in the benchmark
!
! ========================================================================

input util/resultcheck.tpz
omit oops

level 0
expectvalue 40
run
UserGlobals at: #MinModuleDate    put: 1000;
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
            at: #BytesPerCompositePart put: 15000;
	    at: #TitleSize        put: 40.
%

expectvalue false
run
UserGlobals at: #UpdateRepeatCnt put: 4;
	    at: #Query1RepeatCnt put: 10;
	    at: #Query2Percent   put: 1;
	    at: #Query2Size      put: 0;
	    at: #Query3Percent   put: 10;
	    at: #Query3Size      put: 0;
	    at: #Query4RepeatCnt put: 10;
	    at: #NumNewCompParts put: 10;
	    at: #BaseAssmUpdateCnt put: 10;
	    at: #MultiBenchMPL   put: 4;
	    at: #DummySize       put: 250;
            at: #NumDummy        put: 60000;
            at: #PurgeVar        put: false;
            at: #privateCp       put: nil;
            at: #sharedCp        put: nil;
            at: #debugMode       put: false;
            at: #RealWork        put: false;
            at: #WorkAmount      put: false.

%

expectvalue %SmallInteger
run
UserGlobals at: #TotalCompParts put: (NumCompPerModule * TotalModules).
%

expectvalue %SmallInteger
run
UserGlobals at: #TotalAtomicParts put: (TotalCompParts * NumAtomicPerComp).
%

expectvalue %InvariantArray 10
run
UserGlobals at: #types 
	   put: #(#type001 #type002 #type003 #type004 #type005
                  #type006 #type007 #type008 #type009 #type010).
%

expectvalue %Array 0
run

"Create empty sets to hold all the objects that will
 be created"

UserGlobals at: #AllBaseAssemblies put: (SetofBaseAssemblies new).
UserGlobals at: #AllAtomicParts    put: (SetofAtomicParts new).
UserGlobals at: #AllCompositeParts put: (SetofCompositeParts new).
UserGlobals at: #AllDocuments      put: (SetofDocuments new).
UserGlobals at: #AllModules        put: (SetofModules new).
UserGlobals at: #MesgLog           put: (Array new).
UserGlobals at: #DummyArray        put: (Array new).

%

! ------------------------------------------------------------------------

expectvalue nil
run
   "Store references to records the results at"
UserGlobals at: #T1 put: nil;
            at: #T1Many put: nil;
	    at: #T2A put: nil;
            at: #T2B put: nil;
	    at: #T2C put: nil;
	    at: #T3A put: nil;
	    at: #T3B  put: nil;
	    at: #T3C put: nil;
	    at: #T6 put: nil;
            at: #T8 put: nil;
            at: #T9 put: nil;
	    at: #Q1 put: nil;
	    at: #Q2 put: nil;
	    at: #Q3 put: nil;
	    at: #Q4 put: nil;
	    at: #Q5 put: nil;
	    at: #Q6 put: nil;
	    at: #Q6 put: nil;
	    at: #Q7 put: nil;
	    at: #Q8 put: nil;
	    at: #WU put: nil;
	    at: #INS put: nil;
	    at: #DEL put: nil.
%
! ------------------------------------------------------------------------

