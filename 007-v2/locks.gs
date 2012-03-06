! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================
"
lockResult := false.
[lockResult] whileFalse: [
  lockResult := true.
  System readLock: self
    ifDenied: [System sleep: 1.
               lockResult := false]
    ifChanged: []
].
"

