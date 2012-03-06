
! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================


! Remove existing behavior from TrivialModule
doit
TrivialModule removeAllMethods.
TrivialModule class removeAllMethods.
%
! ------------------- Class methods for TrivialModule
category: 'Creation'
classmethod: TrivialModule

newWithId: modId

  "Create a new module with the given module id."

  | aModule |

  aModule := self new.

  "Set its id and type"
  aModule setIdAndType: modId.

  "Initialize and populate it with the objects necessary for a module"
  aModule initialize.

  ^aModule.
%
category: 'Creation'
classmethod: TrivialModule

newWithId: modId dictObj: dictionary

  "Create a new module with the given module id."

  | aModule |

  aModule := self new.
  aModule dictObj: dictionary.

  "Initialize and populate it with the objects necessary for a module"
  aModule initialize.

  ^aModule.
%
category: 'Creation'
classmethod: TrivialModule

newWithId: modId numLevels: totalNumLevels dictObj: dictionary

  "Create a new module with the given module id."

  | aModule |

  aModule := self new.
  aModule dictObj: dictionary.

  "Initialize and populate it with the objects necessary for a module"
  aModule initialize: totalNumLevels.

  ^aModule.
%
category: 'Creation'
classmethod: TrivialModule

newWithId: modId totalNumLevels: numLevels dictObj: dictionary

  "Create a new module with the given module id."

  | aModule |

  aModule := self new.
  aModule dictObj: dictionary.

  "Initialize and populate it with the objects necessary for a module"
  aModule initialize: numLevels.

  ^aModule.
%
! ------------------- Instance methods for TrivialModule
category: 'Initialization'
method: TrivialModule

initialize

  "Initialize the internal state of a newly created module that
   is necessary to perform the most trivial performance testing."

  "Set the build date by invoking the appropriate random number generator"
  buildDate := (dictObj ModuleDateRandGen) next.

%
category: 'Initialization'
method: TrivialModule

initialize: numLevels

  "Initialize the internal state of a newly created module that
   is necessary to perform the most trivial performance testing."

  "Set the build date by invoking the appropriate random number generator"
  buildDate := (dictObj ModuleDateRandGen) next.

%
