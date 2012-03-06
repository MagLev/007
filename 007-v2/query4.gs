! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================

| compPartId title idString newIdString doc count |
CompPartRandGen seed: 71.
count := 0.
Query4RepeatCnt timesRepeat: [
  title := String withAll: 'Composite Part '.
  title add: CompPartRandGen next asString lf;
   add: (String new: (TitleSize - title size)).
  doc := AllDocuments select: { :aDoc | aDoc.title = title }.
  doc do: [ 
    :aDoc | (aDoc part usedInPriv) do: [ 
      :aBaseAssembly | aBaseAssembly doNothing.
      count := count + 1.
      ].
    ]. 
  ].
^count.
