! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
! ========================================================================

!
! load the OO7 benchmark schema
!
!     assume that the topaz has already been started
!
!     must have the following environment variables defined:
!        OO7sourcedir       the location of the OO7 sources
!        OO7rundir          where the test is being run from
!        OO7configfile      path to the configuration file
!                             /full/path/to/config<something>.gs
!

output push oo7setup.log only

set user DataCurator pass swordfish
login
input $OO7sourcedir/loadOO7dc.gs
commit
logout

set user SystemUser pass swordfish
login
input $OO7sourcedir/loadOO7su.gs
logout

set user GcUser pass swordfish
login
input $OO7sourcedir/loadOO7gc.gs
logout

output pop

