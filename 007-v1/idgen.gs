! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - idgen.gs
! Description: Generate new Ids and store them in well-known places
!
! ========================================================================

input util/resultcheck.tpz
omit oops

level 0

expectvalue %IdGenerator
run
	| temp |

	temp := IdGenerator createNew.
	UserGlobals at: #BaseAssemblyIdGen put: temp.
%

expectvalue %IdGenerator
run
	| temp |

	temp := IdGenerator createNew.
	UserGlobals at: #ComplexAssemblyIdGen put: temp.
%

expectvalue %IdGenerator
run
	| temp |

	temp := IdGenerator createNew.
	UserGlobals at: #AtomicIdGen put: temp.
%

expectvalue %IdGenerator
run
	| temp |

	temp := IdGenerator createNew.
	UserGlobals at: #CompPartIdGen put: temp.
%

