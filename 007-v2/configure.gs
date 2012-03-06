! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================
run
| numBAPriv numBAShared |

numBAPriv := 1.
(NumAssmLevelsPrivate - 1) timesRepeat: [ 
   numBAPriv := numBAPriv * NumAssmPerAssm ].
OO7Schema   at: #TotalBaseAssmPerPrivMod put: numBAPriv.

numBAShared := 1.
(NumAssmLevelsShared - 1) timesRepeat: [ 
   numBAShared := numBAShared * NumAssmPerAssm ].
OO7Schema   at: #TotalBaseAssmPerSharedMod put: numBAShared.
%

run
OO7Schema   at: #TotalComplexAssmPerPrivMod 
         put: (TotalBaseAssmPerPrivMod - 1 / 2).
OO7Schema   at: #TotalComplexAssmPerSharedMod 
         put: (TotalBaseAssmPerSharedMod - 1 / 2).
%
run
OO7Schema   at: #TotalAtomicPartsPerPrivMod 
	   put: (TotalCompPartsPerPrivMod * NumAtomicPerComp);
            at: #TotalAtomicPartsPerSharedMod 
	   put: (TotalCompPartsPerSharedMod * NumAtomicPerComp).
%

