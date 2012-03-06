! ========================================================================
! Copyright (C) by GemStone Systems, Inc. 1986-2002.  All Rights Reserved
!
! $Id: loadOO7gc.gs 19162 2008-06-03 20:59:32Z stever $
!
! ========================================================================

output push loadOO7gc.out only
omit resultcheck
#
# load the OO7 benchmark schema (GcUser configuration)
#
#     assume that the topaz has already been started
#
#     must have the following environment variables defined:
#        OO7sourcedir       the location of the OO7 sources
#        OO7rundir          where the test is being run from
#        OO7configfile      path to the configuration file
#                             /full/path/to/config<something>.gs
#

run
  UserGlobals at: #reclaimSleepTime put: 3;
	      at: #reclaimMaxPages put: 2000.
%
commit
display resultcheck
output pop

