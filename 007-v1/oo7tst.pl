#!/usr/bin/perl
#========================================================================
# Copyright (C) GemStone Systems, Inc. 1986-2002.  All Rights Reserved.
# Name - oo7tst.pl
# Description:  oo7 Benchmark tests
#    The result directory has 3 subdirectories:
#    logDir - which contains the output of the files that were input in topaz
#    input  - which contains the .tpz files that are generated dynamically
#             during a test run.
#    results - contains the results of the test execution.
#    The files result.$dbSize.out contains the summary of the
#    timing of each query/traversal that was performed.
#========================================================================

#####################################################################
$testHelp = 'Run oo7 BenchMark tests with the following options
   -e Size (1 for small/ 2 for medium)
   -f Fanout (3/6/9)
   default values: -e 1 -f 3';

require "createTpzFiles.pl";

#####################################################################
&startstone($STONENAME);
system("waitstone $STONENAME 2") && die "$0: startstone of $STONENAME failed.\n";

#####################################################################
# Make sure we have an extraDir, which is not a dir but an integer
if ( ( $extraDir eq "" ) || ($extraDir != 1) || ($extraDir != 2) ) {
   print "oo7tst.pl [Error]: must provide an integer with -e (to specify size of database) \n";
   $extraDir = 1;
}
print "oo7tst.pl [Info]: using 'small' as database size\n";

#####################################################################
# Make sure we have an extraDir2, which is not a dir but an integer
if ( $extraDir2 eq "" ) {
   print "oo7tst.pl [Error]: must provide an integer with -f (to specify size of database) \n";
   $extraDir2 = 3;
}
print "oo7tst.pl [Info]: using 3 as fanout\n";

#####################################################################
#

#create the results directory if it does not exist
if (-e results) {
  if (! -d results) {
    die "'results' is not a directory\n";
  }
} else {
  mkdir (results,0770) || die "$0 (oo7tst.pl): could not create results directory.\n";

}

#create the log directory if it does not exist
if (-e logDir) {
  if (! -d logDir) {
    die "'logDir' is not a directory\n";
  }
} else {
  mkdir (logDir,0770) || die "$0 (oo7tst.pl): could not create logDir. \n";
}

#create the input directory if it does not exist
if (-e input) {
  if (! -d input) {
    die "'input' is not a directory\n";
  }
} else {
  mkdir (input,0770) || die "$0 (oo7tst.pl): could not create input. \n";
}

if ($extraDir == 1) {
  $dbSize = "small";
  $repeatCount = 5;
  $PURGE = 0;
  $resultFile = "results.small" . $extraDir2;
  $logFile = "log.small" . $extraDir2;
  $mesg = "small" . $extraDir2;
} else {
  $dbSize = "med";
  $repeatCount = 1;
  $PURGE = 0;
  $logFile = "log.med" . $extraDir2;
  $mesg = "med" . $extraDir2;
}
$dbSize = $dbSize . $extraDir2;
$resultFile = "$resultdir/results/$resultFile";
$logFile = "$resultdir/results/$logFile";

$ENV{"extraDir"} = $extraDir;
$ENV{"extraDir2"} = $extraDir2;
$ENV{"dbSize"} = $dbSize;
$ENV{"PURGE"} = $PURGE;
$ENV{"resultFile"} = $resultFile;
$ENV{"logFile"} = $logFile;
$ENV{"mesg"} = $mesg;
$ENV{"repeatCount"} = $repeatCount;

#####################################################################
# create queryArray and traverseArray for tests

@queryArray = ("#Q1", "#Q2", "#Q3", "#Q4", "#Q5", "#Q7", "#Q8");
@trav1Array = ("#T1", "#T6", "#T8", "#T9");
@trav2Array = ("#T2A", "#T2B", "#T2C", "#T3A", "#T3B", "#T3C");

#####################################################################
# 
$exedir = "$GEMSTONE/bin";
$ENV{"exedir"} = $exedir;

&createConfig;
&topazinput("$resultdir/input/configoo7.tpz", $STONENAME, "DataCurator", "swordfish", "$exedir/topaz");

&topazinput("oo7filein.tpz", $STONENAME, "DataCurator", "swordfish", "$exedir/topaz");

foreach $queryType (@queryArray) {
  $ENV{"queryType"} = $queryType;
  &createQuery;
  &topazinput("$resultdir/input/query$queryType.tpz", $STONENAME, "DataCurator", "swordfish", "$exedir/topaz");
}

foreach $traverseType (@trav1Array) {
  $ENV{"traverseType"} = $traverseType;
  &createTraverse;
  &topazinput("$resultdir/input/traverse$traverseType.tpz", $STONENAME, "DataCurator", "swordfish", "$exedir/topaz");
}

$ENV{"repeatCount"} = 1;

foreach $traverseType (@trav2Array) {
  $ENV{"traverseType"} = $traverseType;
  &createTraverse;
  &topazinput("$resultdir/input/traverse$traverseType.tpz", $STONENAME, "DataCurator", "swordfish", "$exedir/topaz");
}

&topazinput("insert.tpz", $STONENAME, "DataCurator", "swordfish", "$exedir/topaz");
&topazinput("delete.tpz", $STONENAME, "DataCurator", "swordfish", "$exedir/topaz");
&topazinput("warmupdate.tpz", $STONENAME, "DataCurator", "swordfish", "$exedir/topaz");


&createPrintFile;
&topazinput("$resultdir/input/printResults.tpz", $STONENAME, "DataCurator", "swordfish", "$exedir/topazl");

&getstack;
&reclaim($STONENAME, "DataCurator", "swordfish", "tstrecl$thetest.log");

&stopstone($STONENAME, "DataCurator", "swordfish");
&writeTime("$resultdir/endtim.tmp");
&doneMsg;

