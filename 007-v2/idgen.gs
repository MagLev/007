! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================
! -----------------------------------------------------------------------
!
! Generate sequential Id numbers
!
! -----------------------------------------------------------------------

run
	Object subclass: #idGenerator
		instVarNames: #(#currId)
		inDictionary: OO7Schema.
%

! -----------------------------------------------------------------------

classMethod: idGenerator

	createNew
	| temp |

	temp := self new.
	temp setCurrId.
	^temp.
%

! -----------------------------------------------------------------------

method: idGenerator

	setCurrId
	currId := 0.
%

! -----------------------------------------------------------------------

method: idGenerator

	next

	currId := currId + 1.
	^currId
%

! -----------------------------------------------------------------------
