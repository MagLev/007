! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================
! ----------------------------------------------------------------------
! 
! Generating the DataBase
!
! ----------------------------------------------------------------------


run

    | buildTime |

    buildTime := System millisecondsElapsedTime: [

	"create all the composite parts"
	1 to: TotalCompParts do:
		[:index | CompositePart newWithId: index.].
			  
	
	"create all the modules"
	1 to: TotalModules do: 
		[:index | Module newWithId: index.].
	
	
	"Add all the indexes"
	
	AllBaseAssemblies createEqualityIndexOn: 'id'.
	AllAtomicParts    createEqualityIndexOn: 'id'.
	AllAtomicParts    createEqualityIndexOn: 'buildDate'.
	AllDocuments      createEqualityIndexOn: 'title'.
	AllDocuments      createEqualityIndexOn: 'id'.
	AllModules        createEqualityIndexOn: 'id'.
	
	System commitTransaction.

	].

    'Database build time: ' +
    ((buildTime / 1000) asDecimalFloat asStringUsingFormat: #(8 2 false)) lf
    toServerTextFile: 'tmpRes'.

    System performOnServer: 'cat tmpRes >> oo7.results'.
    System abortTransaction.
%

expectvalue true
run
SystemRepository markForCollection.
%

input ensureGcRunning.gs

expectvalue true
run
SystemRepository objectAudit.
%

! ----------------------------------------------------------------------
