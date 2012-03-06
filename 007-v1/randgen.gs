! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! Name - randgen.gs
! Description: Generate the various random number generators. There is one 
!              random number generator for each range of numbers that the 
!              random numbers are being generated in.
!
! ========================================================================

input util/resultcheck.tpz
omit oops

level 0
expectvalue %Random
run
	| temp |

	temp := Random newGeneratorWithLowerBound: 1 
				       upperBound: NumTypes.
	UserGlobals at: #TypeRandGen put: temp.
%

expectvalue %Random
run
	| temp |

	temp := Random newGeneratorWithLowerBound: MinAtomicDate 
				       upperBound: MaxAtomicDate.
	UserGlobals at: #AtomicDateRandGen put: temp.
%

expectvalue %Random
run
	| temp |

	temp := Random newGeneratorWithLowerBound: 1 
				       upperBound: XYRange.
	UserGlobals at: #XYRandGen put: temp.
%

expectvalue %Random
run
	| temp |

	temp := Random newGeneratorWithLowerBound: 1 
				       upperBound: TotalCompParts.
	UserGlobals at: #DocIdRandGen put: temp.
%

expectvalue %Random
run
	| temp |

	temp := Random newGeneratorWithLowerBound: MinAssmDate 
				       upperBound: MaxAssmDate.
	UserGlobals at: #AssemblyDateRandGen put: temp.
%

expectvalue %Random
run
	| temp |

	temp := Random newGeneratorWithLowerBound: MinModuleDate 
				       upperBound: MaxModuleDate.
	UserGlobals at: #ModuleDateRandGen put: temp.
%

expectvalue %Random
run
	| temp |

	temp := Random newGeneratorWithLowerBound: MinYoungCompDate 
	                               upperBound: MaxYoungCompDate.
	UserGlobals at: #YoungCompBuildDateRandGen put: temp.
%

expectvalue %Random
run
	| temp |

	temp := Random newGeneratorWithLowerBound: MinOldCompDate 
	                               upperBound: MaxOldCompDate.
	UserGlobals at: #OldCompBuildDateRandGen put: temp.
%

expectvalue %Random
run
	| temp |

	temp := Random newGeneratorWithLowerBound: 1
	                               upperBound: NumAtomicPerComp.
	UserGlobals at: #ConnectionRandGen put: temp.
%

expectvalue %Random
run
	| temp |

	temp := Random newGeneratorWithLowerBound: 1
	                               upperBound: TotalAtomicParts.
	UserGlobals at: #AtomicPartRandGen put: temp.
%

expectvalue %Random
run
	| temp |

	temp := Random newGeneratorWithLowerBound: 1
	                               upperBound: TotalCompParts.
	UserGlobals at: #CompPartRandGen put: temp.
%

expectvalue %Random
run
	| temp |

	temp := Random newGeneratorWithLowerBound: 1
	                               upperBound: TotalModules.
	UserGlobals at: #ModuleRandGen put: temp.
%

expectvalue %Random
run
	| temp |

	temp := Random newGeneratorWithLowerBound: 1
	                               upperBound: 100000.
	UserGlobals at: #GeneralRandGen put: temp.
%

