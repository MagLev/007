!========================================================================
! Copyright (C) GemStone Systems, Inc. 1986-2002.  All Rights Reserved.
! Name - aaareadme.txt
! Description:
!========================================================================

DESCRIPTION OF oo7 BENCHMARK TESTS
----------------------------------

How to run them:

 1) oo7tsts.pl $GEMSTONE -e dbSize -f fanout

The tests:

  1) The test output is written to $resultdir which can be specified as an
argument or the default is to create a subdirectory called oo7tsts under the
directory from which the tests were called.
  2) The result directory has 3 subdirectories:
     logDir - which contains the output of the files that were input in topaz
     input  - which contains the .tpz files that are generated dynamically
     during a test run.
     results - contains the results of the test execution.
        The files result.$dbSize$extraDir2.out contains the summary of the
     timing of each query/traversal that was performed.
