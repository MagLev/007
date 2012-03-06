! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! $Id: loadOO7su.gs 19162 2008-06-03 20:59:32Z stever $
!
! ========================================================================

#
# load the OO7 benchmark schema (SystemUser component)
#
#     assume that the topaz has already been started
#
#     must have the following environment variables defined:
#        OO7sourcedir       the location of the OO7 sources
#        OO7rundir          where the test is being run from
#        OO7configfile      path to the configuration file
#                             /full/path/to/config<something>.gs
#

output push loadOO7su.out only
omit resultcheck

input $OO7sourcedir/elapsed.gs

# give visibility of OO7 schema to SystemUser
run
    | oldAssoc schemaAssoc symList |
    schemaAssoc := (AllUsers userWithId: 'DataCurator') resolveSymbol: #OO7Schema .
    oldAssoc := System myUserProfile resolveSymbol: #OO7Schema .
    symList := System myUserProfile symbolList .
    oldAssoc notNil ifTrue:[
      " dereference old version of schema"
      symList deleteObjectAt: (symList indexOf: oldAssoc value ) .
      ]. 
    symList add: (schemaAssoc value).
%
commit

display resultcheck
output pop

