! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================
! ---------------------------------------------------------------------
!
! Generate the various random number generators. There is one random
! number generator for each range of numbers that the random numbers
! are being generated in.
!
! ---------------------------------------------------------------------

run
	| temp |

	temp := Random newGeneratorWithLowerBound: 1 
				       upperBound: NumTypes.
	OO7Schema at: #TypeRandGen put: temp.
%

! ---------------------------------------------------------------------

run
	| temp |

	temp := Random newGeneratorWithLowerBound: MinAtomicDate 
				       upperBound: MaxAtomicDate.
	OO7Schema at: #AtomicDateRandGen put: temp.
%

! ---------------------------------------------------------------------

run
	| temp |

	temp := Random newGeneratorWithLowerBound: 1 
				       upperBound: XYRange.
	OO7Schema at: #XYRandGen put: temp.
%

! ---------------------------------------------------------------------

run
	| temp |

	temp := Random newGeneratorWithLowerBound: 1 
				       upperBound: TotalCompParts.
	OO7Schema at: #DocIdRandGen put: temp.
%

! ---------------------------------------------------------------------

run
	| temp |

	temp := Random newGeneratorWithLowerBound: MinAssmDate 
				       upperBound: MaxAssmDate.
	OO7Schema at: #AssemblyDateRandGen put: temp.
%

! ---------------------------------------------------------------------

run
	| temp |

	temp := Random newGeneratorWithLowerBound: MinModuleDate 
				       upperBound: MaxModuleDate.
	OO7Schema at: #ModuleDateRandGen put: temp.
%

! ---------------------------------------------------------------------

run
	| temp |

	temp := Random newGeneratorWithLowerBound: MinYoungCompDate 
	                               upperBound: MaxYoungCompDate.
	OO7Schema at: #YoungCompBuildDateRandGen put: temp.
%

! ---------------------------------------------------------------------

run
	| temp |

	temp := Random newGeneratorWithLowerBound: MinOldCompDate 
	                               upperBound: MaxOldCompDate.
	OO7Schema at: #OldCompBuildDateRandGen put: temp.
%

! ---------------------------------------------------------------------

run
	| temp |

	temp := Random newGeneratorWithLowerBound: 1
	                               upperBound: NumAtomicPerComp.
	OO7Schema at: #ConnectionRandGen put: temp.
%

! ---------------------------------------------------------------------

run
	| temp |

	temp := Random newGeneratorWithLowerBound: 1
	                               upperBound: TotalAtomicParts.
	OO7Schema at: #AtomicPartRandGen put: temp.
%

! ---------------------------------------------------------------------

run
	| temp |

	temp := Random newGeneratorWithLowerBound: 1
	                               upperBound: TotalCompParts.
	OO7Schema at: #CompPartRandGen put: temp.
%

! ---------------------------------------------------------------------
